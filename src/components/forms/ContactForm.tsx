'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { ROLES, COMPANY_SIZES, SERVICES } from '@/content/site';
import { ROLES_EN, COMPANY_SIZES_EN } from '@/content/site.en';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string; callback: (token: string) => void; 'expired-callback'?: () => void; theme?: 'light' | 'dark' | 'auto' }) => string;
      reset: (id?: string) => void;
    };
  }
}

type State = 'idle' | 'submitting' | 'success' | 'error';
type Lang = 'vi' | 'en';

const T = {
  vi: {
    name: 'Họ tên', email: 'Email công ty', phone: 'Số điện thoại', company: 'Tên công ty',
    role: 'Vai trò', size: 'Quy mô doanh nghiệp', services: 'Dịch vụ quan tâm',
    message: 'Mô tả nhu cầu', messagePh: 'Vấn đề doanh nghiệp đang gặp, mục tiêu mong muốn, timeline kỳ vọng...',
    submit: 'Gửi yêu cầu', submitting: 'Đang gửi...', sla: 'Phản hồi trong 24 giờ làm việc.',
    selectPh: '— Chọn —', errName: 'Vui lòng nhập họ tên.', errEmail: 'Vui lòng nhập email công ty.',
    errEmailFormat: 'Vui lòng kiểm tra lại email của quý vị.', errMsg: 'Vui lòng mô tả ngắn gọn nhu cầu.',
    errGeneric: 'Có lỗi xảy ra. Vui lòng thử lại sau ít phút.',
    successTitle: 'Cảm ơn quý vị', successBody: 'Chúng tôi đã nhận được yêu cầu và sẽ phản hồi trong vòng 24 giờ làm việc. Trong thời gian chờ, quý vị có thể đặt lịch tư vấn trực tiếp qua link bên dưới.',
    successCta: 'Đặt lịch tư vấn 30 phút'
  },
  en: {
    name: 'Full name', email: 'Work email', phone: 'Phone number', company: 'Company',
    role: 'Role', size: 'Company size', services: 'Services of interest',
    message: 'Describe your needs', messagePh: 'What problem you\'re solving, your goals, expected timeline...',
    submit: 'Send request', submitting: 'Sending...', sla: 'Reply within 24 business hours.',
    selectPh: '— Select —', errName: 'Please enter your name.', errEmail: 'Please enter your work email.',
    errEmailFormat: 'Please double-check your email.', errMsg: 'Please briefly describe your needs.',
    errGeneric: 'Something went wrong. Please try again in a moment.',
    successTitle: 'Thank you', successBody: 'We\'ve received your request and will reply within 24 business hours. In the meantime, you can book a consultation directly via the link below.',
    successCta: 'Book a 30-minute consultation'
  }
} as const;

export function ContactForm({ lang = 'vi' }: { lang?: Lang } = {}) {
  const t = T[lang];
  const params = useSearchParams();
  const preselectedService = params?.get('service') ?? '';
  const [state, setState] = useState<State>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [services, setServices] = useState<string[]>(preselectedService ? [preselectedService] : []);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

  useEffect(() => {
    if (preselectedService) setServices([preselectedService]);
  }, [preselectedService]);

  function renderTurnstile() {
    if (!turnstileSiteKey || !turnstileRef.current || !window.turnstile) return;
    if (turnstileWidgetId.current) return;
    turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
      sitekey: turnstileSiteKey,
      theme: 'light',
      callback: (token) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken('')
    });
  }

  function toggleService(slug: string) {
    setServices((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setErrorMsg('');
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      company: String(fd.get('company') || '').trim(),
      role: String(fd.get('role') || '').trim(),
      size: String(fd.get('size') || '').trim(),
      services,
      message: String(fd.get('message') || '').trim(),
      website: String(fd.get('website') || ''), // honeypot
      turnstileToken
    };

    const e2: Record<string, string> = {};
    if (!payload.name) e2.name = t.errName;
    if (!payload.email) e2.email = t.errEmail;
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) e2.email = t.errEmailFormat;
    if (!payload.message) e2.message = t.errMsg;
    if (turnstileSiteKey && !turnstileToken) e2.captcha = lang === 'en' ? 'Please complete the captcha.' : 'Vui lòng xác minh captcha.';
    if (Object.keys(e2).length) { setErrors(e2); return; }

    setState('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || t.errGeneric);
      }
      setState('success');
    } catch (err) {
      const message = err instanceof Error ? err.message : t.errGeneric;
      setErrorMsg(message);
      setState('error');
      // reset captcha so user can retry
      if (turnstileSiteKey && window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
        setTurnstileToken('');
      }
    }
  }

  if (state === 'success') {
    return (
      <div className="card p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-success/15 text-success grid place-items-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h2 className="mt-6 font-serif text-heading-lg text-ink">{t.successTitle}</h2>
        <p className="mt-3 text-body-md text-slate-600 max-w-md mx-auto">{t.successBody}</p>
        <a href="https://cal.com/sabomt" target="_blank" rel="noreferrer" className="btn btn-md btn-primary mt-8 inline-flex">
          {t.successCta}
        </a>
      </div>
    );
  }

  const roles = lang === 'en' ? ROLES_EN : ROLES;
  const sizes = lang === 'en' ? COMPANY_SIZES_EN : COMPANY_SIZES;

  return (
    <>
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
          onLoad={renderTurnstile}
        />
      )}
      <form onSubmit={handleSubmit} noValidate className="card p-6 md:p-10 space-y-6">
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off"
        className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true" />

      <div className="grid md:grid-cols-2 gap-5">
        <Field label={t.name} name="name" required error={errors.name} />
        <Field label={t.email} name="email" type="email" required error={errors.email} />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label={t.phone} name="phone" type="tel" />
        <Field label={t.company} name="company" />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <SelectField label={t.role} name="role" options={roles as readonly string[]} placeholder={t.selectPh} />
        <SelectField label={t.size} name="size" options={sizes as readonly string[]} placeholder={t.selectPh} />
      </div>

      <div>
        <label className="label">{t.services}</label>
        <div className="grid sm:grid-cols-3 gap-2">
          {SERVICES.map((s) => {
            const active = services.includes(s.slug);
            return (
              <button type="button" key={s.slug} onClick={() => toggleService(s.slug)}
                className={`text-left px-4 py-3 rounded-md border transition ${
                  active ? 'border-navy bg-navy/[0.04] text-ink' : 'border-slate-300 hover:border-navy text-slate-700'
                }`}>
                <div className="font-mono text-eyebrow uppercase text-gold tracking-wider">{s.number}</div>
                <div className="mt-1 text-body-sm font-medium">{s.eyebrow}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label">{t.message} <span className="text-gold">*</span></label>
        <textarea id="message" name="message" className="textarea" placeholder={t.messagePh} />
        {errors.message && <div className="error-text"><AlertCircle className="w-3.5 h-3.5" />{errors.message}</div>}
      </div>

      {state === 'error' && errorMsg && (
        <div className="rounded-md border border-error/30 bg-error/5 px-4 py-3 text-body-sm text-error inline-flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {errorMsg}
        </div>
      )}

      {turnstileSiteKey && (
        <div>
          <div ref={turnstileRef} className="min-h-[65px]" />
          {errors.captcha && <div className="error-text"><AlertCircle className="w-3.5 h-3.5" />{errors.captcha}</div>}
        </div>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={state === 'submitting'} className="btn btn-md btn-primary">
          {state === 'submitting' ? <><Loader2 className="w-4 h-4 animate-spin" />{t.submitting}</> : t.submit}
        </button>
        <span className="text-body-sm text-slate-500">{t.sla}</span>
      </div>
    </form>
    </>
  );
}

function Field({ label, name, type = 'text', required = false, error }: { label: string; name: string; type?: string; required?: boolean; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="label">{label} {required && <span className="text-gold">*</span>}</label>
      <input id={name} name={name} type={type} className="input" />
      {error && <div className="error-text"><AlertCircle className="w-3.5 h-3.5" />{error}</div>}
    </div>
  );
}

function SelectField({ label, name, options, placeholder }: { label: string; name: string; options: readonly string[]; placeholder: string }) {
  return (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      <select id={name} name={name} className="select" defaultValue="">
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

