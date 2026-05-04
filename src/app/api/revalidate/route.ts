import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export const runtime = 'nodejs';

const PURGE_TAG = { expire: 0 };

/**
 * On-demand revalidation webhook.
 *
 * Forge admin (or any trusted service) calls this when project_showcase data changes:
 *
 *   POST https://sabo.com.vn/api/revalidate
 *   { "secret": "<REVALIDATE_SECRET>", "tag": "showcase" }
 *
 *   or:
 *
 *   GET  https://sabo.com.vn/api/revalidate?secret=<REVALIDATE_SECRET>&tag=showcase
 *   GET  https://sabo.com.vn/api/revalidate?secret=<REVALIDATE_SECRET>&path=/case-studies
 *
 * Effect: invalidates the cache tag/path so the next render fetches fresh data from forge.
 */
function checkSecret(provided: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET?.trim();
  if (!expected) return false;
  if (!provided) return false;
  // Constant-time-ish comparison (Node strings, simple guard against timing).
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < provided.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  const tag = searchParams.get('tag');
  const path = searchParams.get('path');

  if (!checkSecret(secret)) {
    return NextResponse.json({ ok: false, error: 'invalid_secret' }, { status: 401 });
  }

  const revalidated: { tags: string[]; paths: string[] } = { tags: [], paths: [] };

  if (tag) {
    revalidateTag(tag, PURGE_TAG);
    revalidated.tags.push(tag);
  }
  if (path) {
    revalidatePath(path);
    revalidated.paths.push(path);
  }
  if (!tag && !path) {
    // Default: refresh showcase data + the public pages that consume it.
    revalidateTag('showcase', PURGE_TAG);
    revalidatePath('/');
    revalidatePath('/case-studies');
    revalidated.tags.push('showcase');
    revalidated.paths.push('/', '/case-studies');
  }

  return NextResponse.json({ ok: true, revalidated, ts: Date.now() });
}

export async function POST(req: NextRequest) {
  let body: { secret?: string; tag?: string; path?: string } = {};
  try {
    body = await req.json();
  } catch {
    /* empty body OK */
  }

  if (!checkSecret(body.secret ?? null)) {
    return NextResponse.json({ ok: false, error: 'invalid_secret' }, { status: 401 });
  }

  const revalidated: { tags: string[]; paths: string[] } = { tags: [], paths: [] };

  if (body.tag) {
    revalidateTag(body.tag, PURGE_TAG);
    revalidated.tags.push(body.tag);
  }
  if (body.path) {
    revalidatePath(body.path);
    revalidated.paths.push(body.path);
  }
  if (!body.tag && !body.path) {
    revalidateTag('showcase', PURGE_TAG);
    revalidatePath('/');
    revalidatePath('/case-studies');
    revalidated.tags.push('showcase');
    revalidated.paths.push('/', '/case-studies');
  }

  return NextResponse.json({ ok: true, revalidated, ts: Date.now() });
}
