'use client';

import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { cn } from '@/lib/cn';

type PackageKey = 'basic' | 'standard' | 'premium';

const PACKAGES: Array<{
  key: PackageKey;
  name: string;
  duration: string;
  price: string;
  description: string;
  highlights: string[];
}> = [
  {
    key: 'basic',
    name: 'Cơ bản',
    duration: '30 phút',
    price: '299.000đ',
    description: 'Tìm hiểu nhanh — tư vấn 1:1, gợi ý hướng đi.',
    highlights: ['Google Meet 1:1', 'Q&A AI', 'Hướng đi sơ bộ'],
  },
  {
    key: 'standard',
    name: 'Tiêu chuẩn',
    duration: '60 phút',
    price: '599.000đ',
    description: 'Đào sâu vào use case — phân tích + roadmap khả thi.',
    highlights: ['Audit use case', 'Roadmap 30/60/90 ngày', 'Stack đề xuất'],
  },
  {
    key: 'premium',
    name: 'Cao cấp',
    duration: '120 phút',
    price: '1.199.000đ',
    description: 'Workshop sâu — kiến trúc, ROI, deliverable cụ thể.',
    highlights: ['Architecture review', 'Cost & ROI estimate', 'Deliverable doc'],
  },
];

export function BookingFormLoud() {
  const [pkg, setPkg] = useState<PackageKey>('standard');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Min date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().slice(0, 10);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      package: pkg,
      preferredDate: String(fd.get('preferredDate') ?? ''),
      preferredTime: String(fd.get('preferredTime') ?? ''),
      notes: String(fd.get('notes') ?? ''),
      website: String(fd.get('website') ?? ''),
    };
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !j.ok) {
        setError(j.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Không thể kết nối. Vui lòng thử lại.');
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="border-t border-paper/10 pt-12">
        <p className="font-mono text-eyebrow text-paper/60 tracking-[0.16em]">ĐÃ GHI NHẬN</p>
        <p className="mt-6 text-h2 font-serif text-paper leading-tight">
          Cảm ơn bạn. Chúng tôi sẽ xác nhận slot và gửi link Google Meet trong 24h qua email.
        </p>
      </div>
    );
  }

  const fieldClass =
    'w-full bg-transparent border-b border-paper/30 focus:border-paper py-4 text-body-lg text-paper placeholder-paper/30 outline-none transition-colors';
  const labelClass = 'font-mono text-eyebrow text-paper/60 tracking-[0.16em] uppercase';

  return (
    <div className="space-y-16">
      {/* Package picker */}
      <div>
        <p className={labelClass}>CHỌN GÓI TƯ VẤN</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {PACKAGES.map((p) => {
            const active = pkg === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setPkg(p.key)}
                className={cn(
                  'text-left p-6 border transition-colors group',
                  active
                    ? 'bg-paper text-ink border-paper'
                    : 'border-paper/20 hover:border-paper text-paper'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={cn('font-mono text-caption tracking-[0.16em] uppercase', active ? 'text-ink/60' : 'text-paper/60')}>
                      {p.duration}
                    </p>
                    <p className="text-h3 font-serif mt-1">{p.name}</p>
                  </div>
                  <span
                    className={cn(
                      'w-6 h-6 rounded-full grid place-items-center border',
                      active ? 'bg-ink border-ink' : 'border-paper/30'
                    )}
                  >
                    {active && <Check className="w-3.5 h-3.5 text-paper" />}
                  </span>
                </div>
                <p className={cn('mt-4 text-body-sm', active ? 'text-ink/80' : 'text-paper/70')}>
                  {p.description}
                </p>
                <p className="mt-6 text-body-lg font-medium">{p.price}</p>
                <ul className={cn('mt-4 space-y-1 text-body-sm', active ? 'text-ink/70' : 'text-paper/60')}>
                  {p.highlights.map((h) => (
                    <li key={h}>— {h}</li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="b-name" className={labelClass}>HỌ TÊN *</label>
            <input id="b-name" name="name" type="text" required autoComplete="name" className={fieldClass} placeholder="Long Sang" />
          </div>
          <div>
            <label htmlFor="b-email" className={labelClass}>EMAIL *</label>
            <input id="b-email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@company.com" />
          </div>
          <div>
            <label htmlFor="b-phone" className={labelClass}>SỐ ĐIỆN THOẠI</label>
            <input id="b-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} placeholder="0901 234 567" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="b-date" className={labelClass}>NGÀY *</label>
              <input
                id="b-date"
                name="preferredDate"
                type="date"
                required
                min={minDate}
                className={cn(fieldClass, 'appearance-none')}
                style={{ colorScheme: 'dark' }}
              />
            </div>
            <div>
              <label htmlFor="b-time" className={labelClass}>GIỜ *</label>
              <input
                id="b-time"
                name="preferredTime"
                type="time"
                required
                defaultValue="10:00"
                className={cn(fieldClass, 'appearance-none')}
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="b-notes" className={labelClass}>BỐI CẢNH / MỤC TIÊU</label>
          <textarea
            id="b-notes"
            name="notes"
            rows={4}
            className={fieldClass + ' resize-none'}
            placeholder="Doanh nghiệp đang gặp vấn đề gì? Bạn muốn build / automate / create gì?"
          />
        </div>

        {error && (
          <p className="text-body-sm text-red-400 border-l-2 border-red-400 pl-4">{error}</p>
        )}

        <div className="pt-4 flex flex-wrap items-center gap-6">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full inline-flex items-center gap-3 px-7 py-3.5 text-body-sm font-medium bg-paper text-ink hover:bg-paper-soft transition-colors disabled:opacity-60"
          >
            <span>{submitting ? 'Đang gửi…' : 'Đặt lịch tư vấn'}</span>
            <span className="grid place-items-center rounded-full w-7 h-7 bg-ink text-paper">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </button>
          <p className="text-caption font-mono text-paper/50 tracking-[0.12em]">
            CHÚNG TÔI SẼ XÁC NHẬN SLOT QUA EMAIL TRONG 24H
          </p>
        </div>
      </form>
    </div>
  );
}

export default BookingFormLoud;
