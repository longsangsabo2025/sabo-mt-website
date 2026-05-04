import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { PillCTA } from '@/components/ui/PillCTA';
import type { LucideIcon } from 'lucide-react';
import { ChartNoAxesCombined, Factory, MessageSquareQuote, Timer, Workflow } from 'lucide-react';

interface TrustStripProps {
  locale?: 'vi' | 'en';
}

const METRICS_VI = [
  { value: '4+', label: 'Dự án đã triển khai', sub: 'Từ MVP đến production' },
  { value: '3', label: 'Ngành phục vụ', sub: 'F&B, phân phối, bất động sản' },
  { value: '8–16', label: 'Tuần delivery', sub: 'Phần mềm tùy chỉnh' },
  { value: '50%', label: 'Giảm chi phí vận hành', sub: 'Với AI automation' },
];

const METRICS_EN = [
  { value: '4+', label: 'Projects delivered', sub: 'From MVP to production' },
  { value: '3', label: 'Industries served', sub: 'F&B, distribution, real estate' },
  { value: '8–16', label: 'Weeks to delivery', sub: 'Custom software' },
  { value: '50%', label: 'Ops cost reduction', sub: 'With AI automation' },
];

const TESTIMONIALS_VI = [
  {
    quote: 'SABOHUB đã thay thế toàn bộ quy trình quản lý thủ công của chúng tôi — từ bán hàng, kho vận đến tài chính. Đội ngũ giao hàng đúng timeline.',
    name: 'Doanh nghiệp phân phối',
    role: 'F&B Distribution, TP. HCM',
  },
  {
    quote: 'Hệ thống quản lý bida được custom hoàn toàn theo quy trình thực tế. Không còn ghi chép thủ công, nhân viên tập trung vào khách hàng hơn.',
    name: 'Billiards Club Manager',
    role: 'Giải trí, TP. HCM',
  },
];

const TESTIMONIALS_EN = [
  {
    quote: 'SABOHUB replaced our entire manual management workflow — from sales and warehouse to finance. The team delivered on time and on scope.',
    name: 'Distribution Business',
    role: 'F&B Distribution, Ho Chi Minh City',
  },
  {
    quote: 'The billiards management system was fully customized to our actual workflow. No more manual logging — staff can focus on customers.',
    name: 'Billiards Club Manager',
    role: 'Entertainment, Ho Chi Minh City',
  },
];

const METRIC_ICONS: LucideIcon[] = [Factory, Workflow, Timer, ChartNoAxesCombined];

export function TrustStrip({ locale = 'vi' }: TrustStripProps) {
  const en = locale === 'en';
  const metrics = en ? METRICS_EN : METRICS_VI;
  const testimonials = en ? TESTIMONIALS_EN : TESTIMONIALS_VI;

  return (
    <section className="bg-ink text-paper border-t border-paper/10 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Section header */}
        <div className="mb-16">
          <EyebrowLabel tone="light">
            {en ? 'RESULTS' : 'KẾT QUẢ THỰC TẾ'}
          </EyebrowLabel>
          <h2 className="mt-6 text-display-2 font-serif text-paper max-w-2xl leading-[1.0] whitespace-pre-line">
            {en ? 'Numbers that\nspeak for us.' : 'Con số\nnói thay chúng tôi.'}
          </h2>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-paper/10 border border-paper/10 mb-20">
          {metrics.map((m, idx) => {
            const MetricIcon = METRIC_ICONS[idx] ?? ChartNoAxesCombined;
            return (
            <div key={m.label} className="bg-ink px-8 py-10">
              <div className="text-5xl md:text-6xl font-serif text-paper">{m.value}</div>
              <div className="mt-3 flex items-center gap-2 text-body-sm text-paper/70 font-mono">
                <MetricIcon size={14} className="text-paper/60" />
                <span>{m.label}</span>
              </div>
              <div className="mt-1 text-caption text-paper/40 font-mono">{m.sub}</div>
            </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="border border-paper/10 p-8 md:p-10 flex flex-col gap-6"
            >
              <MessageSquareQuote size={16} className="text-paper/35" />
              <p className="text-body-lg text-paper/80 font-serif italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-auto">
                <div className="text-body-sm text-paper/70 font-sans">{t.name}</div>
                <div className="mt-1 text-caption text-paper/40 font-mono uppercase tracking-widest">
                  {t.role}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-4">
          <PillCTA href={en ? '/en/case-studies' : '/case-studies'} variant="light" trackingLabel="trust-strip-case-studies">
            {en ? 'View all case studies' : 'Xem tất cả dự án'}
          </PillCTA>
          <PillCTA href={en ? '/en/contact' : '/booking'} variant="outline" trackingLabel="trust-strip-booking">
            {en ? 'Book a consultation' : 'Đặt lịch tư vấn'}
          </PillCTA>
        </div>
      </div>
    </section>
  );
}

export default TrustStrip;
