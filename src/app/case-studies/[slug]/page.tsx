import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPython, SiGooglegemini } from '@icons-pack/react-simple-icons';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { FinalCta } from '@/components/sections/FinalCta';
import { getShowcase, getShowcaseSlugsSync } from '@/lib/showcase';
import { getShowcaseImage } from '@/lib/showcase-images';
import { viCategoryLabel, viIndustryLabel } from '@/lib/vi-l10n';

export function generateStaticParams() {
  return getShowcaseSlugsSync().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getShowcase(slug);
  if (!c) {
    return { title: 'Nghiên cứu trường hợp' };
  }
  return {
    title: `${c.name} — Nghiên cứu trường hợp | SABO M&T`,
    description: c.description || 'Dự án thực tế của SABO M&T — Studio Giải pháp AI Tùy chỉnh tại Thành phố Hồ Chí Minh.',
    keywords: ['SABO M&T', 'case study', 'nghiên cứu trường hợp', 'AI', 'phần mềm tùy chỉnh'],
    openGraph: {
      title: c.name,
      description: c.description,
      url: `https://sabo.com.vn/case-studies/${c.slug}`,
      type: 'article',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: c.name }],
    },
    alternates: {
      canonical: `https://sabo.com.vn/case-studies/${c.slug}`,
      languages: { 'en': `https://sabo.com.vn/en/case-studies/${c.slug}` },
    },
  };
}

export default async function CaseStudyDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getShowcase(slug);
  if (!c) notFound();

  const headlineMetrics = (c.metrics.length > 0 ? c.metrics : c.hero_stats).slice(0, 3);
  const image = getShowcaseImage(c.slug);

  // Article schema for AI engines — case study as structured content
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.hero_title || c.name,
    description: c.hero_description || c.description,
    author: {
      '@type': 'Organization',
      name: 'SABO Media & Technology'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SABO Media & Technology',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sabo.com.vn/logo.png'
      }
    },
    datePublished: '2026-01-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sabo.com.vn/case-studies/${c.slug}`
    },
    about: {
      '@type': 'Service',
      name: `${c.category} for ${c.industry}`,
      provider: {
        '@type': 'Organization',
        name: 'SABO Media & Technology'
      }
    }
  };

  // BreadcrumbList for navigation structure
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://sabo.com.vn'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case studies',
        item: 'https://sabo.com.vn/case-studies'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: c.name,
        item: `https://sabo.com.vn/case-studies/${c.slug}`
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
      <section className="bg-ink text-paper pt-40 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">
            {viCategoryLabel(c.category).toUpperCase()} · {viIndustryLabel(c.industry).toUpperCase()}
          </EyebrowLabel>
          <h1 className="mt-10 text-display-1 font-serif text-paper text-balance max-w-5xl leading-[0.95]">
            {c.hero_title || c.name}.
          </h1>
          <p className="mt-10 font-mono text-body-lg text-paper/70 max-w-2xl">{c.hero_description || c.description}</p>
          <div className="mt-8 pt-4 border-t border-paper/10 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs text-paper/40 uppercase tracking-[0.12em]">Stack</span>
            <SiFlutter size={14} className="text-paper" title="Flutter" />
            <SiNextdotjs size={14} className="text-paper" title="Next.js" />
            <SiTypescript size={14} className="text-paper" title="TypeScript" />
            <SiSupabase size={14} className="text-paper" title="Supabase" />
            <SiPython size={14} className="text-paper" title="Python" />
            <SiGooglegemini size={14} className="text-paper" title="Gemini AI" />
          </div>
          {c.production_url && (
            <a
              href={c.production_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 font-mono text-eyebrow tracking-[0.16em] uppercase text-paper border-b border-paper/40 pb-2 hover:border-paper transition-colors"
            >
              {new URL(c.production_url).hostname}
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          )}
        </div>
      </section>

      <section className="bg-ink text-paper border-y border-paper/10">
        <div className="relative w-full h-[70vh] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={c.name} className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="bg-ink text-paper py-24 md:py-32 border-b border-paper/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-12">
            <EyebrowLabel tone="light">KẾT QUẢ ĐO LƯỜNG</EyebrowLabel>
            {headlineMetrics.map((m) => (
              <div key={m.label} className="border-t border-paper/10 pt-8">
                <div className="text-display-2 font-serif text-paper leading-none">
                  {m.value}
                </div>
                <div className="mt-4 font-mono text-eyebrow text-paper/60 tracking-[0.16em] uppercase">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-7 space-y-12">
            <div>
              <EyebrowLabel tone="light">TỔNG QUAN</EyebrowLabel>
              <p className="mt-6 font-mono text-body-lg text-paper/80 leading-relaxed max-w-prose">
                {c.overview_description || c.description}
              </p>
            </div>

            {c.objectives.length > 0 && (
              <div>
                <EyebrowLabel tone="light">MỤC TIÊU</EyebrowLabel>
                <ul className="mt-6 space-y-3 text-body-md text-paper/80 max-w-prose font-mono">
                  {c.objectives.map((o, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-mono text-eyebrow text-paper/40 tracking-[0.16em] mt-1.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {c.impacts.length > 0 && (
              <div>
                <EyebrowLabel tone="light">TÁC ĐỘNG</EyebrowLabel>
                <ul className="mt-6 space-y-3 text-body-md text-paper/80 max-w-prose font-mono">
                  {c.impacts.map((i, idx) => (
                    <li key={idx} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-paper/50 shrink-0" strokeWidth={1.8} />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {c.features.length > 0 && (
        <section className="bg-ink text-paper py-24 md:py-32 border-b border-paper/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <EyebrowLabel tone="light">TÍNH NĂNG CHÍNH</EyebrowLabel>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {c.features.map((f, i) => (
          <div key={i} className="border border-paper/10 p-8">
                  <div className="font-mono text-eyebrow text-paper/40 tracking-[0.16em]">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-4 text-h3 font-serif text-paper">{f.title}</h3>
                  <ul className="mt-6 space-y-2 font-mono text-body-sm text-paper/70">
                    {f.points.map((p, j) => (
                      <li key={j} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-paper/40 shrink-0" strokeWidth={1.8} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(c.tech_stack.length > 0 || c.performance.length > 0 || c.infrastructure.length > 0) && (
        <section className="bg-ink text-paper py-24 md:py-32 border-b border-paper/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {c.tech_stack.length > 0 && (
              <div>
                <EyebrowLabel tone="light">CÔNG NGHỆ</EyebrowLabel>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {c.tech_stack.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-caption tracking-[0.12em] uppercase border border-paper/20 px-3 py-1.5 text-paper/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {c.performance.length > 0 && (
              <div>
                <EyebrowLabel tone="light">HIỆU NĂNG</EyebrowLabel>
                <ul className="mt-6 space-y-3">
                  {c.performance.map((p) => (
                    <li key={p.label} className="flex justify-between gap-4 border-b border-paper/10 pb-2">
                      <span className="font-mono text-caption text-paper/50 tracking-[0.12em] uppercase">{p.label}</span>
                      <span className="font-serif text-body-md text-paper">{p.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {c.infrastructure.length > 0 && (
              <div>
                <EyebrowLabel tone="light">HẠ TẦNG</EyebrowLabel>
                <ul className="mt-6 space-y-3">
                  {c.infrastructure.map((p) => (
                    <li key={p.label} className="flex justify-between gap-4 border-b border-paper/10 pb-2">
                      <span className="font-mono text-caption text-paper/50 tracking-[0.12em] uppercase">{p.label}</span>
                      <span className="font-serif text-body-md text-paper">{p.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Inline CTA: similar project consultation */}
      <section className="bg-ink text-paper py-24 md:py-32 border-b border-paper/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="max-w-2xl">
            <EyebrowLabel tone="light">TƯ VẤN DỰ ÁN TƯƠNG TỰ</EyebrowLabel>
            <h2 className="mt-6 text-display-2 font-serif text-paper leading-[1.0]">
              Bạn có dự án<br />tương tự không?
            </h2>
            <p className="mt-6 text-body-lg text-paper/60 max-w-lg">
              Hãy nói chuyện trực tiếp với founder. 30 phút để xác định
              scope, timeline và chi phí — không cam kết.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href={`/booking?ref=case-study-${c.slug}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-paper text-ink font-mono text-eyebrow tracking-[0.16em] uppercase hover:bg-paper/90 transition-colors"
            >
              Đặt lịch ngay
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-paper/30 text-paper font-mono text-eyebrow tracking-[0.16em] uppercase hover:border-paper/70 transition-colors"
            >
              Gửi brief dự án
            </a>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
