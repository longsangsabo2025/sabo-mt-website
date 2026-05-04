const rateMap = new Map<string, { count: number; ts: number }>();

/** Sliding window: default 40 req / hour per IP. */
export function rateLimitOk(
  ip: string,
  limit = 40,
  windowMs = 3_600_000,
): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.ts > windowMs) {
    rateMap.set(ip, { count: 1, ts: now });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}
