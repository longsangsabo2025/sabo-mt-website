import type { Metadata } from 'next';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPostgresql, SiPython, SiNodedotjs, SiGooglegemini } from '@icons-pack/react-simple-icons';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { FinalCta } from '@/components/sections/FinalCta';
import { INDUSTRIES } from '@/content/site';
import { viIndustryLabel } from '@/lib/vi-l10n';

export const metadata: Metadata = {
  title: 'Lĩnh vực — Hiểu nghiệp vụ trước khi viết code | SABO M&T',
  description: 'SABO phục vụ các lĩnh vực: Thể thao & giải trí, dịch vụ vận hành, bất động sản, cộng đồng/AI. Hiểu sâu quy trình ngành để xây dựng giải pháp đúng nhu cầu.',
  keywords: ['phần mềm thể thao giải trí', 'phần mềm bất động sản', 'phần mềm dịch vụ vận hành', 'nền tảng cộng đồng AI'],
  openGraph: {
    title: 'Lĩnh vực — SABO M&T',
    description: 'Kinh nghiệm triển khai đa ngành: thể thao & giải trí, dịch vụ vận hành, bất động sản, cộng đồng/AI.',
    url: 'https://sabo.com.vn/industries',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SABO M&T Industries' }]
  },
  alternates: {
    canonical: 'https://sabo.com.vn/industries',
    languages: { 'en': 'https://sabo.com.vn/en/industries' }
  }
};

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export default function IndustriesPage() {
  const items = INDUSTRIES;

  return (
    <>
      <section className="bg-ink text-paper pt-40 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">INDUSTRIES — LĨNH VỰC</EyebrowLabel>
          <h1 className="mt-8 text-display-1 font-serif text-paper text-balance max-w-5xl leading-[0.95]">
            Hiểu nghiệp vụ
            <br />
            trước khi viết
            <br />
            dòng code đầu tiên.
          </h1>
          <p className="mt-10 font-mono text-sm uppercase tracking-[0.12em] text-paper/50 max-w-2xl leading-relaxed">
            Domain expertise trước — technology sau.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Thể thao & Giải trí', 'Bất động sản', 'Hospitality & Dịch vụ', 'Giáo dục'].map((label) => (
              <span key={label} className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/40 text-paper/70">{label}</span>
            ))}
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/15 text-paper/25">Bán lẻ</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/15 text-paper/25">Tài chính</span>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-y border-paper/10 py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-4">
            <EyebrowLabel tone="light">PHƯƠNG PHÁP TIẾP CẬN</EyebrowLabel>
          </aside>
          <div className="md:col-span-7 space-y-4">
            <p className="font-mono text-sm text-paper/70 leading-relaxed tracking-wide">
              Không nhận mọi dự án từ mọi ngành. Mỗi lĩnh vực phục vụ đều có case study thực tế, quy trình kiểm chứng và đội ngũ đã đi qua hàng trăm giờ nghiệp vụ trong ngành đó.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">KHÁM PHÁ</span>
                <span className="font-mono text-xs text-paper/50 px-3 py-1.5 border border-paper/20">quy trình vận hành · điểm đau · KPI đo được</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">XÂY DỰNG</span>
                <span className="font-mono text-xs text-paper/50 px-3 py-1.5 border border-paper/20">đặc thù ngành · quy trình kiểm chứng · case study thực tế</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">ĐO LƯỜNG</span>
                <span className="font-mono text-xs text-paper/50 px-3 py-1.5 border border-paper/20">theo dõi KPI · cải tiến liên tục · vận hành dài hạn</span>
              </div>
              <div className="mt-3 pt-3 border-t border-paper/10 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-mono text-xs text-paper/40 uppercase tracking-[0.12em]">Stack</span>
                <SiFlutter size={14} className="text-paper" title="Flutter" />
                <SiNextdotjs size={14} className="text-paper" title="Next.js" />
                <SiTypescript size={14} className="text-paper" title="TypeScript" />
                <SiSupabase size={14} className="text-paper" title="Supabase" />
                <SiPostgresql size={14} className="text-paper" title="PostgreSQL" />
                <SiPython size={14} className="text-paper" title="Python" />
                <SiNodedotjs size={14} className="text-paper" title="Node.js" />
                <SiGooglegemini size={14} className="text-paper" title="Gemini AI" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-t border-paper/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {items.map((ind, i) => (
            <article
              key={ind.slug}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 min-h-[40vh] py-20 md:py-28 border-b border-paper/10 items-center ${!ind.active ? 'opacity-40' : ''}`}
            >
              <div className="md:col-span-2">
                <span className="font-mono text-eyebrow text-paper/50 tracking-[0.16em]">
                  {ROMAN[i]}
                </span>
              </div>
              <div className="md:col-span-6">
                <h2 className="text-display-2 font-serif text-paper leading-[0.95]">
                  {viIndustryLabel(ind.label)}.
                </h2>
                {!ind.active && (
                  <span className="inline-block mt-4 font-mono text-caption text-paper/40 uppercase tracking-[0.14em] border border-paper/20 px-3 py-1">
                    Đang mở rộng
                  </span>
                )}
              </div>
              <div className="md:col-span-4">
                <p className="font-mono text-sm text-paper/60 leading-relaxed tracking-wide">{ind.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
