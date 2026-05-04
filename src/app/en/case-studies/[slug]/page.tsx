import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPython, SiGooglegemini } from '@icons-pack/react-simple-icons';
import type { LucideIcon } from 'lucide-react';
import { ArrowLeft, ArrowRight, Building2, Clock3, Cpu, Layers3 } from 'lucide-react';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { CASE_STUDIES_EN } from '@/content/site.en';

export function generateStaticParams() {
  return CASE_STUDIES_EN.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CASE_STUDIES_EN.find((x) => x.slug === slug);
  if (!c) {
    return { title: 'Case study' };
  }
  return {
    title: `${c.title} — Case study | SABO M&T`,
    description: c.oneLiner || 'Real-world project by SABO M&T — Custom AI Solutions Studio in Ho Chi Minh City.',
    keywords: [c.industry, ...c.servicesUsed, ...c.techCategory, 'SABO M&T', 'case study'],
    openGraph: {
      title: c.title,
      description: c.oneLiner,
      url: `https://sabo.com.vn/en/case-studies/${c.slug}`,
      type: 'article',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: c.title }],
    },
    alternates: {
      canonical: `https://sabo.com.vn/en/case-studies/${c.slug}`,
      languages: { 'vi': `https://sabo.com.vn/case-studies/${c.slug}` },
    },
  };
}

export default async function CaseStudyEnDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = CASE_STUDIES_EN.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const c = CASE_STUDIES_EN[idx];
  const next = CASE_STUDIES_EN[(idx + 1) % CASE_STUDIES_EN.length];
  const prev = CASE_STUDIES_EN[(idx - 1 + CASE_STUDIES_EN.length) % CASE_STUDIES_EN.length];

  // Article schema for search engines and AI systems
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.oneLiner,
    author: {
      '@type': 'Organization',
      name: 'SABO Media & Technology'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SABO Media & Technology',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sabo.com.vn/logo.svg',
        width: 200,
        height: 50
      }
    },
    datePublished: new Date().toISOString().split('T')[0],
    keywords: [c.industry, ...c.servicesUsed, ...c.techCategory],
  };

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
        name: 'Case Studies',
        item: 'https://sabo.com.vn/en/case-studies'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: c.title,
        item: `https://sabo.com.vn/en/case-studies/${c.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="bg-ink text-paper pt-40 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">{c.industry.toUpperCase()}</EyebrowLabel>
          <h1 className="mt-8 text-display-1 font-serif text-paper text-balance max-w-5xl leading-[0.95]">
            {c.title}
          </h1>
          <p className="mt-10 text-body-lg text-paper/70 max-w-2xl">{c.oneLiner}</p>
          <div className="mt-8 pt-4 border-t border-paper/10 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs text-paper/40 uppercase tracking-[0.12em]">Stack</span>
            <SiFlutter size={14} className="text-paper" title="Flutter" />
            <SiNextdotjs size={14} className="text-paper" title="Next.js" />
            <SiTypescript size={14} className="text-paper" title="TypeScript" />
            <SiSupabase size={14} className="text-paper" title="Supabase" />
            <SiPython size={14} className="text-paper" title="Python" />
            <SiGooglegemini size={14} className="text-paper" title="Gemini AI" />
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-t border-paper/10 py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Glance label="Industry" value={c.industry} icon={Building2} />
          <Glance label="Timeline" value={c.timeline} icon={Clock3} />
          <Glance label="Services" value={c.servicesUsed.join(' · ')} icon={Layers3} />
          <Glance label="Tech" value={c.techCategory.join(' · ')} icon={Cpu} />
        </div>
      </section>

      <section className="bg-ink text-paper border-t border-paper/10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-4">
            <EyebrowLabel tone="light">THE CHALLENGE</EyebrowLabel>
          </aside>
          <div className="md:col-span-8 max-w-prose">
            <h2 className="text-display-2 font-serif text-paper leading-[1.0]">Business context</h2>
            <p className="mt-8 text-body-lg text-paper/70 leading-relaxed">{c.challenge}</p>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-t border-paper/10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-4">
            <EyebrowLabel tone="light">THE SOLUTION</EyebrowLabel>
          </aside>
          <div className="md:col-span-8 max-w-prose">
            <h2 className="text-display-2 font-serif text-paper leading-[1.0]">End-to-end approach</h2>
            <p className="mt-8 text-body-lg text-paper/70 leading-relaxed">{c.solution}</p>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-t border-paper/10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">THE IMPACT</EyebrowLabel>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-paper/10 border border-paper/10">
            {c.impact.map((m) => (
              <div key={m.label} className="bg-ink p-8 md:p-10">
                <div className="text-display-2 font-serif text-paper leading-none">{m.value}</div>
                <div className="mt-4 font-mono text-eyebrow text-paper/60 tracking-[0.16em] uppercase">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-t border-paper/10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="max-w-2xl">
            <EyebrowLabel tone="light">SIMILAR PROJECT?</EyebrowLabel>
            <h2 className="mt-6 text-display-2 font-serif text-paper leading-[1.0]">
              Have a project<br />like this?
            </h2>
            <p className="mt-6 text-body-lg text-paper/60 max-w-lg">
              Talk directly with the founder. 30 minutes to define scope, timeline,
              and budget — no commitment required.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href={`/booking?ref=case-study-${c.slug}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-paper text-ink font-mono text-eyebrow tracking-[0.16em] uppercase hover:bg-paper/90 transition-colors"
            >
              Book a call
            </a>
            <a
              href="/en/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-paper/30 text-paper font-mono text-eyebrow tracking-[0.16em] uppercase hover:border-paper/70 transition-colors"
            >
              Send a brief
            </a>
          </div>
        </div>
      </section>

      <nav className="bg-ink border-t border-paper/10 py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href={"/en/case-studies/" + prev.slug} className="group border-t border-paper/10 pt-6">
            <div className="font-mono text-eyebrow text-paper/50 tracking-[0.16em] inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> PREVIOUS
            </div>
            <div className="mt-3 text-h3 font-serif text-paper group-hover:text-paper/70 transition">{prev.title}</div>
          </Link>
          <Link href={"/en/case-studies/" + next.slug} className="group border-t border-paper/10 pt-6 md:text-right">
            <div className="font-mono text-eyebrow text-paper/50 tracking-[0.16em] inline-flex items-center gap-2">
              NEXT <ArrowRight className="w-4 h-4" />
            </div>
            <div className="mt-3 text-h3 font-serif text-paper group-hover:text-paper/70 transition">{next.title}</div>
          </Link>
        </div>
      </nav>
    </>
  );
}

function Glance({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <div className="border-t border-paper/10 pt-6">
      <div className="inline-flex items-center gap-2 font-mono text-eyebrow text-paper/50 tracking-[0.16em] uppercase">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
        {label}
      </div>
      <div className="mt-3 text-h3 font-serif text-paper">{value}</div>
    </div>
  );
}