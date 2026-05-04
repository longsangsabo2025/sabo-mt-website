import type { Metadata } from 'next';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPython, SiGooglegemini } from '@icons-pack/react-simple-icons';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { FinalCta } from '@/components/sections/FinalCta';
import { CaseStudiesGrid } from '@/components/ui/CaseStudiesGrid';
import { getShowcases } from '@/lib/showcase';
import { getShowcaseImage } from '@/lib/showcase-images';
import { viCategoryLabel, viFilterLabel, viIndustryLabel } from '@/lib/vi-l10n';

export const metadata: Metadata = {
  title: 'Case studies — Sản phẩm chúng tôi đã xây | SABO M&T',
  description: 'Danh sách 4 case study: SABO Arena, SABO Hub, VungTau Land, AI Newbie VN — phần mềm tùy chỉnh, AI automation, sản xuất video cho doanh nghiệp.',
  keywords: ['case studies Vietnam', 'phần mềm tùy chỉnh success stories', 'AI solutions case studies'],
  openGraph: {
    title: 'Case studies — SABO M&T',
    description: 'Các dự án chúng tôi đã hoàn thành: SABO Arena, SABO Hub, VungTau Land, AI Newbie VN',
    url: 'https://sabo.com.vn/case-studies',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SABO M&T Case Studies' }]
  },
  alternates: {
    canonical: 'https://sabo.com.vn/case-studies',
    languages: { 'en': 'https://sabo.com.vn/en/case-studies' }
  }
};

export default async function CaseStudiesPage() {
  const showcases = await getShowcases();
  const filterKeys = ['ALL', ...Array.from(new Set(showcases.map((s) => s.industry.toUpperCase())))];
  const filters = filterKeys.map((key) => ({
    key,
    label: viFilterLabel(key).toUpperCase(),
  }));

  const items = showcases.map((c) => ({
    slug: c.slug,
    name: c.name,
    industryKey: c.industry.toUpperCase(),
    category: c.category,
    image: getShowcaseImage(c.slug),
    href: `/case-studies/${c.slug}`,
    eyebrow: `${viIndustryLabel(c.industry).toUpperCase()} · ${viCategoryLabel(c.category).toUpperCase()}`,
  }));

  return (
    <>
      <section className="bg-ink text-paper pt-40 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">CASE STUDIES — DỰ ÁN</EyebrowLabel>
          <h1 className="mt-8 text-display-1 font-serif text-paper text-balance max-w-5xl leading-[0.95]">
            Sản phẩm chúng tôi
            <br />
            đã xây.
          </h1>
          <p className="mt-10 font-mono text-sm uppercase tracking-[0.12em] text-paper/50 leading-relaxed">
            Kết quả đo được, không phải slide deck.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">SABO Arena</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">SABO Hub</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">VungTau Land</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">AI Newbie VN</span>
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
          <p className="mt-3 font-mono text-xs text-paper/30 tracking-[0.1em] uppercase">4 Dự án · 4 Ngành · 2025–2026</p>
        </div>
      </section>

      <section className="bg-ink text-paper border-t border-paper/10 py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <CaseStudiesGrid items={items} filters={filters} />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
