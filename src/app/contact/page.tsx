import type { Metadata } from 'next';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPython, SiGooglegemini } from '@icons-pack/react-simple-icons';
import { Mail, Phone, User, MapPin, Calendar } from 'lucide-react';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { ContactFormLoud } from '@/components/forms/ContactFormLoud';
import { SITE } from '@/content/site';

export const metadata: Metadata = {
  title: 'Liên hệ — Cùng SABO khởi đầu hôm nay',
  description: 'Liên hệ SABO M&T để tư vấn miễn phí về giải pháp phần mềm tùy chỉnh, tự động hóa, và sản xuất media AI cho doanh nghiệp của bạn.',
  keywords: ['liên hệ', 'tư vấn phần mềm', 'AI solutions contact', 'SABO contact'],
  openGraph: {
    title: 'Liên hệ — SABO M&T',
    description: 'Gửi tin nhắn tới SABO M&T. Tư vấn miễn phí về giải pháp phần mềm tùy chỉnh và AI.',
    url: 'https://sabo.com.vn/contact',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Contact SABO M&T' }]
  },
  alternates: {
    canonical: 'https://sabo.com.vn/contact',
    languages: { 'en': 'https://sabo.com.vn/en/contact' }
  }
};

export default function ContactPage() {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://sabo.com.vn/contact',
    name: SITE.name,
    alternateName: SITE.shortName,
    description: 'Custom AI Solutions Studio — xây dựng phần mềm tùy chỉnh, tự động hóa AI, và sản xuất media cho doanh nghiệp Việt Nam',
    url: 'https://sabo.com.vn',
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.split(',')[0],
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'VN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '10.8231',
      longitude: '106.6297'
    },
    areaServed: 'Vietnam',
    openingHours: 'Mo-Fr 09:00-18:00'
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <section className="bg-ink text-paper pt-40 pb-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <EyebrowLabel tone="light">CONTACT — LIÊN HỆ</EyebrowLabel>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-6 flex flex-col">
            <h1 className="text-display-1 font-serif text-paper text-balance leading-[0.95]">
              Cùng SABO
              <br />
              khởi đầu
              <br />
              hôm nay.
            </h1>
            <p className="mt-8 font-mono text-sm uppercase tracking-[0.12em] text-paper/50">
              Phản hồi trong 24h làm việc.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/40 text-paper/70">Tư vấn miễn phí</span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/40 text-paper/70">Phần mềm tùy chỉnh</span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/40 text-paper/70">Tự động hoá AI</span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/40 text-paper/70">Sản xuất media</span>
            </div>
            <div className="mt-5 pt-4 border-t border-paper/10 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-xs text-paper/40 uppercase tracking-[0.12em]">Stack</span>
              <SiFlutter size={14} className="text-paper" title="Flutter" />
              <SiNextdotjs size={14} className="text-paper" title="Next.js" />
              <SiTypescript size={14} className="text-paper" title="TypeScript" />
              <SiSupabase size={14} className="text-paper" title="Supabase" />
              <SiPython size={14} className="text-paper" title="Python" />
              <SiGooglegemini size={14} className="text-paper" title="Gemini AI" />
            </div>

            <div className="mt-16 space-y-10 max-w-md">
              <a
                href={`mailto:${SITE.email}`}
                className="block group border-t border-paper/10 pt-6 transition-colors hover:border-paper"
              >
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-paper/40" />
                  <EyebrowLabel tone="light">EMAIL</EyebrowLabel>
                </div>
                <div className="mt-3 text-h3 font-serif text-paper group-hover:text-paper/80 transition-colors">
                  {SITE.email}
                </div>
              </a>

              {SITE.phone && (
                <a
                  href={`tel:${SITE.phone}`}
                  className="block group border-t border-paper/10 pt-6 transition-colors hover:border-paper"
                >
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-paper/40" />
                    <EyebrowLabel tone="light">ĐIỆN THOẠI</EyebrowLabel>
                  </div>
                  <div className="mt-3 text-h3 font-serif text-paper group-hover:text-paper/80 transition-colors">
                    {SITE.phone}
                  </div>
                </a>
              )}

              <div className="block border-t border-paper/10 pt-6">
                <div className="flex items-center gap-2">
                  <User size={12} className="text-paper/40" />
                  <EyebrowLabel tone="light">NGƯỜI SÁNG LẬP</EyebrowLabel>
                </div>
                <a
                  href={`mailto:${SITE.emailFounder}`}
                  className="mt-3 text-h3 font-serif text-paper hover:text-paper/80 transition-colors block"
                >
                  {SITE.emailFounder}
                </a>
              </div>

              <div className="block border-t border-paper/10 pt-6">
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-paper/40" />
                  <EyebrowLabel tone="light">ĐỊA CHỈ</EyebrowLabel>
                </div>
                <div className="mt-3 text-h3 font-serif text-paper">{SITE.address}</div>
              </div>

              <a
                href="/booking"
                className="block group border-t border-paper/10 pt-6 transition-colors hover:border-paper"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-paper/40" />
                  <EyebrowLabel tone="light">ĐẶT LỊCH TƯ VẤN 1:1</EyebrowLabel>
                </div>
                <div className="mt-3 text-h3 font-serif text-paper group-hover:text-paper/80 transition-colors">
                  Đặt lịch Google Meet →
                </div>
                <p className="mt-2 font-mono text-body-sm text-paper/60">
                  30/60/120 phút · Có thể thanh toán online · Tự chọn slot
                </p>
              </a>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <ContactFormLoud />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
