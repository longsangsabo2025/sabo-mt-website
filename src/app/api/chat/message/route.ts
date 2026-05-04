import { NextRequest, NextResponse } from 'next/server';
import { advanceChatState, type ChatState } from '@/lib/chat-lead-flow';
import { supabaseConfigured, supabaseRest } from '@/lib/supabase-service-rest';
import { rateLimitOk } from '@/lib/rate-limit-ip';

export const runtime = 'nodejs';

type Body = {
  session_id?: string;
  lead_id?: string;
  message?: string;
  current_step?: string;
};

export async function POST(req: NextRequest) {
  if (!supabaseConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!rateLimitOk(ip, 40, 3_600_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const leadId = body.lead_id?.trim();
  const message = body.message?.trim() || '';
  if (!leadId || !/^[0-9a-f-]{36}$/i.test(leadId)) {
    return NextResponse.json({ error: 'lead_id (uuid) required' }, { status: 400 });
  }
  if (!message || message.length > 4000) {
    return NextResponse.json({ error: 'message required (max 4000 chars)' }, { status: 400 });
  }

  const leadRes = await supabaseRest(`leads?id=eq.${leadId}&select=id,chat_state`, { method: 'GET' });
  if (!leadRes.ok) {
    return NextResponse.json({ error: 'lead_fetch_failed' }, { status: 502 });
  }
  const leads = (await leadRes.json()) as { id: string; chat_state: ChatState | null }[];
  if (!leads[0]) {
    return NextResponse.json({ error: 'lead_not_found' }, { status: 404 });
  }

  const prev = leads[0].chat_state as ChatState | null;
  const { state, reply, next_step, collected_data } = advanceChatState(
    body.current_step,
    message,
    prev,
  );

  const sessionId = body.session_id?.trim() || 'anonymous';

  const insUser = await supabaseRest('lead_conversations', {
    method: 'POST',
    prefer: 'return=minimal',
    body: JSON.stringify({
      lead_id: leadId,
      session_id: sessionId,
      message_role: 'user',
      message_content: message,
      metadata: { current_step: body.current_step ?? null },
    }),
  });
  if (!insUser.ok) {
    const t = await insUser.text().catch(() => '');
    console.error('[chat/message] user msg insert', insUser.status, t);
    return NextResponse.json({ error: 'persist_user_failed' }, { status: 502 });
  }

  const insAsst = await supabaseRest('lead_conversations', {
    method: 'POST',
    prefer: 'return=minimal',
    body: JSON.stringify({
      lead_id: leadId,
      session_id: sessionId,
      message_role: 'assistant',
      message_content: reply,
      metadata: { next_step },
    }),
  });
  if (!insAsst.ok) {
    console.error('[chat/message] assistant msg insert', insAsst.status);
  }

  const leadPatch: Record<string, unknown> = {
    chat_state: state,
    updated_at: new Date().toISOString(),
  };
  if (state.step === 'done' && collected_data.raw_contact?.trim()) {
    leadPatch.notes = collected_data.raw_contact.trim().slice(0, 8000);
  }

  const patch = await supabaseRest(`leads?id=eq.${leadId}`, {
    method: 'PATCH',
    prefer: 'return=minimal',
    body: JSON.stringify(leadPatch),
  });
  if (!patch.ok) {
    const t = await patch.text().catch(() => '');
    console.error('[chat/message] chat_state patch', patch.status, t);
  }

  return NextResponse.json({
    reply,
    next_step,
    collected_data,
  });
}
