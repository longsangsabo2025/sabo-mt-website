'use client';

import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';
import { EditorialBackdrop } from '@/components/ui/EditorialBackdrop';
import { getShowcaseImage } from '@/lib/showcase-images';
import { viCategoryLabel } from '@/lib/vi-l10n';
import useStaggerReveal from '@/hooks/useStaggerReveal';
import { useEffect, useState } from 'react';

interface CasesRowProps { locale?: 'vi' | 'en' }

export function CasesRow({ locale = 'vi' }: CasesRowProps) {
  const [cases, setCases] = useState<any[]>([]);
  const containerRef = useStaggerReveal();
  const en = locale === 'en';
  const prefix = en ? '/en' : '';

  useEffect(() => {
    (async () => {
      const { getShowcases } = await import('@/lib/showcase');
      const all = await getShowcases();
      const featured = all.filter((s) => s.is_featured).slice(0, 3);
      const display = featured.length === 3 ? featured : all.slice(0, 3);
      setCases(display);
    })();
  }, []);

  return (
    <section className="luxury-section relative py-32">
      <EditorialBackdrop
        light="/images/light/service-create-light.jpg"
        dark="/images/dark/service-create-dark.jpg"
        density="quiet"
        focus="right"
      />
      <div className="relative max-w-[1440px] mx-auto px-8">
        <EyebrowLabel index="IV" tone="light">
          {en ? 'CASE STUDIES' : 'DỰ ÁN TIÊU BIỂU'}
        </EyebrowLabel>
        <h2 className="text-display-2 font-serif text-paper mt-4">
          {en ? 'Featured work.' : 'Sản phẩm tiêu biểu.'}
        </h2>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {cases.map((c) => (
            <div key={c.slug} data-stagger>
              <CaseStudyCard
                href={`${prefix}/case-studies/${c.slug}`}
                image={getShowcaseImage(c.slug)}
                eyebrow={`${c.name.toUpperCase()} · ${(en ? c.category : viCategoryLabel(c.category)).toUpperCase()}`}
                title={c.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CasesRow;

