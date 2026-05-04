import { NextRequest, NextResponse } from 'next/server';
import {
  calculateLeadScore,
  classifyLead,
  getNextAction,
  scoreFromLeadPayload,
} from '@/lib/lead-scoring';
import { supabaseConfigured, supabaseRest } from '@/lib/supabase-service-rest';

export const runtime = 'nodejs';

type Body = {
  full_name?: string;
  phone?: string;
  email?: string;
  company_name?: string;
  industry?: string;
  business_size?: string;
  main_pain?: string;
  current_process?: string;
  budget_range?: string;
  decision_role?: string;
  urgency?: string;
  preferred_channel?: string;
  source?: string;
};

function escapeMd(v: string) {
  return v.replace(/[*_`\[\]]/g, (m) => '\\' + m);
}

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

  if (!body.full_name?.trim() || !body.email?.trim()) {
    return NextResponse.json({ error: 'full_name and email are required' }, { status: 400 });
  }

  const input = scoreFromLeadPayload({
    main_pain: body.main_pain,
    business_size: body.business_size,
    budget_range: body.budget_range,
    urgency: body.urgency,
    decision_role: body.decision_role,
  });
  const lead_score = calculateLeadScore(input);
  const tier = classifyLead(lead_score);
  const next_action = getNextAction(lead_score);

  const row = {
    name: body.full_name.trim(),
    full_name: body.full_name.trim(),
    email: body.email.trim(),
    phone: body.phone?.trim() || null,
    company: body.company_name?.trim() || null,
    industry: body.industry?.trim() || null,
    company_size: body.business_size?.trim() || null,
    role: body.decision_role?.trim() || null,
    main_pain: body.main_pain?.trim() || null,
    current_process: body.current_process?.trim() || null,
    budget_range: body.budget_range?.trim() || null,
    urgency: body.urgency?.trim() || null,
    preferred_channel: body.preferred_channel?.trim() || null,
    message: body.main_pain?.trim() || '(Lead API — xem main_pain / notes)',
    source: body.source?.trim() || 'website_chatbot',
    lead_score,
    lead_status: tier,
    next_action,
    submitted_at: new Date().toISOString(),
    services: [] as string[],
  };

  const res = await supabaseRest('leads', {
    method: 'POST',
    prefer: 'return=representation',
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('[leads] insert failed', res.status, detail);
    return NextResponse.json(
      { error: 'insert_failed', status: res.status, detail: detail.slice(0, 500) },
      { status: 502 },
    );
  }

  const inserted = (await res.json()) as { id: string }[];
  const lead_id = inserted[0]?.id;
  if (!lead_id) {
    return NextResponse.json({ error: 'no_lead_id' }, { status: 500 });
  }

  const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TG_CHAT = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (TG_TOKEN && TG_CHAT && lead_score >= 70) {
    const text =
      `🔥 *Hot lead* (${lead_score}/100)\n\n` +
      `*Name:* ${escapeMd(body.full_name.trim())}\n` +
      `*Email:* ${escapeMd(body.email.trim())}\n` +
      (body.phone ? `*Phone:* ${escapeMd(body.phone)}\n` : '') +
      `*Next:* ${escapeMd(next_action)}`;
    try {
      await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT,
          text,
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        }),
      });
    } catch (e) {
      console.error('[leads] telegram', e);
    }
  }

  return NextResponse.json({
    lead_id,
    lead_score,
    lead_status: tier,
    next_action,
  });
}
