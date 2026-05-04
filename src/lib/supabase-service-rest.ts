/**
 * Minimal PostgREST client for server routes (service role only).
 */

export function supabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL?.trim() && process.env.SUPABASE_SERVICE_KEY?.trim());
}

export async function supabaseRest(
  path: string,
  init: RequestInit & { prefer?: string } = {},
): Promise<Response> {
  const base = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_KEY?.trim();
  if (!base || !key) throw new Error('SUPABASE_URL / SUPABASE_SERVICE_KEY missing');

  const headers: Record<string, string> = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: 'application/json',
    ...(init.headers as Record<string, string>),
  };
  if (init.prefer) headers.Prefer = init.prefer;
  if (init.body && !headers['Content-Type']) headers['Content-Type'] = 'application/json';

  return fetch(`${base.replace(/\/$/, '')}/rest/v1/${path.replace(/^\//, '')}`, {
    ...init,
    headers,
  });
}
