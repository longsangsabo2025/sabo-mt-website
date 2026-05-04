import { NextRequest, NextResponse } from 'next/server';
import { supabaseConfigured, supabaseRest } from '@/lib/supabase-service-rest';

export const runtime = 'nodejs';

type Body = {
  lead_id?: string;
  booking_time?: string;
  meeting_channel?: string;
  meeting_link?: string;
};

export async function POST(req: NextRequest) {
  if (!supabaseConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const leadId = body.lead_id?.trim();
  if (!leadId || !/^[0-9a-f-]{36}$/i.test(leadId)) {
    return NextResponse.json({ error: 'lead_id (uuid) required' }, { status: 400 });
  }
  const bookingTime = body.booking_time?.trim();
  if (!bookingTime || Number.isNaN(Date.parse(bookingTime))) {
    return NextResponse.json({ error: 'booking_time ISO-8601 required' }, { status: 400 });
  }

  const row = {
    lead_id: leadId,
    booking_time: bookingTime,
    meeting_channel: body.meeting_channel?.trim() || null,
    meeting_link: body.meeting_link?.trim() || null,
    status: 'pending',
  };

  const res = await supabaseRest('demo_bookings', {
    method: 'POST',
    prefer: 'return=representation',
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('[demo-booking] insert', res.status, detail);
    return NextResponse.json({ error: 'insert_failed', detail: detail.slice(0, 400) }, { status: 502 });
  }

  const rows = (await res.json()) as { id: string }[];
  const booking_id = rows[0]?.id;
  if (!booking_id) {
    return NextResponse.json({ error: 'no_booking_id' }, { status: 500 });
  }

  await supabaseRest(`leads?id=eq.${leadId}`, {
    method: 'PATCH',
    prefer: 'return=minimal',
    body: JSON.stringify({
      lead_status: 'demo_booked',
      next_action: 'demo_done',
      updated_at: new Date().toISOString(),
    }),
  }).catch(() => {});

  return NextResponse.json({
    booking_id,
    status: 'pending',
    message: 'Demo booking created',
  });
}
