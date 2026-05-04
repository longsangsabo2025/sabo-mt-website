import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { EditorialBackdrop } from '@/components/ui/EditorialBackdrop';
import { IndustryCard } from '@/components/ui/IndustryCard';
import { getShowcases } from '@/lib/showcase';
import { INDUSTRIES } from '@/content/site';
import { getShowcaseImage } from '@/lib/showcase-images';
import { viCategoryLabel, viIndustryLabel } from '@/lib/vi-l10n';

interface IndustriesBandProps { locale?: 'vi' | 'en' }

export async function IndustriesBand({ locale = 'vi' }: IndustriesBandProps) {
  const showcases = await getShowcases();
  const en = locale === 'en';
  const prefix = en ? '/en' : '';

  return (
    <section className="luxury-section relative py-32">
      <EditorialBackdrop
        light="/images/light/service-build-light.jpg"
        dark="/images/dark/service-build-dark.jpg"
        density="quiet"
        focus="right"
      />
      <div className="relative max-w-[1440px] mx-auto px-8">
        <EyebrowLabel index="II" tone="light">
          {en ? 'PROOF OF WORK' : 'BẰNG CHỨNG NĂNG LỰC'}
        </EyebrowLabel>
        <h2 className="text-display-2 font-serif luxury-heading mt-4 max-w-3xl">
          {en ? 'Built — not promised.' : 'Đã xây — không phải lời hứa.'}
        </h2>
        <p className="font-mono text-body-lg text-paper/60 mt-6 max-w-xl">
          {en
            ? `${showcases.length} production products across ${INDUSTRIES.filter((i) => i.active).length} industries — proving every capability we claim.`
            : `${showcases.length} sản phẩm production trên ${INDUSTRIES.filter((i) => i.active).length} lĩnh vực — chứng minh từng năng lực chúng tôi tuyên bố.`}
        </p>

        <div className="flex flex-col gap-6 mt-16">
          {showcases.map((item, idx) => (
            <IndustryCard
              key={item.slug}
              href={`${prefix}/case-studies/${item.slug}`}
              index={String(idx + 1).padStart(2, '0')}
              title={item.name}
              eyebrow={
                en
                  ? `${item.category.toUpperCase()} · ${item.industry.toUpperCase()}`
                  : `${viCategoryLabel(item.category).toUpperCase()} · ${viIndustryLabel(item.industry).toUpperCase()}`
              }
              image={getShowcaseImage(item.slug)}
            />
          ))}
        </div>

        {/* Industries breadth row */}
        <div className="mt-20 pt-10 border-t border-paper/10">
          <p className="font-mono text-eyebrow text-paper/40 tracking-[0.16em] uppercase mb-6">
            {en ? 'Industries we serve' : 'Lĩnh vực chúng tôi phục vụ'}
          </p>
          <div className="flex flex-wrap gap-3">
            {INDUSTRIES.map((ind) => (
              <span
                key={ind.slug}
                className={`font-mono text-caption tracking-[0.12em] uppercase px-4 py-2 border ${
                  ind.active
                    ? 'border-paper/30 text-paper/80'
                    : 'border-paper/10 text-paper/30'
                }`}
              >
                {ind.label}
                {!ind.active && (
                  <span className="ml-2 text-paper/25">
                    {en ? '(expanding)' : '(mở rộng)'}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default IndustriesBand;

