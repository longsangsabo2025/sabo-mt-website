'use client';

import { PillCTA } from '@/components/ui/PillCTA';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import useLetterReveal from '@/hooks/useLetterReveal';
import type { LucideIcon } from 'lucide-react';
import { Bot, Clapperboard, Code2, Cpu, Factory } from 'lucide-react';

const SERVICE_TIERS_VI = [
  { label: 'BUILD — Phần mềm tùy chỉnh', href: '/services/build', icon: Code2 },
  { label: 'AUTOMATE — AI & Quy trình tự động', href: '/services/automate', icon: Bot },
  { label: 'CREATE — Sản xuất Media', href: '/services/create', icon: Clapperboard },
];

const SERVICE_TIERS_EN = [
  { label: 'BUILD — Custom Software', href: '/en/services/build', icon: Code2 },
  { label: 'AUTOMATE — AI & Workflow', href: '/en/services/automate', icon: Bot },
  { label: 'CREATE — Media Production', href: '/en/services/create', icon: Clapperboard },
];

const STATS_VI: Array<{ num: string; label: string; icon: LucideIcon }> = [
  { num: '15+', label: 'Sản phẩm đã ship', icon: Factory },
  { num: '4', label: 'Lĩnh vực', icon: Cpu },
  { num: '3+', label: 'Năm làm AI', icon: Bot },
];

const STATS_EN: Array<{ num: string; label: string; icon: LucideIcon }> = [
  { num: '15+', label: 'Products shipped', icon: Factory },
  { num: '4', label: 'Industries', icon: Cpu },
  { num: '3+', label: 'Years in AI', icon: Bot },
];

interface HeroProps { locale?: 'vi' | 'en' }

export function Hero({ locale = 'vi' }: HeroProps) {
  const headlineRef = useLetterReveal<HTMLParagraphElement>();
  const en = locale === 'en';
  const tiers = en ? SERVICE_TIERS_EN : SERVICE_TIERS_VI;
  const stats = en ? STATS_EN : STATS_VI;

  return (
    <section className="grain luxury-section relative h-[100svh]">
      {/* Video background — !absolute/!z-0 overrides .grain > * { position: relative } from globals.css */}
      <div className="!absolute inset-0 overflow-hidden !z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/dark/hero-dark.jpg"
          className="w-full h-full object-cover object-top md:object-center"
          suppressHydrationWarning
        >
          <source src="/images/cases/video-background.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-ink/60" />
        {/* Vignette — darkens edges for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 200px 60px rgba(0,0,0,0.85)' }}
        />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-24">
        <EyebrowLabel index="I" tone="light" bullet>
          {en ? 'CUSTOM AI SOLUTIONS STUDIO' : 'STUDIO GIẢI PHÁP AI TÙY CHỈNH'}
        </EyebrowLabel>
        <p
          ref={headlineRef}
          className="text-display-1 font-serif luxury-heading text-center text-balance mt-8 max-w-5xl"
        >
          Build. Automate. Create.
        </p>
        <p className="text-body-lg text-paper/90 mt-6 max-w-xl text-center">
          {en
            ? 'AI solutions studio building custom software and media for Vietnamese businesses.'
            : 'Studio xây dựng giải pháp công nghệ và sản xuất media tùy chỉnh bằng AI — cho doanh nghiệp Việt Nam.'}
        </p>
        <div className="mt-8">
          <PillCTA href={en ? '/en/contact' : '/booking'} variant="dark">
            {en ? 'Book a consultation' : 'Đặt lịch tư vấn'}
          </PillCTA>
        </div>

        {/* Portal hint line */}
        <a
          href="https://hub.sabo.com.vn"
          target="_blank"
          rel="noopener"
          className="mt-5 font-mono text-eyebrow uppercase tracking-widest text-paper/80 hover:text-paper transition-colors"
        >
          {en ? 'SABO clients sign in here →' : 'Khách hàng SABO đăng nhập tại đây →'}
        </a>

        {/* Key stats row — desktop only */}
        <div className="hidden md:flex items-center gap-10 mt-10 border-t border-paper/10 pt-8 w-full max-w-2xl justify-center">
          {stats.map(({ num, label, icon: StatIcon }) => (
            <div key={label} className="text-center">
              <div className="text-h2 font-serif text-paper">{num}</div>
              <div className="mt-1 flex items-center justify-center gap-1.5 text-caption font-mono uppercase tracking-widest text-paper/80">
                <StatIcon size={12} className="text-paper/80" />
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Case studies CTA — inline dưới stats, desktop */}
        <div className="hidden md:flex mt-8">
          <PillCTA href={en ? '/en/case-studies' : '/case-studies'} variant="outline">
            {en ? 'Explore case studies' : 'Khám phá dự án'}
          </PillCTA>
        </div>
      </div>

      {/* Service tiers — giữa chiều dọc, góc trái, desktop only */}
      <div className="!absolute left-8 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <EyebrowLabel tone="light" className="mb-3">
          {en ? 'OUR CAPABILITIES' : 'NĂNG LỰC CỦA CHÚNG TÔI'}
        </EyebrowLabel>
        <div className="flex flex-col">
          {tiers.map((p) => {
            const TierIcon = p.icon;
            return (
              <a
                key={p.label}
                href={p.href}
                className="flex items-center gap-2 text-paper text-body-sm font-mono uppercase tracking-[0.16em] hover:opacity-100 opacity-90 transition-opacity py-1"
              >
                <TierIcon size={13} className="text-paper/70" />
                {p.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Hero;
