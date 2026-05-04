import { NextRequest, NextResponse } from 'next/server';
import { supabaseConfigured, supabaseRest } from '@/lib/supabase-service-rest';

export const runtime = 'nodejs';

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!supabaseConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const { id } = await ctx.params;
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: 'invalid_id' }, { status: 400 });
  }

  const res = await supabaseRest(`leads?id=eq.${id}&select=*`, { method: 'GET' });
  if (!res.ok) {
    return NextResponse.json({ error: 'fetch_failed' }, { status: 502 });
  }
  const rows = (await res.json()) as Record<string, unknown>[];
  const lead = rows[0];
  if (!lead) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  return NextResponse.json({
    id: lead.id,
    full_name: lead.full_name ?? lead.name,
    phone: lead.phone,
    email: lead.email,
    company_name: lead.company,
    industry: lead.industry,
    business_size: lead.company_size,
    main_pain: lead.main_pain,
    budget_range: lead.budget_range,
    decision_role: lead.role,
    urgency: lead.urgency,
    lead_score: lead.lead_score,
    lead_status: lead.lead_status,
    next_action: lead.next_action,
    source: lead.source,
    submitted_at: lead.submitted_at,
  });
}
