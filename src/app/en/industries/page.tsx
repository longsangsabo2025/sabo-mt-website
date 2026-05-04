import type { Metadata } from 'next';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPostgresql, SiPython, SiNodedotjs, SiGooglegemini } from '@icons-pack/react-simple-icons';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { FinalCta } from '@/components/sections/FinalCta';
import { INDUSTRIES_EN } from '@/content/site.en';

export const metadata: Metadata = {
  title: 'Industries — Deep domain expertise | SABO M&T',
  description: 'SABO M&T serves Sports & Entertainment, Real Estate, Hospitality, Education, and Retail — with real case studies and proven processes in each vertical.',
  openGraph: {
    title: 'Industries — SABO M&T',
    description: 'Deep domain expertise across Sports, Real Estate, Hospitality, Education, and Retail.',
    url: 'https://sabo.com.vn/en/industries',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SABO M&T Industries' }]
  },
  alternates: {
    canonical: 'https://sabo.com.vn/en/industries',
    languages: { 'vi': 'https://sabo.com.vn/industries' }
  }
};

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export default function IndustriesEnPage() {
  const items = INDUSTRIES_EN.filter((i) => i.active);

  return (
    <>
      <section className="bg-ink text-paper pt-40 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">INDUSTRIES — EXPERTISE</EyebrowLabel>
          <h1 className="mt-8 text-display-1 font-serif text-paper text-balance max-w-5xl leading-[0.95]">
            Understand the
            <br />
            business before
            <br />
            writing the first
            <br />
            line of code.
          </h1>
          <p className="mt-10 font-mono text-sm uppercase tracking-[0.12em] text-paper/50 max-w-2xl leading-relaxed">
            Domain expertise first — technology second.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Sports & Entertainment', 'Real Estate', 'Hospitality', 'Education'].map((label) => (
              <span key={label} className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/40 text-paper/70">{label}</span>
            ))}
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/15 text-paper/25">Retail</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/15 text-paper/25">Finance</span>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-y border-paper/10 py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-4">
            <EyebrowLabel tone="light">OUR APPROACH</EyebrowLabel>
          </aside>
          <div className="md:col-span-7 space-y-4">
            <p className="font-mono text-sm text-paper/70 leading-relaxed tracking-wide">
              We don&apos;t take every project from every industry. Each vertical has real case studies, a proven process, and a team that has logged hundreds of hours of domain context inside it.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">DISCOVERY</span>
                <span className="font-mono text-xs text-paper/50 px-3 py-1.5 border border-paper/20">workflow mapping · pain points · KPI</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">BUILD</span>
                <span className="font-mono text-xs text-paper/50 px-3 py-1.5 border border-paper/20">domain-specific · proven process · real case studies</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">MEASURE</span>
                <span className="font-mono text-xs text-paper/50 px-3 py-1.5 border border-paper/20">KPI tracking · iteration · long-term ops</span>
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
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 min-h-[60vh] py-24 md:py-32 border-b border-paper/10 items-center"
            >
              <div className="md:col-span-2">
                <span className="font-mono text-eyebrow text-paper/50 tracking-[0.16em]">
                  {ROMAN[i]}
                </span>
              </div>
              <div className="md:col-span-6">
                <h2 className="text-display-2 font-serif text-paper leading-[0.95]">
                  {ind.label}.
                </h2>
              </div>
              <div className="md:col-span-4">
                <p className="font-mono text-sm text-paper/60 leading-relaxed tracking-wide">{ind.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FinalCta locale="en" />
    </>
  );
}
