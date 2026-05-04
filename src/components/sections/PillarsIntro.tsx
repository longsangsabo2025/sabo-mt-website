import Image from 'next/image';
import Link from 'next/link';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { EditorialBackdrop } from '@/components/ui/EditorialBackdrop';

const PILLARS_VI = [
  {
    index: '01', eyebrow: 'BUILD', slug: 'build',
    imageLight: '/images/light/service-build-light.jpg',
    imageDark: '/images/dark/service-build-dark.jpg',
    title: 'Phần mềm tùy chỉnh.',
    desc: 'Ứng dụng, website, web app — code riêng theo nhu cầu thật, không phải template lắp ghép.',
  },
  {
    index: '02', eyebrow: 'AUTOMATE', slug: 'automate',
    imageLight: '/images/light/service-automate-light.jpg',
    imageDark: '/images/dark/service-automate-dark.jpg',
    title: 'Tự động hóa & AI.',
    desc: 'Workflow automation, AI agents, system integration — giải phóng đội ngũ khỏi việc lặp đi lặp lại.',
  },
  {
    index: '03', eyebrow: 'CREATE', slug: 'create',
    imageLight: '/images/light/service-create-light.jpg',
    imageDark: '/images/dark/service-create-dark.jpg',
    title: 'Sản xuất Media AI.',
    desc: 'Hình ảnh, video, content pipeline — chất lượng broadcast, chi phí 1/10 production truyền thống.',
  },
];

const PILLARS_EN = [
  {
    index: '01', eyebrow: 'BUILD', slug: 'build',
    imageLight: '/images/light/service-build-light.jpg',
    imageDark: '/images/dark/service-build-dark.jpg',
    title: 'Custom software.',
    desc: 'Apps, websites, web apps — coded to your real business needs, not templated patchwork.',
  },
  {
    index: '02', eyebrow: 'AUTOMATE', slug: 'automate',
    imageLight: '/images/light/service-automate-light.jpg',
    imageDark: '/images/dark/service-automate-dark.jpg',
    title: 'Automation & AI.',
    desc: 'Workflow automation, AI agents, system integration — free your team from repetitive work.',
  },
  {
    index: '03', eyebrow: 'CREATE', slug: 'create',
    imageLight: '/images/light/service-create-light.jpg',
    imageDark: '/images/dark/service-create-dark.jpg',
    title: 'AI Media Production.',
    desc: 'Images, videos, content pipelines — broadcast quality at 1/10 the cost of traditional production.',
  },
];

interface PillarsIntroProps { locale?: 'vi' | 'en' }

export function PillarsIntro({ locale = 'vi' }: PillarsIntroProps) {
  const en = locale === 'en';
  const pillars = en ? PILLARS_EN : PILLARS_VI;
  const prefix = en ? '/en' : '';

  return (
    <section className="luxury-section relative py-32">
      <EditorialBackdrop
        light="/images/light/service-automate-light.jpg"
        dark="/images/dark/service-automate-dark.jpg"
        density="quiet"
        focus="left"
      />
      <div className="relative max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <EyebrowLabel index="III" tone="light">
              {en ? 'SERVICES' : 'DỊCH VỤ'}
            </EyebrowLabel>
            <h2 className="text-display-2 font-serif luxury-heading mt-4">
              Build. Automate. Create.
            </h2>
          </div>
          <div className="hidden md:flex items-end">
            <p className="font-mono text-body text-paper/60 max-w-md">
              {en
                ? 'Three capabilities, one roof — from idea to operations. Each solution custom-designed for your business.'
                : 'Ba mảng năng lực, một mái nhà — từ ý tưởng đến vận hành. Mỗi giải pháp được thiết kế riêng cho từng doanh nghiệp Việt.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
          {pillars.map((p) => (
            <Link
              key={p.slug}
              href={`${prefix}/services/${p.slug}`}
              className="group motion-lift block"
            >
              <div className="media-reveal relative h-56 overflow-hidden border border-paper/10 mb-6">
                {/* Light mode image */}
                <Image
                  src={p.imageLight}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 dark:hidden"
                />
                {/* Dark mode image */}
                <Image
                  src={p.imageDark}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 hidden dark:block"
                />
              </div>
              <EyebrowLabel index={p.index} tone="light">
                {p.eyebrow}
              </EyebrowLabel>
              <p className="text-h2 font-serif mt-4 text-paper">{p.title}</p>
              <p className="font-mono text-body text-paper/60 mt-3">{p.desc}</p>
              <span className="inline-flex items-center gap-2 mt-6 text-body-sm font-mono uppercase tracking-[0.16em] text-paper group-hover:gap-4 transition-all">
                {en ? 'Learn more →' : 'Tìm hiểu →'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PillarsIntro;

