import { EmailTemplate } from '@/components/EmailTemplate';
import { rateLimit } from '@/lib/rate-limit';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as yup from 'yup';

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGINS = new Set([
  'https://www.s-soumyakanta.com',
  'https://s-soumyakanta.com',
]);

// 4 submissions per 10 minutes per IP — generous for a real visitor, tight
// enough to stop a script from flooding this inbox or burning Resend quota.
const RATE_LIMIT_MAX = 4;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

// Second ceiling, counted across every caller this instance sees. The per-IP
// bucket does nothing against a spoofed or genuinely distributed flood; this
// caps the blast radius on Resend quota regardless of who is sending.
const GLOBAL_LIMIT_MAX = 60;
const GLOBAL_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const MAX_BODY_BYTES = 20_000; // form is a few hundred bytes at most

const schema = yup.object({
  name: yup.string().trim().min(1, 'Name is required').max(100, 'Name is too long').required(),
  email: yup.string().trim().email('Invalid email address').max(254, 'Email is too long').required(),
  message: yup.string().trim().min(1, 'Message is required').max(5000, 'Message is too long').required(),
  // Honeypot — real visitors never see or fill this field.
  company: yup.string().max(200).optional(),
});

// Vercel sets x-real-ip at the proxy, so a client cannot forge it. Anything a
// client sends in x-forwarded-for lands to the left of the real address, which
// is why that header is only the fallback here — and why GLOBAL_LIMIT exists.
function getClientIp(req: NextRequest): string {
  const realIp = req.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    // Rightmost entry is the one appended by the closest trusted proxy.
    const parts = forwarded.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }

  return 'unknown';
}

function isAllowedOrigin(req: NextRequest): boolean {
  if (process.env.NODE_ENV !== 'production') return true;
  const origin = req.headers.get('origin');
  // Some legitimate same-origin requests omit Origin entirely; the JSON
  // content-type gate below is what blocks cross-site form posts.
  if (!origin) return true;
  return ALLOWED_ORIGINS.has(origin);
}

// A cross-origin <form> can only send urlencoded, multipart or text/plain, and
// it cannot set a custom content-type without tripping a CORS preflight this
// route never answers. Requiring JSON therefore rules out drive-by CSRF posts.
function isJsonRequest(req: NextRequest): boolean {
  const contentType = req.headers.get('content-type') ?? '';
  return contentType.split(';')[0].trim().toLowerCase() === 'application/json';
}

// Content-Length is client-supplied and absent on chunked bodies, so cap the
// stream itself and hang up as soon as it runs long.
async function readBodyCapped(req: NextRequest, maxBytes: number): Promise<string | null> {
  if (!req.body) return '';

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } catch {
    return null;
  }

  const joined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    joined.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(joined);
}

// Strip control characters so nothing odd rides into the mail transport or the
// rendered email. Tabs and line breaks stay when the field legitimately has them.
function sanitize(value: string, allowNewlines = false): string {
  const TAB = 9;
  const LINE_FEED = 10;
  const CARRIAGE_RETURN = 13;
  const DELETE = 127;

  let out = '';
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    const isControl = code < 32 || code === DELETE;
    const isKeptWhitespace =
      allowNewlines && (code === TAB || code === LINE_FEED || code === CARRIAGE_RETURN);

    if (isControl && !isKeptWhitespace) continue;
    out += char;
  }

  return out.trim();
}

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!isJsonRequest(req)) {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
  }

  const declaredLength = Number(req.headers.get('content-length') ?? '0');
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  const ip = getClientIp(req);
  const perIp = rateLimit(`send:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  const global = rateLimit('send:global', GLOBAL_LIMIT_MAX, GLOBAL_LIMIT_WINDOW_MS);

  if (!perIp.ok || !global.ok) {
    const retryAfter = Math.max(perIp.retryAfterSeconds, global.retryAfterSeconds);
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    );
  }

  const raw = await readBodyCapped(req, MAX_BODY_BYTES);
  if (raw === null) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  let data: yup.InferType<typeof schema>;
  try {
    data = await schema.validate(body, { stripUnknown: true, abortEarly: true });
  } catch (error) {
    const message = error instanceof yup.ValidationError ? error.message : 'Invalid input';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Bots fill every field, including ones hidden from real visitors.
  // Report success without sending, so the bot has no signal to adapt to.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitize(data.name);
  const email = sanitize(data.email);
  const message = sanitize(data.message, true);

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    const emailContent = await EmailTemplate({ name, email, message });
    const { error } = await resend.emails.send({
      from: `Web Mail <web-mail@s-soumyakanta.com>`,
      to: [String(process.env.MY_EMAIL)],
      // Validated and control-character stripped above, so this cannot smuggle
      // extra headers — and it makes replying straight from the inbox work.
      replyTo: email,
      subject: 'New Message from s-soumyakanta.com',
      react: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
