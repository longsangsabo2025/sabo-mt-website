import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPostgresql, SiPython, SiNodedotjs, SiGooglegemini, SiFfmpeg, SiLangchain, SiAnthropic } from '@icons-pack/react-simple-icons';
import { Check } from 'lucide-react';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { FinalCta } from '@/components/sections/FinalCta';
import { SERVICES } from '@/content/site';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) {
    return { title: 'Dịch vụ' };
  }
  return {
    title: `${s.title} — Dịch vụ | SABO M&T`,
    description: s.description || 'Studio Giải pháp AI Tùy chỉnh — xây dựng phần mềm tùy chỉnh, tự động hóa AI, và sản xuất phương tiện truyền thông cho các doanh nghiệp Việt Nam.',
    keywords: [s.eyebrow, s.title, 'SABO M&T', 'phần mềm tùy chỉnh', 'tự động hóa AI'],
    openGraph: {
      title: s.title,
      description: s.description,
      url: `https://sabo.com.vn/services/${s.slug}`,
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: s.title }],
    },
    alternates: {
      canonical: `https://sabo.com.vn/services/${s.slug}`,
      languages: { 'en': `https://sabo.com.vn/en/services/${s.slug}` },
    },
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((x) => x.slug === slug);
  if (!service) notFound();

  // Per-service FAQ for AI engines
  const faqBySlug: Record<string, { question: string; answer: string }[]> = {
    build: [
      {
        question: 'Phần mềm tùy chỉnh khác gì với mua SaaS có sẵn?',
        answer: 'Phần mềm tùy chỉnh được viết riêng cho quy trình của bạn, không bắt bạn thay đổi cách làm việc để vừa với SaaS. Code ownership 100% — không vendor lock-in. Timeline 8-16 tuần. Phù hợp khi quy trình đặc thù hoặc cần tích hợp sâu với hệ thống cũ.'
      },
      {
        question: 'SABO build mobile app bằng công nghệ gì?',
        answer: 'React Native cho iOS + Android từ 1 codebase. Hoặc Flutter nếu cần performance native. Web app dùng Next.js (React) hoặc SvelteKit. Backend dùng Node.js, Python, hoặc .NET tùy yêu cầu. Database: PostgreSQL, MongoDB, hoặc Supabase.'
      }
    ],
    automate: [
      {
        question: 'Tự động hóa có cần thay đổi toàn bộ hệ thống cũ không?',
        answer: 'Không. Automation layer nằm giữa các hệ thống hiện tại. Ví dụ: sync dữ liệu CRM ↔ kế toán tự động thay vì copy-paste. Các hệ thống cũ không cần sửa. Setup 2-6 tuần, ROI đo được trong tháng đầu.'
      },
      {
        question: 'AI agents có thể xử lý những task gì?',
        answer: 'Trả lời email/chat khách hàng, phân loại đơn hàng, tạo báo cáo tự động, theo dõi compliance, xử lý invoice, data entry từ scan/PDF. Chạy 24/7, không nghỉ. Chi phí thấp hơn thuê thêm nhân viên 70-80%.'
      }
    ],
    create: [
      {
        question: 'AI tạo video có chất lượng đủ để dùng marketing không?',
        answer: 'Có — phù hợp cho explainer video, product demo, social media content, training video. Không thay thế quay phim TVC cao cấp. Chi phí $0.01-0.05/video, output 10-50 video/tháng. Timeline setup pipeline 3-4 tuần.'
      },
      {
        question: 'SABO dùng công cụ AI nào để tạo media?',
        answer: 'Text-to-video: Runway, Pika. Text-to-image: Midjourney, Stable Diffusion, DALL-E. Voiceover: ElevenLabs, Google TTS. Editing automation: custom pipeline với FFmpeg + Python. Kết hợp để output scale mà giữ chất lượng ổn định.'
      }
    ]
  };

  const faqs = faqBySlug[service.slug] || [];
  const faqJsonLd = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

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
        name: 'Dịch vụ',
        item: 'https://sabo.com.vn/services'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://sabo.com.vn/services/${service.slug}`
      }
    ]
  };

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="bg-ink text-paper h-screen min-h-[80vh] flex flex-col justify-end">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full pb-24 md:pb-32">
          <EyebrowLabel tone="light" index={service.number}>
            {service.eyebrow}
          </EyebrowLabel>
          <h1 className="mt-10 text-display-1 font-serif text-paper text-balance leading-[0.92]">
            {service.title}.
          </h1>
          <div className="mt-6 pt-4 border-t border-paper/10 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs text-paper/40 uppercase tracking-[0.12em]">Stack</span>
            {service.slug === 'build' ? (
              <>
                <SiFlutter size={14} className="text-paper" title="Flutter" />
                <SiNextdotjs size={14} className="text-paper" title="Next.js" />
                <SiTypescript size={14} className="text-paper" title="TypeScript" />
                <SiSupabase size={14} className="text-paper" title="Supabase" />
                <SiPostgresql size={14} className="text-paper" title="PostgreSQL" />
                <SiNodedotjs size={14} className="text-paper" title="Node.js" />
              </>
            ) : service.slug === 'automate' ? (
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
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <span className="font-mono text-eyebrow text-paper/50 tracking-[0.16em] block">
                {service.number}
              </span>
              <h2 className="mt-6 text-h2 font-serif text-paper leading-[1.0]">
                {service.title}
              </h2>
            </div>
          </aside>

          <div className="md:col-span-8 space-y-16">
            <div>
              <EyebrowLabel tone="light">VỀ DỊCH VỤ</EyebrowLabel>
              <p className="mt-6 text-body-lg text-paper/80 max-w-prose leading-relaxed">
                {service.description}
              </p>
            </div>

            <div>
              <EyebrowLabel tone="light">DỊCH VỤ CON</EyebrowLabel>
              <ul className="mt-8 divide-y divide-paper/10 border-y border-paper/10">
                {service.subServices.map((item, i) => (
                  <li
                    key={item}
                    className="py-5 flex items-start gap-6 text-body-lg text-paper/80"
                  >
                    <span className="font-mono text-eyebrow text-paper/40 tracking-[0.16em] pt-1 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <EyebrowLabel tone="light">KẾT QUẢ NHẬN ĐƯỢC</EyebrowLabel>
              <ul className="mt-8 space-y-0">
                {service.outcomes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-5 py-6 border-b border-paper/10"
                  >
                    <span className="mt-1 w-6 h-6 rounded-full border border-paper/20 grid place-items-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-paper" strokeWidth={2} />
                    </span>
                    <span className="text-body-lg text-paper/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <EyebrowLabel tone="light">KỊCH BẢN ĐIỂN HÌNH</EyebrowLabel>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-paper/10 border border-paper/10">
                {service.scenarios.map((sc) => (
                  <div key={sc.label} className="bg-ink p-8">
                    <h3 className="text-h3 font-serif text-paper leading-tight">
                      {sc.label}
                    </h3>
                    <p className="mt-4 text-body-md text-paper/65">{sc.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
