import type { Metadata } from 'next';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPostgresql, SiPython, SiNodedotjs, SiGooglegemini, SiFfmpeg, SiLangchain } from '@icons-pack/react-simple-icons';
import type { LucideIcon } from 'lucide-react';
import { Bot, Clapperboard, Code2 } from 'lucide-react';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { PillCTA } from '@/components/ui/PillCTA';
import { MarqueeBand } from '@/components/sections/MarqueeBand';
import { FinalCta } from '@/components/sections/FinalCta';
import { SERVICES_EN } from '@/content/site.en';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  build: Code2,
  automate: Bot,
  create: Clapperboard,
};

export const metadata: Metadata = {
  title: 'Services — Three pillars, one outcome | SABO M&T',
  description: 'Build (custom software), Automate (AI agents & workflow automation), Create (AI media production). Strategy, build, and operate — no hand-off gaps.',
  openGraph: {
    title: 'Services — Build. Automate. Create.',
    description: 'Custom software, AI automation, and media production for businesses.',
    url: 'https://sabo.com.vn/en/services',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SABO M&T Services' }]
  },
  alternates: {
    canonical: 'https://sabo.com.vn/en/services',
    languages: { 'vi': 'https://sabo.com.vn/services' }
  }
};

export default function ServicesEnPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does SABO M&T build custom software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SABO M&T follows a 4-step process: (1) Discovery (1-2 weeks) — requirements analysis and solution design, (2) Design (1-2 weeks) — UX/UI and system architecture, (3) Build (4-12 weeks) — development and testing, (4) Deploy & Support — production deployment and maintenance. Each project is assigned 1 lead engineer and 1 AI automation specialist. 100% code ownership — no vendor lock-in.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does AI automation reduce business costs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Workflow automation reduces manual repetitive tasks by at least 50%. AI agents handle tasks 24/7 without breaks. Examples: auto-sync data between CRM and accounting instead of copy-paste, or AI chatbot answering customers instead of support staff. ROI is measurable within the first month.'
        }
      },
      {
        '@type': 'Question',
        name: 'How is AI video production different from traditional filming?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI media production uses text-to-video, AI voiceover, and automated editing to reduce costs and time by 80-90%. Cost per video falls to $0.01-0.05 instead of $500-2000 for traditional filming. Suitable for marketing content with high volume (10-50 videos/month).'
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
          <EyebrowLabel tone="light">SERVICES — THREE PILLARS</EyebrowLabel>
          <h1 className="mt-8 text-display-1 font-serif text-paper text-balance max-w-5xl leading-[0.95]">
            Three pillars.
            <br />
            One outcome.
          </h1>
          <p className="mt-10 font-mono text-sm uppercase tracking-[0.12em] text-paper/50 max-w-2xl leading-relaxed">
            Strategy · build · operate — one engagement, no hand-off gaps.
          </p>
          <div className="mt-8 max-w-3xl flex flex-col gap-3">
            {/* BUILD */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper inline-flex items-center gap-1.5"><Code2 size={12} />BUILD</span>
              <span className="font-mono text-xs text-paper/50 px-3 py-1.5 border border-paper/20">web app · mobile app · backend</span>
              <span className="font-mono text-xs text-paper/30 px-3 py-1.5 border border-paper/10">8–16 weeks</span>
            </div>
            {/* AUTOMATE */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper inline-flex items-center gap-1.5"><Bot size={12} />AUTOMATE</span>
              <span className="font-mono text-xs text-paper/50 px-3 py-1.5 border border-paper/20">AI agents · workflow automation</span>
              <span className="font-mono text-xs text-paper/30 px-3 py-1.5 border border-paper/10">2–6 weeks</span>
            </div>
            {/* CREATE */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/60 text-paper inline-flex items-center gap-1.5"><Clapperboard size={12} />CREATE</span>
              <span className="font-mono text-xs text-paper/50 px-3 py-1.5 border border-paper/20">AI image · video pipeline</span>
              <span className="font-mono text-xs text-paper/30 px-3 py-1.5 border border-paper/10">3–4 weeks</span>
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
            <p className="mt-2 font-mono text-xs text-paper/30 tracking-[0.1em] uppercase">SMEs · Ho Chi Minh City · Nationwide</p>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper border-t border-paper/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {SERVICES_EN.map((service) => (
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
                  <PillCTA href={`/en/services/${service.slug}`} variant="outline">
                    Learn more
                  </PillCTA>
                </div>
              </div>
            </article>
              );
            })()
          ))}
        </div>
      </section>

      <MarqueeBand locale="en" />
      <FinalCta locale="en" />
    </>
  );
}
