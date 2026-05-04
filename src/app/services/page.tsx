import type { Metadata } from 'next';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPostgresql, SiPython, SiNodedotjs, SiGooglegemini, SiFfmpeg, SiLangchain } from '@icons-pack/react-simple-icons';
import type { LucideIcon } from 'lucide-react';
import { Bot, Clapperboard, Code2 } from 'lucide-react';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { PillCTA } from '@/components/ui/PillCTA';
import { MarqueeBand } from '@/components/sections/MarqueeBand';
import { FinalCta } from '@/components/sections/FinalCta';
import { SERVICES } from '@/content/site';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  build: Code2,
  automate: Bot,
  create: Clapperboard,
};

export const metadata: Metadata = {
  title: 'Dịch vụ — Ba trụ cột, một kết quả | SABO M&T',
  description: 'Ba dịch vụ chính: Build (phần mềm tùy chỉnh), Automate (tự động hóa & AI agents), Create (sản xuất media AI). Giải pháp toàn diện cho doanh nghiệp.',
  keywords: ['custom software development Vietnam', 'tự động hóa quy trình doanh nghiệp', 'AI automation', 'sản xuất video AI', 'AI integration doanh nghiệp nhỏ'],
  openGraph: {
    title: 'Dịch vụ — Build. Automate. Create.',
    description: 'Phần mềm tùy chỉnh, tự động hóa AI, và sản xuất media cho doanh nghiệp',
    url: 'https://sabo.com.vn/services',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SABO M&T Services' }]
  },
  alternates: {
    canonical: 'https://sabo.com.vn/services',
    languages: { 'en': 'https://sabo.com.vn/en/services' }
  }
};

export default function ServicesPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'SABO M&T xây dựng phần mềm theo yêu cầu như thế nào?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SABO M&T theo quy trình 4 bước: (1) Discovery (1-2 tuần) — phân tích yêu cầu và thiết kế giải pháp, (2) Design (1-2 tuần) — UX/UI và kiến trúc hệ thống, (3) Build (4-12 tuần) — phát triển và test, (4) Deploy & Support — triển khai production và bảo trì. Mỗi dự án được assign 1 lead engineer và 1 AI automation specialist. Code ownership 100% — không vendor lock-in.'
        }
      },
      {
        '@type': 'Question',
        name: 'Tự động hóa AI giúp doanh nghiệp tiết kiệm chi phí như thế nào?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Workflow automation giảm tối thiểu 50% thao tác lặp lại thủ công. AI agents xử lý task 24/7 không nghỉ. Ví dụ: đồng bộ dữ liệu giữa CRM-kế toán tự động thay vì copy-paste, hoặc AI chatbot trả lời khách hàng thay nhân viên support. ROI đo lường được trong tháng đầu tiên.'
        }
      },
      {
        '@type': 'Question',
        name: 'Sản xuất video AI khác gì với quay phim truyền thống?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI media production sử dụng text-to-video, AI voiceover, và automated editing để giảm 80-90% chi phí và thời gian. Chi phí mỗi video rơi vào $0.01-0.05 thay vì $500-2000 cho quay phim truyền thống. Phù hợp cho content marketing với volume lớn (10-50 video/tháng).'
        }
      }
    ]
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="bg-ink text-paper pt-40 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">SERVICES — DỊCH VỤ</EyebrowLabel>
          <h1 className="mt-8 text-display-1 font-serif text-paper text-balance max-w-5xl leading-[0.95]">
            Ba trụ cột.
            <br />
            Một kết quả.
          </h1>
          <p className="mt-10 font-mono text-sm uppercase tracking-[0.12em] text-paper/50 max-w-2xl leading-relaxed">
            Chiến lược · triển khai · vận hành — một mối, không đứt đoạn.
          </p>
          <div className="mt-8 max-w-3xl flex flex-col gap-3">
            {/* BUILD */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper inline-flex items-center gap-1.5"><Code2 size={12} />XÂY DỰNG</span>
              <span className="font-mono text-xs text-paper/50 px-3 py-1.5 border border-paper/20">web app · mobile app · backend</span>
              <span className="font-mono text-xs text-paper/30 px-3 py-1.5 border border-paper/10">8–16 tuần</span>
            </div>
            {/* AUTOMATE */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper inline-flex items-center gap-1.5"><Bot size={12} />TỰ ĐỘNG HOÁ</span>
              <span className="font-mono text-xs text-paper/50 px-3 py-1.5 border border-paper/20">AI agents · tự động hoá quy trình</span>
              <span className="font-mono text-xs text-paper/30 px-3 py-1.5 border border-paper/10">2–6 tuần</span>
            </div>
            {/* CREATE */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper inline-flex items-center gap-1.5"><Clapperboard size={12} />SẢN XUẤT</span>
              <span className="font-mono text-xs text-paper/50 px-3 py-1.5 border border-paper/20">hình ảnh AI · video pipeline</span>
              <span className="font-mono text-xs text-paper/30 px-3 py-1.5 border border-paper/10">3–4 tuần</span>
            </div>
            {/* Tech stack icons */}
            <div className="mt-2 pt-3 border-t border-paper/10 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-xs text-paper/30 uppercase tracking-[0.12em]">Stack</span>
              <SiFlutter size={14} className="text-paper" title="Flutter" />
              <SiNextdotjs size={14} className="text-paper" title="Next.js" />
              <SiTypescript size={14} className="text-paper" title="TypeScript" />
              <SiSupabase size={14} className="text-paper" title="Supabase" />
              <SiPostgresql size={14} className="text-paper" title="PostgreSQL" />
              <SiPython size={14} className="text-paper" title="Python" />
              <SiNodedotjs size={14} className="text-paper" title="Node.js" />
              <SiLangchain size={14} className="text-paper" title="LangChain" />
              <SiGooglegemini size={14} className="text-paper" title="Gemini AI" />
              <SiFfmpeg size={14} className="text-paper" title="FFmpeg" />
            </div>
            <p className="mt-2 font-mono text-xs text-paper/30 tracking-[0.1em] uppercase">Doanh nghiệp vừa & nhỏ · TP. Hồ Chí Minh · Toàn quốc</p>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-t border-paper/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {SERVICES.map((service) => (
            (() => {
              const ServiceIcon = SERVICE_ICONS[service.slug] ?? Code2;
              return (
            <article
              key={service.slug}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 py-24 md:py-32 border-b border-paper/10"
            >
              <div className="md:col-span-2">
                <span className="font-mono text-eyebrow text-paper/50 tracking-[0.16em]">
                  {service.number}
                </span>
              </div>
              <div className="md:col-span-5">
                <EyebrowLabel tone="light">{service.eyebrow}</EyebrowLabel>
                <h2 className="mt-4 text-h1 font-serif text-paper leading-[1.0] inline-flex items-center gap-3">
                  <ServiceIcon size={24} className="text-paper/75" />
                  {service.title}
                </h2>
              </div>
              <div className="md:col-span-5 flex flex-col">
                <p className="font-mono text-body-lg text-paper/70 max-w-prose">
                  {service.description}
                </p>
                <div className="mt-10">
                  <PillCTA href={`/services/${service.slug}`} variant="outline">
                    Tìm hiểu
                  </PillCTA>
                </div>
              </div>
            </article>
              );
            })()
          ))}
        </div>
      </section>

      <MarqueeBand />
      <FinalCta />
    </>
  );
}
