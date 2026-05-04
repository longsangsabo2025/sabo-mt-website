import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { IndustriesBand } from '@/components/sections/IndustriesBand';
import { PillarsIntro } from '@/components/sections/PillarsIntro';
import { WhySabo } from '@/components/sections/WhySabo';
import { CasesRow } from '@/components/sections/CasesRow';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { LogoStrip } from '@/components/sections/LogoStrip';
import { MarqueeBand } from '@/components/sections/MarqueeBand';
import { FinalCta } from '@/components/sections/FinalCta';

export const metadata: Metadata = {
  title: 'SABO M&T — Build. Automate. Create.',
  description: 'Custom AI Solutions Studio in Ho Chi Minh City. We build custom software, automate business processes with AI agents, and produce AI-driven media — under one roof.',
  keywords: ['custom software development Vietnam', 'AI workflow automation', 'AI media production', 'Custom AI Solutions Studio', 'SABO M&T'],
  openGraph: {
    title: 'SABO M&T — Build. Automate. Create.',
    description: 'Custom AI Solutions Studio — software, automation, and AI media for businesses in Vietnam.',
    url: 'https://sabo.com.vn/en',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SABO M&T' }],
  },
  alternates: {
    canonical: 'https://sabo.com.vn/en',
    languages: { 'vi': 'https://sabo.com.vn' },
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is SABO M&T?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SABO Media & Technology is a Custom AI Solutions Studio founded in 2026, based in Ho Chi Minh City, Vietnam. We build custom software (web apps, mobile apps, backend systems), automate business processes with AI agents and workflow tools, and produce images and videos with AI pipelines. Three services under one studio: Build, Automate, Create.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does custom software development take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Custom software development typically takes 8–16 weeks from discovery to production launch. Automation setup takes 2–6 weeks. AI media production pipelines take 3–4 weeks. Timelines depend on scope — we provide a detailed estimate after a free 30-minute consultation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What industries does SABO M&T serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SABO M&T serves small and medium businesses in Vietnam across: F&B (restaurants, cafes, billiards clubs), distribution and manufacturing, real estate, education, and digital media. We are especially experienced in multi-location management systems and AI-driven content production.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a custom software project cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pricing varies by scope and complexity. We offer a free consultation to define requirements and provide a transparent estimate. Contact us at contact@sabo.com.vn or book a call at sabo.com.vn/booking. No commitment required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do clients own the source code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Full source code ownership is included in every project — no vendor lock-in, no recurring SaaS fees for the software itself. Clients receive all code repositories, documentation, and deployment instructions.',
      },
    },
  ],
};

export default function HomeEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero locale="en" />
      {/* Answer block for AI engines — citable, direct answer */}
      <section className="bg-ink text-paper border-t border-paper/10 py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto p-8 border border-paper/10 rounded-lg">
            <h2 className="text-h3 font-serif text-paper mb-4">What is SABO M&T?</h2>
            <p className="font-mono text-body-lg text-paper/90 leading-relaxed mb-4">
              <strong>SABO Media & Technology</strong> is a Custom AI Solutions Studio based in Ho Chi Minh City, founded in 2026. We build custom software (web apps, mobile apps, backend systems), automate business processes with AI agents, and produce images + videos with AI pipelines — three services under one studio.
            </p>
            <p className="font-mono text-body-md text-paper/70 leading-relaxed">
              Average timeline: custom software 8-16 weeks, automation setup 2-6 weeks, AI media pipeline 3-4 weeks. Serving SMEs in Vietnam. 100% code ownership — no vendor lock-in.
            </p>
          </div>
        </div>
      </section>
      <IndustriesBand locale="en" />
      <PillarsIntro locale="en" />
      <WhySabo locale="en" />
      <CasesRow locale="en" />
      <TrustStrip locale="en" />
      <LogoStrip locale="en" />
      <MarqueeBand locale="en" />
      <FinalCta locale="en" />
    </>
  );
}
