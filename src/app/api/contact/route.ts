import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import {
  calculateLeadScore,
  classifyLead,
  getNextAction,
  scoreFromLeadPayload,
} from '@/lib/lead-scoring';
import { supabaseConfigured, supabaseRest } from '@/lib/supabase-service-rest';

export const runtime = 'nodejs';

type Payload = {
  name: string; email: string; phone?: string; company?: string;
  role?: string; size?: string; services?: string[]; message: string;
  website?: string; // honeypot
  turnstileToken?: string; // optional, only checked when TURNSTILE_SECRET_KEY set
};

function isEmail(v: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}

async function verifyTurnstile(token: string | undefined, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return true; // not configured → skip
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body
    });
    const j = (await res.json()) as { success?: boolean };
    return Boolean(j.success);
  } catch (err) {
    console.error('[contact] turnstile verify error', err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot — bot will fill this hidden field
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true }); // silently accept, drop
  }

  if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
    return NextResponse.json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' }, { status: 400 });
  }
  if (!isEmail(data.email)) {
    return NextResponse.json({ error: 'Email không hợp lệ.' }, { status: 400 });
  }
  if (data.message.length > 5000 || data.name.length > 200) {
    return NextResponse.json({ error: 'Nội dung quá dài.' }, { status: 400 });
  }

  // Anti-bot — Cloudflare Turnstile (only enforced when configured)
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    null;
  const tsOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!tsOk) {
    return NextResponse.json({ error: 'Captcha không hợp lệ. Vui lòng tải lại trang và thử lại.' }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  const userAgent = req.headers.get('user-agent')?.slice(0, 500) || null;
  const ipHash = ip ? createHash('sha256').update(ip).digest('hex').slice(0, 32) : null;

  // Persist to Supabase if configured (extended row when migration 20260503 applied)
  if (supabaseConfigured()) {
    try {
      const input = scoreFromLeadPayload({
        main_pain: data.message,
        business_size: data.size,
        decision_role: data.role,
      });
      const lead_score = calculateLeadScore(input);
      const tier = classifyLead(lead_score);
      const next_action = getNextAction(lead_score);

      const extended = {
        name: data.name.trim(),
        full_name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || null,
        company: data.company?.trim() || null,
        role: data.role?.trim() || null,
        company_size: data.size?.trim() || null,
        main_pain: data.message.trim().slice(0, 5000),
        services: data.services || [],
        message: data.message.trim(),
        submitted_at: submittedAt,
        source: 'sabo.com.vn',
        user_agent: userAgent,
        ip_hash: ipHash,
        lead_score,
        lead_status: tier,
        next_action,
      };

      let res = await supabaseRest('leads', {
        method: 'POST',
        prefer: 'return=minimal',
        body: JSON.stringify(extended),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error('[contact] supabase insert failed (extended)', res.status, text);
        const minimal = {
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone?.trim() || null,
          company: data.company?.trim() || null,
          role: data.role?.trim() || null,
          company_size: data.size?.trim() || null,
          services: data.services || [],
          message: data.message.trim(),
          submitted_at: submittedAt,
          source: 'sabo.com.vn',
          user_agent: userAgent,
          ip_hash: ipHash,
        };
        res = await supabaseRest('leads', {
          method: 'POST',
          prefer: 'return=minimal',
          body: JSON.stringify(minimal),
        });
        if (!res.ok) {
          const t2 = await res.text().catch(() => '');
          console.error('[contact] supabase insert failed (minimal)', res.status, t2);
        }
      }
    } catch (err) {
      console.error('[contact] supabase error', err);
      // continue — telegram notification is the safety net
    }
  }

  // Telegram notification to founder
  const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TG_CHAT = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (TG_TOKEN && TG_CHAT) {
    const text =
      `🆕 *SABO M&T — New Lead*\n\n` +
      `*Name:* ${escapeMd(data.name)}\n` +
      `*Email:* ${escapeMd(data.email)}\n` +
      (data.phone ? `*Phone:* ${escapeMd(data.phone)}\n` : '') +
      (data.company ? `*Company:* ${escapeMd(data.company)}\n` : '') +
      (data.role ? `*Role:* ${escapeMd(data.role)}\n` : '') +
      (data.size ? `*Size:* ${escapeMd(data.size)}\n` : '') +
      (data.services?.length ? `*Services:* ${escapeMd(data.services.join(', '))}\n` : '') +
      `\n*Message:*\n${escapeMd(data.message).slice(0, 3500)}`;
    try {
      await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT,
          text,
          parse_mode: 'Markdown',
          disable_web_page_preview: true
        })
      });
    } catch (err) {
      console.error('[contact] telegram error', err);
    }
  }

  // Email notification via Resend
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const RESEND_FROM = process.env.RESEND_FROM ?? 'onboarding@resend.dev';
  if (RESEND_KEY && ADMIN_EMAIL) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: RESEND_FROM,
          to: ADMIN_EMAIL,
          subject: `[SABO M&T] Lead mới — ${data.name}`,
          html: [
            `<h2 style="font-family:sans-serif;margin:0 0 16px">Lead mới từ sabo.com.vn</h2>`,
            `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">`,
            `<tr><td style="padding:6px 16px 6px 0;color:#666"><b>Tên</b></td><td>${escHtml(data.name)}</td></tr>`,
            `<tr><td style="padding:6px 16px 6px 0;color:#666"><b>Email</b></td><td><a href="mailto:${escHtml(data.email)}">${escHtml(data.email)}</a></td></tr>`,
            data.phone ? `<tr><td style="padding:6px 16px 6px 0;color:#666"><b>Phone</b></td><td>${escHtml(data.phone)}</td></tr>` : '',
            data.company ? `<tr><td style="padding:6px 16px 6px 0;color:#666"><b>Công ty</b></td><td>${escHtml(data.company)}</td></tr>` : '',
            `</table>`,
            `<hr style="margin:16px 0;border:none;border-top:1px solid #eee">`,
            `<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escHtml(data.message)}</p>`,
            `<p style="font-family:sans-serif;font-size:12px;color:#999;margin-top:24px">Gửi lúc ${submittedAt}</p>`,
          ].join(''),
        }),
      });
    } catch (err) {
      console.error('[contact] resend error', err);
    }
  }

  // Optional: forward to external webhook (e.g. longsang.org CRM)
  const FORWARD_URL = process.env.CONTACT_FORWARD_URL;
  if (FORWARD_URL) {
    try {
      await fetch(FORWARD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          company: data.company || null,
          message: data.message,
          source: 'sabo.com.vn',
          submitted_at: submittedAt,
        }),
      });
    } catch (err) {
      console.error('[contact] forward error', err);
    }
  }

  return NextResponse.json({ ok: true });
}

function escapeMd(v: string) {
  return v.replace(/[*_`\[\]]/g, (m) => '\\' + m);
}

function escHtml(v: string) {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
