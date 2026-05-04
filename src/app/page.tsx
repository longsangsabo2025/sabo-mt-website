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
  title: 'SABO M&T — Xây dựng phần mềm AI theo yêu cầu TP HCM',
  description: 'Studio phần mềm tùy chỉnh và sản xuất media AI. Giúp doanh nghiệp Việt Nam xây dựng ứng dụng, tự động hóa quy trình, và sản xuất content bằng AI.',
  keywords: ['xây dựng ứng dụng theo yêu cầu TP HCM', 'phần mềm tùy chỉnh', 'tự động hóa AI', 'sản xuất video AI Việt Nam', 'AI solutions studio'],
  openGraph: {
    title: 'SABO M&T — Build. Automate. Create.',
    description: 'Custom AI Solutions Studio — xây dựng giải pháp công nghệ tùy chỉnh cho doanh nghiệp Việt Nam',
    url: 'https://sabo.com.vn',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SABO M&T' }]
  },
  alternates: {
    canonical: 'https://sabo.com.vn',
    languages: { 'en': 'https://sabo.com.vn/en' }
  }
};

export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'SABO M&T là công ty gì?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SABO Media & Technology (SABO M&T) là Custom AI Solutions Studio tại TP. Hồ Chí Minh, Việt Nam. Được thành lập năm 2026, chúng tôi cung cấp 3 dịch vụ chính: Build (phát triển phần mềm tùy chỉnh), Automate (tự động hóa quy trình bằng AI), và Create (sản xuất media bằng AI pipeline). Đây là mô hình toàn diện giúp doanh nghiệp không cần làm việc với nhiều nhà cung cấp riêng lẻ.'
        }
      },
      {
        '@type': 'Question',
        name: 'SABO M&T phát triển phần mềm tùy chỉnh mất bao lâu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Phần mềm tùy chỉnh (web app, mobile app, backend systems) thường được deliver trong 8–16 tuần. Automation setup mất 2–6 tuần. AI media pipeline mất 3–4 tuần. Timeline cụ thể phụ thuộc vào độ phức tạp của scope. SABO M&T cam kết code ownership 100% cho khách hàng — không vendor lock-in.'
        }
      },
      {
        '@type': 'Question',
        name: 'SABO M&T có tự động hóa quy trình doanh nghiệp không?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Có. Dịch vụ Automate của SABO M&T bao gồm: workflow automation (n8n, Make, custom), AI agents & LLM integration, API & system integration, data pipeline & sync. Mục tiêu là giảm tối thiểu 50% thao tác lặp lại và ROI đo lường được trong tháng đầu tiên.'
        }
      },
      {
        '@type': 'Question',
        name: 'SABO M&T phục vụ ngành nào?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SABO M&T có kinh nghiệm với các ngành: F&B & hospitality (bida, nhà hàng, khách sạn, cafe), phân phối & bán lẻ, sản xuất (manufacturing), bất động sản, giáo dục & đào tạo, và media & entertainment. Công ty phục vụ doanh nghiệp vừa và nhỏ (SMEs) tại Việt Nam.'
        }
      },
      {
        '@type': 'Question',
        name: 'Chi phí phát triển phần mềm tùy chỉnh tại SABO M&T là bao nhiêu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Chi phí phụ thuộc vào scope và độ phức tạp của dự án. SABO M&T cung cấp tư vấn miễn phí để đánh giá nhu cầu và đề xuất giải pháp phù hợp ngân sách. Liên hệ qua contact@sabo.com.vn hoặc đặt lịch tư vấn tại sabo.com.vn/booking.'
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
      <Hero />
      {/* Answer block for AI engines — citable, direct answer */}
      <section className="bg-ink text-paper border-t border-paper/10 py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto p-8 border border-paper/10">
            <h2 className="text-h3 font-serif text-paper mb-4">SABO M&T là gì?</h2>
            <p className="font-mono text-body-lg text-paper/90 leading-relaxed mb-4">
              <strong>SABO Media & Technology</strong> là Custom AI Solutions Studio tại TP. Hồ Chí Minh, thành lập năm 2026. Chúng tôi xây dựng phần mềm tùy chỉnh (web app, mobile app, backend systems), tự động hóa quy trình doanh nghiệp bằng AI agents, và sản xuất hình ảnh + video với AI pipeline — ba dịch vụ trong một studio.
            </p>
            <p className="font-mono text-body-md text-paper/70 leading-relaxed">
              Timeline trung bình: phần mềm tùy chỉnh 8-16 tuần, automation setup 2-6 tuần, AI media pipeline 3-4 tuần. Phục vụ doanh nghiệp vừa và nhỏ tại Việt Nam. Code ownership 100% — không vendor lock-in.
            </p>
          </div>
        </div>
      </section>
      <IndustriesBand />
      <PillarsIntro />
      <WhySabo />
      <CasesRow />
      <TrustStrip />
      <LogoStrip />
      <MarqueeBand />
      <FinalCta />
    </>
  );
}
