import type { Metadata } from 'next';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPostgresql, SiPython, SiNodedotjs, SiGooglegemini, SiAnthropic, SiLangchain } from '@icons-pack/react-simple-icons';
import { MapPin } from 'lucide-react';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { FinalCta } from '@/components/sections/FinalCta';
import { DIFFERENTIATORS_EN, METRICS_EN } from '@/content/site.en';

export const metadata: Metadata = {
  title: 'About — Custom AI Solutions Studio | SABO M&T',
  description: 'SABO Media & Technology — Custom AI Solutions Studio founded in Ho Chi Minh City 2026. One accountable partner for software, automation, and AI media.',
  keywords: ['SABO M&T', 'Custom AI Solutions Studio', 'Vo Long Sang', 'custom software Vietnam', 'AI studio Ho Chi Minh City', 'AI automation Vietnam'],
  openGraph: {
    title: 'About — SABO M&T',
    description: 'Custom AI Solutions Studio. Software, automation, and AI media under one roof.',
    url: 'https://sabo.com.vn/en/about',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SABO M&T' }]
  },
  alternates: {
    canonical: 'https://sabo.com.vn/en/about',
    languages: { 'vi': 'https://sabo.com.vn/about' }
  }
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vo Long Sang',
  alternateName: 'Võ Long Sang',
  jobTitle: 'Founder & CEO',
  worksFor: {
    '@type': 'Organization',
    name: 'SABO Media & Technology',
    url: 'https://sabo.com.vn',
  },
  url: 'https://sabo.com.vn/en/about',
  knowsAbout: [
    'Custom Software Development',
    'AI Automation',
    'AI Media Production',
    'Business Technology Vietnam',
    'Flutter Mobile Development',
    'Supabase Backend',
    'AI Workflow Automation',
  ],
  sameAs: ['https://sabo.com.vn/about'],
};

export default function AboutEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <section className="bg-ink text-paper pt-40 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">ABOUT — WHO WE ARE</EyebrowLabel>
          <h1 className="mt-12 text-display-1 font-serif text-paper text-balance leading-[0.95]">
            Software.
            <br />
            Media. AI.
            <br />
            One studio.
          </h1>
          <p className="mt-10 font-mono text-sm uppercase tracking-[0.12em] text-paper/50 leading-relaxed">
            One studio. Three capabilities.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">Custom Software</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">AI Automation</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper">AI Media</span>
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
          <p className="mt-3 font-mono text-xs text-paper/30 tracking-[0.1em] uppercase">Ho Chi Minh City · Vietnam · Est. 2026</p>
        </div>
      </section>

      <section className="bg-ink text-paper border-y border-paper/10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-4">
            <EyebrowLabel tone="light" index="01">MANIFESTO</EyebrowLabel>
          </aside>
          <div className="md:col-span-8 space-y-6 max-w-prose text-body-lg text-paper/80 leading-relaxed font-mono">
            <p>
              Companies that need IT find a software vendor. Need content? They look for a media
              agency. Need automation? They engage a third consultancy. Three partners — three
              languages — and the gaps between them are where projects fail.
            </p>
            <p>
              SABO Media &amp; Technology was founded in Ho Chi Minh City in 2026 to erase that
              boundary. We are a Custom AI Solutions Studio — building tailored software and
              producing AI-driven media under one roof. AI isn&apos;t a buzzword for us; it&apos;s how
              we operate.
            </p>
            <p>
              Every solution is designed bespoke, not assembled from templates. One accountable
              partner, from day zero through stable operations in the hands of your team.
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
              <div className="mt-2 font-mono text-body-sm text-paper/60">Projects delivered</div>
              <div className="mt-1 font-mono text-caption text-paper/40">since 2026</div>
            </div>
            <div className="border-l-2 border-paper/20 pl-6">
              <div className="text-5xl md:text-6xl font-serif text-paper">3</div>
              <div className="mt-2 font-mono text-body-sm text-paper/60">Core services</div>
              <div className="mt-1 font-mono text-caption text-paper/40">Build, Automate, Create</div>
            </div>
            <div className="border-l-2 border-paper/20 pl-6">
              <div className="text-5xl md:text-6xl font-serif text-paper">50%</div>
              <div className="mt-2 font-mono text-body-sm text-paper/60">Operating cost cut</div>
              <div className="mt-1 font-mono text-caption text-paper/40">with automation</div>
            </div>
            <div className="border-l-2 border-paper/20 pl-6">
              <div className="text-5xl md:text-6xl font-serif text-paper">8-16</div>
              <div className="mt-2 font-mono text-body-sm text-paper/60">Weeks to delivery</div>
              <div className="mt-1 font-mono text-caption text-paper/40">custom software</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-b border-paper/10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light" index="02">BY THE NUMBERS</EyebrowLabel>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-paper/10 border border-paper/10">
            {METRICS_EN.map((m) => (
              <div key={m.label} className="bg-ink p-8 md:p-10">
                <div className="text-display-2 font-serif text-paper leading-none">{m.value}</div>
                <div className="mt-4 font-mono text-eyebrow text-paper/60 tracking-[0.16em] uppercase">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-b border-paper/10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light" index="03">CORE VALUES</EyebrowLabel>
          <h2 className="mt-8 text-display-2 font-serif text-paper max-w-3xl leading-[1.0]">
            Five things we never compromise on.
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-paper/10 border border-paper/10">
            {DIFFERENTIATORS_EN.map((d, i) => (
              <div key={d.title} className="bg-ink p-8 md:p-10">
                <div className="font-mono text-eyebrow text-paper/40 tracking-[0.16em]">0{i + 1}</div>
                <div className="mt-6 text-h3 font-serif text-paper">{d.title}</div>
                <p className="mt-4 font-mono text-body-sm text-paper/60 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-b border-paper/10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light" index="04">TEAM</EyebrowLabel>
          <h2 className="mt-8 text-display-2 font-serif text-paper max-w-3xl leading-[1.0]">
            The people behind
            <br />
            the work.
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-4">
              <div className="border-t border-paper/10 pt-6">
                <span className="font-mono text-eyebrow text-paper/50 tracking-[0.16em]">01</span>
                <div className="mt-6 aspect-[4/5] bg-paper/5 max-w-[200px]" />
                <div className="mt-5 text-h3 font-serif text-paper">Vo Long Sang</div>
                <div className="mt-1 font-mono text-eyebrow text-paper/60 tracking-[0.16em] uppercase">
                  Founder &amp; CEO
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-body-sm text-paper/50 font-mono">
                  <MapPin size={11} className="text-paper/40 shrink-0" />
                  Ho Chi Minh City, Vietnam
                </div>
              </div>
            </div>
            <div className="md:col-span-7 md:col-start-6 pb-6 space-y-4">
              <p className="font-mono text-body-lg text-paper/70 leading-relaxed">
                We operate as an <strong className="text-paper">AI-augmented</strong> studio — a small team of specialists
                multiplied by custom AI agents. The speed and scale of a large team.
                The focus and tailoring of a boutique.
              </p>
              <p className="font-mono text-body-md text-paper/60 leading-relaxed">
                Vo Long Sang founded SABO M&amp;T with deep technical expertise in
                mobile development (Flutter), backend systems (Supabase, PostgreSQL),
                and AI automation workflows. He leads every project directly from
                discovery to production handoff — no middlemen.
              </p>
              <p className="font-mono text-body-sm text-paper/50 leading-relaxed">
                Notable projects: <strong className="text-paper/70">SABOHUB</strong> (multi-industry business management system,
                Flutter + Supabase, serving F&amp;B, distribution, and manufacturing),
                <strong className="text-paper/70"> VungTauLand</strong> (real estate platform),
                <strong className="text-paper/70"> AI Newbie VN</strong> (AI media production pipeline).
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCta locale="en" />
    </>
  );
}
