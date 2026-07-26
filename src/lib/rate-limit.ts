type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Best-effort, per-instance limiter: on serverless (Vercel) each cold
// function instance gets its own memory, so this doesn't hold a single
// global count across every instance/region. It still stops the common
// case — a client hammering a warm instance — at zero infra cost. For a
// hard guarantee under real traffic, swap this map for a shared store
// (e.g. Upstash Redis) behind the same function signature.
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  // Lazily sweep expired buckets so long-lived instances don't leak memory.
  if (buckets.size > 500) {
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true, retryAfterSeconds: 0 };
}
