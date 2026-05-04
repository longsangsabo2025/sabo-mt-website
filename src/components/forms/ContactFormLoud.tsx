'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string; callback: (token: string) => void; 'expired-callback'?: () => void; theme?: 'light' | 'dark' | 'auto' }) => string;
      reset: (id?: string) => void;
    };
  }
}

export function ContactFormLoud({ lang = 'vi' }: { lang?: 'vi' | 'en' }) {
  const en = lang === 'en';
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

  function renderTurnstile() {
    if (!siteKey || !turnstileRef.current || !window.turnstile) return;
    if (turnstileWidgetId.current) return;
    turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
      sitekey: siteKey,
      theme: 'dark',
      callback: (token) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
    });
  }
  useEffect(() => {
    if (!siteKey) return;
    const SCRIPT_ID = 'cf-turnstile-script';
    if (document.getElementById(SCRIPT_ID)) {
      renderTurnstile();
      return;
    }
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = renderTurnstile;
    document.head.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
      turnstileToken,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? (en ? 'An error occurred. Please try again.' : 'Đã có lỗi xảy ra. Vui lòng thử lại.'));
        setSubmitting(false);
        if (siteKey && window.turnstile && turnstileWidgetId.current) {
          window.turnstile.reset(turnstileWidgetId.current);
          setTurnstileToken('');
        }
        return;
      }
      setSubmitted(true);
    } catch {
      setError(en ? 'Connection failed. Please try again later.' : 'Không thể kết nối. Vui lòng thử lại sau.');
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="border-t border-white/10 pt-12">
        <p className="font-mono text-eyebrow text-paper/60 tracking-[0.16em]">{en ? 'THANK YOU' : 'CẢM ƠN'}</p>
        <p className="mt-6 text-h2 font-serif text-paper leading-tight">
          {en ? 'Received. We will reply within 24 business hours.' : 'Đã ghi nhận. Chúng tôi sẽ phản hồi trong 24h.'}
        </p>
      </div>
    );
  }

  const fieldClass =
    'w-full bg-transparent border-b border-white/30 focus:border-paper py-4 text-body-lg text-paper placeholder-paper/30 outline-none transition-colors';
  const labelClass = 'font-mono text-eyebrow text-paper/60 tracking-[0.16em] uppercase';

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div>
        <label htmlFor="cf-name" className={labelClass}>{en ? 'FULL NAME' : 'HỌ TÊN'}</label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={fieldClass}
          placeholder="Long Sang"
        />
      </div>

      <div>
        <label htmlFor="cf-email" className={labelClass}>{en ? 'EMAIL' : 'EMAIL'}</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>{en ? 'MESSAGE' : 'NỘI DUNG'}</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          className={fieldClass + ' resize-none'}
          placeholder={en ? 'Share your context and goals…' : 'Hãy chia sẻ bối cảnh và mục tiêu…'}
        />
      </div>

      {siteKey && (
        <div ref={turnstileRef} className="mt-4" />
      )}

      <div className="pt-4">
        {error && (
          <p className="text-body-sm text-red-400 mb-4">{error}</p>
        )}
        <button
          type="submit"
          disabled={submitting || (!!siteKey && !turnstileToken)}
          className="rounded-full inline-flex items-center gap-3 px-7 py-3.5 text-body-sm font-medium bg-paper text-ink hover:bg-paper-soft transition-colors disabled:opacity-60"
        >
          <span>{submitting ? (en ? 'Sending…' : 'Đang gửi…') : (en ? 'Send message' : 'Gửi yêu cầu')}</span>
          <span className="grid place-items-center rounded-full w-7 h-7 bg-ink text-paper">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>
    </form>
  );
}

export default ContactFormLoud;
