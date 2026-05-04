import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Payload = {
  name: string;
  email: string;
  phone?: string;
  package: 'basic' | 'standard' | 'premium';
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // HH:MM
  notes?: string;
  website?: string; // honeypot
};

const PACKAGES = {
  basic: { duration: 30, label: 'Cơ bản (30 phút)', price: 299000 },
  standard: { duration: 60, label: 'Tiêu chuẩn (60 phút)', price: 599000 },
  premium: { duration: 120, label: 'Cao cấp (120 phút)', price: 1199000 },
} as const;

function isEmail(v: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}

function isDate(v: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(v);
}

function isTime(v: string) {
  return /^\d{2}:\d{2}$/.test(v);
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

function escapeMd(v: string) {
  return v.replace(/[*_`\[\]]/g, (m) => '\\' + m);
}

export async function POST(req: NextRequest) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!data.name?.trim() || !data.email?.trim() || !data.preferredDate || !data.preferredTime || !data.package) {
    return NextResponse.json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' }, { status: 400 });
  }
  if (!isEmail(data.email)) {
    return NextResponse.json({ error: 'Email không hợp lệ.' }, { status: 400 });
  }
  if (!isDate(data.preferredDate) || !isTime(data.preferredTime)) {
    return NextResponse.json({ error: 'Định dạng ngày/giờ không hợp lệ.' }, { status: 400 });
  }
  const pkg = PACKAGES[data.package];
  if (!pkg) {
    return NextResponse.json({ error: 'Gói tư vấn không hợp lệ.' }, { status: 400 });
  }

  const startTime = `${data.preferredTime}:00`;
  const endTime = `${addMinutes(data.preferredTime, pkg.duration)}:00`;

  // Insert into Long Sang Forge Supabase consultations table
  const FORGE_URL = process.env.FORGE_SUPABASE_URL;
  const FORGE_KEY = process.env.FORGE_SUPABASE_ANON_KEY;
  let bookingOk = false;
  if (FORGE_URL && FORGE_KEY) {
    try {
      const res = await fetch(`${FORGE_URL}/rest/v1/consultations`, {
        method: 'POST',
        headers: {
          apikey: FORGE_KEY,
          Authorization: `Bearer ${FORGE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          client_name: data.name,
          client_email: data.email,
          client_phone: data.phone || null,
          consultation_date: data.preferredDate,
          start_time: startTime,
          end_time: endTime,
          duration_minutes: pkg.duration,
          status: 'pending',
          consultation_type: pkg.label,
          notes: `[sabo.com.vn] ${data.notes || ''}`.trim(),
        }),
      });
      if (res.ok) {
        bookingOk = true;
      } else {
        const text = await res.text().catch(() => '');
        console.error('[booking] forge supabase insert failed', res.status, text);
      }
    } catch (err) {
      console.error('[booking] forge supabase error', err);
    }
  }

  // Telegram notification
  const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TG_CHAT = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (TG_TOKEN && TG_CHAT) {
    const text =
      `📅 *SABO M&T — New Booking*\n\n` +
      `*Package:* ${escapeMd(pkg.label)}\n` +
      `*When:* ${escapeMd(data.preferredDate)} ${escapeMd(data.preferredTime)}\n\n` +
      `*Name:* ${escapeMd(data.name)}\n` +
      `*Email:* ${escapeMd(data.email)}\n` +
      (data.phone ? `*Phone:* ${escapeMd(data.phone)}\n` : '') +
      (data.notes ? `\n*Notes:*\n${escapeMd(data.notes).slice(0, 1500)}\n` : '') +
      `\n_Persisted to forge:_ ${bookingOk ? '✅' : '❌'}`;
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
    } catch (err) {
      console.error('[booking] telegram error', err);
    }
  }

  // Confirmation email to client via Resend
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const RESEND_FROM = process.env.RESEND_FROM || 'onboarding@resend.dev';
  if (RESEND_KEY && data.email) {
    const [yyyy, mm, dd] = data.preferredDate.split('-');
    const dateFormatted = `${dd}/${mm}/${yyyy}`;
    const BANK_INFO = `
      <table style="border-collapse:collapse;width:100%;max-width:480px;margin:24px 0;font-family:monospace;font-size:14px">
        <tr><td style="padding:10px 14px;background:#f5f5f5;color:#555;width:160px">Ngân hàng</td><td style="padding:10px 14px;background:#fafafa;font-weight:600">MSB</td></tr>
        <tr><td style="padding:10px 14px;background:#f5f5f5;color:#555">Số tài khoản</td><td style="padding:10px 14px;background:#fafafa;font-weight:600">49666888</td></tr>
        <tr><td style="padding:10px 14px;background:#f5f5f5;color:#555">Chủ tài khoản</td><td style="padding:10px 14px;background:#fafafa;font-weight:600">CONG TY TNHH SABO MEDIA & TECHNOLOGY</td></tr>
        <tr><td style="padding:10px 14px;background:#f5f5f5;color:#555">Số tiền</td><td style="padding:10px 14px;background:#fafafa;font-weight:600;color:#000">${pkg.price.toLocaleString('vi-VN')} VNĐ</td></tr>
        <tr><td style="padding:10px 14px;background:#f5f5f5;color:#555">Nội dung CK</td><td style="padding:10px 14px;background:#fafafa;font-weight:600">SABO ${data.name.split(' ').pop()} ${data.preferredDate.replace(/-/g, '')}</td></tr>
      </table>`;

    const htmlBody = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'DM Sans',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#000;border-radius:0">

        <!-- Header -->
        <tr><td style="padding:40px 40px 24px">
          <p style="margin:0;font-family:serif;font-size:28px;font-weight:400;color:#fff;letter-spacing:-0.5px">SABO M&T</p>
          <p style="margin:6px 0 0;font-family:monospace;font-size:11px;color:#555;letter-spacing:0.15em;text-transform:uppercase">Custom AI Solutions Studio</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:0 40px 40px">
          <p style="color:#fff;font-size:22px;font-weight:600;margin:0 0 8px">Đặt lịch tư vấn đã nhận.</p>
          <p style="color:#aaa;font-size:15px;margin:0 0 32px;line-height:1.6">Xin chào <strong style="color:#fff">${data.name}</strong>, chúng tôi đã nhận yêu cầu đặt lịch của bạn. Vui lòng hoàn tất thanh toán để xác nhận slot.</p>

          <!-- Booking summary -->
          <table style="border-collapse:collapse;width:100%;margin-bottom:32px;font-size:14px">
            <tr style="border-bottom:1px solid #222">
              <td style="padding:12px 0;color:#666;width:140px">Gói tư vấn</td>
              <td style="padding:12px 0;color:#fff;font-weight:600">${pkg.label}</td>
            </tr>
            <tr style="border-bottom:1px solid #222">
              <td style="padding:12px 0;color:#666">Ngày</td>
              <td style="padding:12px 0;color:#fff;font-weight:600">${dateFormatted}</td>
            </tr>
            <tr style="border-bottom:1px solid #222">
              <td style="padding:12px 0;color:#666">Giờ bắt đầu</td>
              <td style="padding:12px 0;color:#fff;font-weight:600">${data.preferredTime}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#666">Phí tư vấn</td>
              <td style="padding:12px 0;color:#fff;font-weight:700;font-size:16px">${pkg.price.toLocaleString('vi-VN')} VNĐ</td>
            </tr>
          </table>

          <p style="color:#fff;font-size:16px;font-weight:600;margin:0 0 12px">Hướng dẫn thanh toán</p>
          <p style="color:#aaa;font-size:14px;margin:0 0 4px;line-height:1.6">Chuyển khoản theo thông tin dưới đây. Slot sẽ được xác nhận trong vòng <strong style="color:#fff">2 giờ</strong> sau khi nhận thanh toán.</p>
          ${BANK_INFO.replace(/background:#f5f5f5/g, 'background:#111').replace(/background:#fafafa/g, 'background:#0a0a0a').replace(/color:#555/g, 'color:#777').replace(/font-weight:600/g, 'font-weight:600;color:#fff')}

          <p style="color:#555;font-size:13px;margin:32px 0 0;line-height:1.6">Sau khi thanh toán, chúng tôi sẽ gửi email xác nhận kèm link Google Meet. Nếu có thắc mắc, liên hệ: <a href="mailto:contact@sabo.com.vn" style="color:#fff">contact@sabo.com.vn</a></p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 40px;border-top:1px solid #111">
          <p style="margin:0;font-family:monospace;font-size:11px;color:#444;letter-spacing:0.12em;text-transform:uppercase">SABO MEDIA & TECHNOLOGY — contact@sabo.com.vn — sabo.com.vn</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `SABO M&T <${RESEND_FROM}>`,
          to: [data.email],
          subject: `Đặt lịch tư vấn SABO — ${pkg.label} · ${data.preferredDate}`,
          html: htmlBody,
        }),
      });
    } catch (err) {
      console.error('[booking] resend error', err);
    }
  }

  if (!bookingOk && !(TG_TOKEN && TG_CHAT)) {
    return NextResponse.json({ error: 'Hệ thống tạm thời chưa thể nhận đặt lịch.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
