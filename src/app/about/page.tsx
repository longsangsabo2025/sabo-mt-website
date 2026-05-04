import type { Metadata } from 'next';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPostgresql, SiPython, SiNodedotjs, SiGooglegemini, SiAnthropic, SiLangchain } from '@icons-pack/react-simple-icons';
import { MapPin } from 'lucide-react';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { FinalCta } from '@/components/sections/FinalCta';
import { DIFFERENTIATORS } from '@/content/site';

export const metadata: Metadata = {
  title: 'Về chúng tôi — Custom AI Solutions Studio | SABO M&T',
  description: 'SABO Media & Technology — studio phần mềm tùy chỉnh và AI được thành lập tại TP.HCM năm 2026. Đội ngũ expert phần mềm, design, media, và AI.',
  keywords: ['custom AI solutions studio', 'phần mềm tùy chỉnh Vietnam', 'AI solutions', 'SABO M&T', 'Võ Long Sang', 'AI studio TP HCM'],
  openGraph: {
    title: 'Về chúng tôi — SABO M&T',
    description: 'Custom AI Solutions Studio xây dựng phần mềm và media cho doanh nghiệp',
    url: 'https://sabo.com.vn/about',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SABO M&T' }]
  },
  alternates: {
    canonical: 'https://sabo.com.vn/about',
    languages: { 'en': 'https://sabo.com.vn/en/about' }
  }
};

const TEAM = [
  { name: 'Võ Long Sang', role: 'Founder & CEO' },
];

export default function AboutPage() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Võ Long Sang',
    alternateName: 'Long Sang Vo',
    jobTitle: 'Founder & CEO',
    worksFor: {
      '@type': 'Organization',
      name: 'SABO Media & Technology',
      url: 'https://sabo.com.vn'
    },
    url: 'https://sabo.com.vn/about',
    knowsAbout: [
      'Custom Software Development',
      'AI Automation',
      'AI Media Production',
      'Business Technology Vietnam',
      'Flutter Mobile Development',
      'Supabase Backend',
      'AI Workflow Automation'
    ],
    sameAs: [
      'https://sabo.com.vn/about'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <section className="bg-ink text-paper pt-40 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">ABOUT — VỀ CHÚNG TÔI</EyebrowLabel>
          <h1 className="mt-12 text-display-1 font-serif text-paper text-balance leading-[0.95]">
            Phần mềm.
            <br />
            Media. AI.
            <br />
            Một studio.
          </h1>
          <p className="mt-10 font-mono text-sm uppercase tracking-[0.12em] text-paper/50 leading-relaxed">
            Một studio. Ba năng lực.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">Phần mềm tùy chỉnh</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">Tự động hoá AI</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">Sản xuất media AI</span>
          </div>
          <div className="mt-5 pt-4 border-t border-paper/10 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs text-paper/40 uppercase tracking-[0.12em]">Stack</span>
            <SiFlutter size={14} className="text-paper" title="Flutter" />
            <SiNextdotjs size={14} className="text-paper" title="Next.js" />
            <SiTypescript size={14} className="text-paper" title="TypeScript" />
            <SiSupabase size={14} className="text-paper" title="Supabase" />
            <SiPostgresql size={14} className="text-paper" title="PostgreSQL" />
            <SiPython size={14} className="text-paper" title="Python" />
            <SiNodedotjs size={14} className="text-paper" title="Node.js" />
            <SiLangchain size={14} className="text-paper" title="LangChain" />
            <SiGooglegemini size={14} className="text-paper" title="Gemini AI" />
            <SiAnthropic size={14} className="text-paper" title="Anthropic" />
          </div>
          <p className="mt-3 font-mono text-xs text-paper/30 tracking-[0.1em] uppercase">TP. Hồ Chí Minh · Việt Nam · Thành lập 2026</p>
        </div>
      </section>

      <section className="bg-ink text-paper border-y border-paper/10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-4">
            <EyebrowLabel tone="light" index="01">MANIFESTO</EyebrowLabel>
          </aside>
          <div className="md:col-span-8 space-y-6 max-w-prose text-body-lg text-paper/80 leading-relaxed font-mono">
            <p>
              Doanh nghiệp cần IT tìm công ty phần mềm. Cần content tìm agency truyền thông.
              Cần tự động hóa lại tìm tư vấn thứ ba. Ba đối tác — ba ngôn ngữ — và khoảng trống
              giữa các bên là nơi dự án thất bại.
            </p>
            <p>
              SABO Media &amp; Technology được thành lập tại TP. Hồ Chí Minh năm 2026 để xóa bỏ
              ranh giới đó. Chúng tôi là Custom AI Solutions Studio — xây dựng phần mềm tùy chỉnh
              và sản xuất media AI dưới một mái nhà. AI không phải buzzword — đây là cách
              chúng tôi vận hành.
            </p>
            <p>
              Mỗi giải pháp được thiết kế riêng, không phải template lắp ghép. Một đối tác
              chịu trách nhiệm từ ngày đầu đến khi sản phẩm vận hành ổn định trong tay
              đội ngũ của bạn.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics section — citable data points for AI engines */}
      <section className="bg-ink text-paper border-b border-paper/10 py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="border-l-2 border-paper/20 pl-6">
              <div className="text-5xl md:text-6xl font-serif text-paper">4+</div>
              <div className="mt-2 font-mono text-body-sm text-paper/60">Đự án đã triển khai</div>
              <div className="mt-1 font-mono text-caption text-paper/40">từ 2026 đến nay</div>
            </div>
            <div className="border-l-2 border-paper/20 pl-6">
              <div className="text-5xl md:text-6xl font-serif text-paper">3</div>
              <div className="mt-2 font-mono text-body-sm text-paper/60">Dịch vụ chính</div>
              <div className="mt-1 font-mono text-caption text-paper/40">Build, Automate, Create</div>
            </div>
            <div className="border-l-2 border-paper/20 pl-6">
              <div className="text-5xl md:text-6xl font-serif text-paper">50%</div>
              <div className="mt-2 font-mono text-body-sm text-paper/60">Giảm chi phí vận hành</div>
              <div className="mt-1 font-mono text-caption text-paper/40">với automation</div>
            </div>
            <div className="border-l-2 border-paper/20 pl-6">
              <div className="text-5xl md:text-6xl font-serif text-paper">8-16</div>
              <div className="mt-2 font-mono text-body-sm text-paper/60">Tuần delivery</div>
              <div className="mt-1 font-mono text-caption text-paper/40">phần mềm tùy chỉnh</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-b border-paper/10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light" index="02">GIÁ TRỊ CỐT LÕI</EyebrowLabel>
          <h2 className="mt-8 text-display-2 font-serif text-paper max-w-3xl leading-[1.0]">
            Năm điều chúng tôi không thoả hiệp.
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-paper/10 border border-paper/10">
            {DIFFERENTIATORS.map((d, i) => (
              <div key={d.title} className="bg-ink p-8 md:p-10">
                <span className="font-mono text-eyebrow text-paper/50 tracking-[0.16em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-h2 font-serif text-paper leading-tight">
                  {d.title}
                </h3>
                <p className="mt-4 font-mono text-body-md text-paper/65">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-b border-paper/10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light" index="03">ĐỘI NGŨ</EyebrowLabel>
          <h2 className="mt-8 text-display-2 font-serif text-paper max-w-3xl leading-[1.0]">
            Người đứng sau
            <br />
            công việc.
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-4">
              <div className="border-t border-paper/10 pt-6">
                <span className="font-mono text-eyebrow text-paper/50 tracking-[0.16em]">01</span>
                <div className="mt-6 aspect-[4/5] bg-paper/5 max-w-[200px]" />
                <div className="mt-5 text-h3 font-serif text-paper">Võ Long Sang</div>
                <div className="mt-1 font-mono text-eyebrow text-paper/60 tracking-[0.16em] uppercase">
                  Founder &amp; CEO
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-body-sm text-paper/50 font-mono">
                  <MapPin size={11} className="text-paper/40 shrink-0" />
                  TP. Hồ Chí Minh, Việt Nam
                </div>
              </div>
            </div>
            <div className="md:col-span-7 md:col-start-6 pb-6 space-y-4">
              <p className="font-mono text-body-lg text-paper/70 leading-relaxed">
                Chúng tôi vận hành theo mô hình <strong className="text-paper">AI-augmented</strong> — đội ngũ chuyên gia được
                nhân bội năng lực bởi hệ thống AI agents tùy chỉnh. Speed và scale của team
                lớn. Sự chú tâm và tính tùy chỉnh của boutique studio.
              </p>
              <p className="font-mono text-body-md text-paper/60 leading-relaxed">
                Võ Long Sang sáng lập SABO M&T với nền tảng kỹ thuật chuyên sâu trong
                phát triển mobile (Flutter), backend systems (Supabase, PostgreSQL),
                và AI automation workflows. Ông trực tiếp dẫn dắt các dự án từ
                discovery đến production handoff — không qua trung gian.
              </p>
              <p className="font-mono text-body-sm text-paper/50 leading-relaxed">
                Dự án tiêu biểu: <strong className="text-paper/70">SABOHUB</strong> (hệ thống quản lý doanh nghiệp đa ngành,
                Flutter + Supabase, 559 files, phục vụ các ngành F&B, phân phối, sản xuất),
                <strong className="text-paper/70"> VungTauLand</strong> (nền tảng bất động sản), 
                <strong className="text-paper/70"> AI Newbie VN</strong> (AI media production pipeline).
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
