import type { Metadata } from 'next';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPython, SiGooglegemini } from '@icons-pack/react-simple-icons';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';
import { FinalCta } from '@/components/sections/FinalCta';
import { CASE_STUDIES_EN } from '@/content/site.en';
import { getShowcaseImage } from '@/lib/showcase-images';

export const metadata: Metadata = {
  title: 'Case studies — Products we shipped | SABO M&T',
  description: 'Real-world AI and software projects by SABO M&T — SABO Arena, SaboHub, Vungtauland, AINewbieVN. See how we deliver measurable outcomes.',
  openGraph: {
    title: 'Case studies — SABO M&T',
    description: 'AI and software projects with measurable outcomes across Sports, Real Estate, Hospitality, and Community.',
    url: 'https://sabo.com.vn/en/case-studies',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SABO M&T Case Studies' }]
  },
  alternates: {
    canonical: 'https://sabo.com.vn/en/case-studies',
    languages: { 'vi': 'https://sabo.com.vn/case-studies' }
  }
};

export default function CaseStudiesEnPage() {
  return (
    <>
      <section className="bg-ink text-paper pt-40 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">CASE STUDIES — PORTFOLIO</EyebrowLabel>
          <h1 className="mt-8 text-display-1 font-serif text-paper text-balance max-w-5xl leading-[0.95]">
            Products
            <br />
            we shipped.
          </h1>
          <p className="mt-10 font-mono text-sm uppercase tracking-[0.12em] text-paper/50 leading-relaxed">
            Measurable outcomes, not slide decks.
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
          <p className="mt-3 font-mono text-xs text-paper/30 tracking-[0.1em] uppercase">4 Projects · 4 Industries · 2025–2026</p>
        </div>
      </section>

      <section className="bg-ink text-paper border-t border-paper/10 py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASE_STUDIES_EN.map((c) => (
              <CaseStudyCard
                key={c.slug}
                href={`/en/case-studies/${c.slug}`}
                image={getShowcaseImage(c.slug)}
                eyebrow={`${c.industry.toUpperCase()} · ${c.techCategory?.[0]?.toUpperCase() ?? ''}`}
                title={c.title}
              />
            ))}
          </div>
        </div>
      </section>

      <FinalCta locale="en" />
    </>
  );
}
