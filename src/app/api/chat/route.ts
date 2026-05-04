import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt } from '@/lib/chat-context';

export const runtime = 'nodejs';

type Message = { role: 'user' | 'assistant'; content: string };

// Rate limiter — 20 requests / IP / hour
const rateMap = new Map<string, { count: number; ts: number }>();

function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  // 1 hour window
  if (!entry || now - entry.ts > 3_600_000) {
    rateMap.set(ip, { count: 1, ts: now });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: 'Quá nhiều request. Vui lòng thử lại sau 1 giờ hoặc dùng form contact tại /contact.' },
      { status: 429 },
    );
  }

  let messages: Message[];
  try {
    const body = (await req.json()) as { messages?: unknown };
    if (!Array.isArray(body.messages)) throw new Error('invalid');
    messages = body.messages as Message[];
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Validate
  if (messages.length === 0 || messages.length > 20) {
    return NextResponse.json({ error: 'Invalid message count' }, { status: 400 });
  }
  for (const m of messages) {
    if (!['user', 'assistant'].includes(m.role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }
    if (typeof m.content !== 'string' || m.content.length > 2000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  // Build system prompt with SABO services context
  const systemPrompt = buildSystemPrompt();

  const groqRes = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        max_tokens: 400,
        temperature: 0.5,
        stream: true,
      }),
    },
  );

  if (!groqRes.ok) {
    const text = await groqRes.text().catch(() => '');
    console.error('[chat] groq error', groqRes.status, text);
    return NextResponse.json({ error: 'AI service error' }, { status: 502 });
  }

  // Proxy the SSE stream directly to the client
  return new Response(groqRes.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
