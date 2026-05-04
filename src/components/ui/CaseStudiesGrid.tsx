'use client';

import { useState } from 'react';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';

type ShowcaseItem = {
  slug: string;
  name: string;
  industryKey: string;
  category: string;
  image: string;
  href: string;
  eyebrow: string;
};

type FilterOption = {
  key: string;
  label: string;
};

interface CaseStudiesGridProps {
  items: ShowcaseItem[];
  filters: FilterOption[];
}

export function CaseStudiesGrid({ items, filters }: CaseStudiesGridProps) {
  const [active, setActive] = useState<string>('ALL');

  const visible =
    active === 'ALL' ? items : items.filter((i) => i.industryKey === active);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`font-mono text-eyebrow tracking-[0.16em] px-5 py-2.5 rounded-full border transition-colors ${
              active === f.key
                ? 'bg-paper text-ink border-paper'
                : 'border-paper/20 text-paper/70 hover:border-paper/50 hover:text-paper'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {visible.map((c) => (
          <CaseStudyCard
            key={c.slug}
            href={c.href}
            image={c.image}
            eyebrow={c.eyebrow}
            title={c.name}
          />
        ))}
        {visible.length === 0 && (
          <p className="col-span-2 text-body-md text-paper/40 py-16 text-center font-mono">
            Chưa có dự án trong lĩnh vực này.
          </p>
        )}
      </div>
    </>
  );
}
