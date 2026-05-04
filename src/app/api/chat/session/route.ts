import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { supabaseConfigured, supabaseRest } from '@/lib/supabase-service-rest';
import { rateLimitOk } from '@/lib/rate-limit-ip';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  if (!supabaseConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!rateLimitOk(ip, 20, 3_600_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const id = randomUUID();
  const email = `lead-${id}@invalid`;
  const row = {
    name: 'Khách (chat)',
    full_name: 'Khách (chat)',
    email,
    message: 'Phiên khảo sát Uyển Nhi — hoàn tất trong widget.',
    source: 'website_uyen_nhi',
    services: [] as string[],
    lead_score: 0,
    lead_status: 'new_lead',
    next_action: 'send_lead_magnet',
    submitted_at: new Date().toISOString(),
  };

  const res = await supabaseRest('leads', {
    method: 'POST',
    prefer: 'return=representation',
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('[chat/session] insert', res.status, detail);
    return NextResponse.json(
      { error: 'insert_failed', detail: detail.slice(0, 400) },
      { status: 502 },
    );
  }

  const rows = (await res.json()) as { id: string }[];
  const lead_id = rows[0]?.id;
  if (!lead_id) {
    return NextResponse.json({ error: 'no_lead_id' }, { status: 500 });
  }

  return NextResponse.json({ lead_id });
}
