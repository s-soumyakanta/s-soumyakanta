import { EmailTemplate } from '@/components/EmailTemplate';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  try {
    const emailContent = await EmailTemplate({ name, email, message });
    const { data, error } = await resend.emails.send({
      from: `Web Mail <web-mail@s-soumyakanta.com>`,
      to: [String(process.env.MY_EMAIL)],
      subject: 'New Message from s-soumyakanta.com',
      react: emailContent,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
