import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPostgresql, SiPython, SiNodedotjs, SiGooglegemini, SiFfmpeg, SiLangchain, SiAnthropic } from '@icons-pack/react-simple-icons';
import { Check } from 'lucide-react';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { PillCTA } from '@/components/ui/PillCTA';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';
import { SERVICES_EN, CASE_STUDIES_EN } from '@/content/site.en';
import { getShowcaseImage } from '@/lib/showcase-images';

export function generateStaticParams() {
  return SERVICES_EN.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES_EN.find((x) => x.slug === slug);
  if (!s) {
    return { title: 'Services' };
  }
  return {
    title: `${s.title} — Service | SABO M&T`,
    description: s.description || 'Custom AI Solutions Studio — building custom software, AI automation, and media production for Vietnamese businesses.',
    keywords: [s.eyebrow, s.title, 'SABO M&T', 'custom software', 'AI automation', 'media production'],
    openGraph: {
      title: s.title,
      description: s.description,
      url: `https://sabo.com.vn/en/services/${s.slug}`,
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: s.title }],
    },
    alternates: {
      canonical: `https://sabo.com.vn/en/services/${s.slug}`,
      languages: { 'vi': `https://sabo.com.vn/services/${s.slug}` },
    },
  };
}

export default async function ServiceEnDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES_EN.find((x) => x.slug === slug);
  if (!s) notFound();
  const related = CASE_STUDIES_EN.filter((c) => c.servicesUsed.includes(s.title)).slice(0, 2);

  // BreadcrumbList schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://sabo.com.vn/en'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://sabo.com.vn/en/services'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: s.title,
        item: `https://sabo.com.vn/en/services/${s.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="bg-ink text-paper pt-40 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">{s.eyebrow}</EyebrowLabel>
          <div className="mt-4 font-mono text-eyebrow text-paper/40 tracking-[0.16em]">{s.number}</div>
          <h1 className="mt-4 text-display-1 font-serif text-paper leading-[0.95]">{s.title}</h1>
          <p className="mt-8 text-body-lg text-paper/70 max-w-2xl">{s.description}</p>
          <div className="mt-6 pt-4 border-t border-paper/10 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs text-paper/40 uppercase tracking-[0.12em]">Stack</span>
            {s.slug === 'build' ? (
              <>
                <SiFlutter size={14} className="text-paper" title="Flutter" />
                <SiNextdotjs size={14} className="text-paper" title="Next.js" />
                <SiTypescript size={14} className="text-paper" title="TypeScript" />
                <SiSupabase size={14} className="text-paper" title="Supabase" />
                <SiPostgresql size={14} className="text-paper" title="PostgreSQL" />
                <SiNodedotjs size={14} className="text-paper" title="Node.js" />
              </>
            ) : s.slug === 'automate' ? (
              <>
                <SiPython size={14} className="text-paper" title="Python" />
                <SiNodedotjs size={14} className="text-paper" title="Node.js" />
                <SiLangchain size={14} className="text-paper" title="LangChain" />
                <SiGooglegemini size={14} className="text-paper" title="Gemini AI" />
              </>
            ) : (
              <>
                <SiFfmpeg size={14} className="text-paper" title="FFmpeg" />
                <SiPython size={14} className="text-paper" title="Python" />
                <SiGooglegemini size={14} className="text-paper" title="Gemini AI" />
                <SiAnthropic size={14} className="text-paper" title="Anthropic" />
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-t border-paper/10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">SCENARIOS</EyebrowLabel>
          <h2 className="mt-8 text-display-2 font-serif text-paper max-w-3xl leading-[1.0]">When you need this service</h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-paper/10 border border-paper/10">
            {s.scenarios.map((sc) => (
              <div key={sc.label} className="bg-ink p-8 md:p-10">
                <h3 className="text-h2 font-serif text-paper leading-tight">{sc.label}</h3>
                <p className="mt-4 text-body-md text-paper/65">{sc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-t border-paper/10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <EyebrowLabel tone="light">OUTCOMES</EyebrowLabel>
            <h2 className="mt-8 text-display-2 font-serif text-paper leading-[1.0]">What you get</h2>
            <p className="mt-6 text-body-lg text-paper/70 max-w-prose">
              Every engagement has clear deliverables and measurable KPIs.
            </p>
          </div>
          <div className="md:col-span-7">
            <ul className="space-y-0">
              {s.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-5 py-6 border-b border-paper/10">
                  <span className="mt-1 w-6 h-6 rounded-full border border-paper/20 grid place-items-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-paper" strokeWidth={2} />
                  </span>
                  <span className="text-body-lg text-paper/80">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ink text-paper border-t border-paper/10 py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <EyebrowLabel tone="light">RELATED WORK</EyebrowLabel>
            <h2 className="mt-8 text-display-2 font-serif text-paper leading-[1.0]">Done in the real world</h2>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((c) => (
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
      )}

      <section className="bg-ink text-paper border-t border-paper/10 py-24 md:py-32 text-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">GET STARTED</EyebrowLabel>
          <h2 className="mt-8 text-display-2 font-serif text-paper max-w-2xl mx-auto leading-[1.0]">
            Request a quote for {s.title}
          </h2>
          <p className="mt-6 text-body-lg text-paper/60">Reply within 24 business hours.</p>
          <div className="mt-10">
            <PillCTA href={`/en/contact?service=${s.slug}`} variant="light" size="md">
              Request a quote
            </PillCTA>
          </div>
        </div>
      </section>
    </>
  );
}