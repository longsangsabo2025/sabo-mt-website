import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { PillCTA } from '@/components/ui/PillCTA';
import { EditorialBackdrop } from '@/components/ui/EditorialBackdrop';

const TECH_PARTNERS_VI = [
  { name: 'Anthropic', role: 'AI Ngôn ngữ' },
  { name: 'OpenAI', role: 'AI Ngôn ngữ' },
  { name: 'Google Cloud', role: 'Hạ tầng đám mây' },
  { name: 'Vercel', role: 'Triển khai' },
  { name: 'Supabase', role: 'Cơ sở dữ liệu' },
  { name: 'AWS', role: 'Hạ tầng đám mây' },
  { name: 'Midjourney', role: 'AI Hình ảnh' },
  { name: 'Runway ML', role: 'AI Video' },
];

const TECH_PARTNERS_EN = [
  { name: 'Anthropic', role: 'AI Language' },
  { name: 'OpenAI', role: 'AI Language' },
  { name: 'Google Cloud', role: 'Infrastructure' },
  { name: 'Vercel', role: 'Deployment' },
  { name: 'Supabase', role: 'Database & Auth' },
  { name: 'AWS', role: 'Infrastructure' },
  { name: 'Midjourney', role: 'Image AI' },
  { name: 'Runway ML', role: 'Video AI' },
];

interface LogoStripProps { locale?: 'vi' | 'en' }

export function LogoStrip({ locale = 'vi' }: LogoStripProps) {
  const en = locale === 'en';
  const partners = en ? TECH_PARTNERS_EN : TECH_PARTNERS_VI;
  return (
    <section className="luxury-section relative py-24 border-t border-paper/10">
      <EditorialBackdrop
        light="/images/light/service-build-light.jpg"
        dark="/images/dark/service-build-dark.jpg"
        density="quiet"
        focus="center"
      />
      <div className="relative max-w-[1440px] mx-auto px-8">
        <EyebrowLabel index="V" tone="light">
          {en ? 'TECHNOLOGY PARTNERS' : 'CÔNG NGHỆ ĐỐI TÁC'}
        </EyebrowLabel>
        <h2 className="text-display-2 font-serif text-paper mt-4">
          {en ? 'Best-in-class AI stack.' : 'AI stack đẳng cấp thế giới.'}
        </h2>
        <p className="text-body text-paper/50 mt-4 max-w-lg">
          {en
            ? 'Every project is built on the most capable AI infrastructure available — not retrofitted, native from day one.'
            : 'Mỗi dự án được xây trên hạ tầng AI mạnh nhất hiện có — không retrofit, AI-native ngay từ đầu.'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-paper/10 mt-16 border border-paper/10">
          {partners.map((p) => (
            <div key={p.name} className="bg-ink/90 px-6 py-8 group hover:bg-paper/[0.03] transition-colors">
              <p className="font-serif text-h3 text-paper leading-tight">{p.name}</p>
              <p className="font-mono text-caption text-paper/40 uppercase tracking-[0.14em] mt-2">{p.role}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <PillCTA href={en ? '/en/services' : '/services'} variant="dark">
            {en ? 'See how we build' : 'Cách chúng tôi xây dựng'}
          </PillCTA>
        </div>
      </div>
    </section>
  );
}

export default LogoStrip;


