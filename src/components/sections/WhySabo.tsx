import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { EditorialBackdrop } from '@/components/ui/EditorialBackdrop';
import { DIFFERENTIATORS } from '@/content/site';
import { CheckCircle2, Circle, CircleDashed } from 'lucide-react';

type Capability = 'full' | 'partial' | 'none';

type CompRow = {
  who: string;
  build: Capability;
  automate: Capability;
  create: Capability;
  highlight?: boolean;
};

const ROWS_VI: CompRow[] = [
  { who: 'Công ty phần mềm', build: 'full', automate: 'partial', create: 'none' },
  { who: 'Agency truyền thông', build: 'none', automate: 'none', create: 'full' },
  { who: 'Big4 / Tư vấn lớn', build: 'full', automate: 'full', create: 'none' },
  { who: 'SABO M&T', build: 'full', automate: 'full', create: 'full', highlight: true },
];

const ROWS_EN: CompRow[] = [
  { who: 'Software companies', build: 'full', automate: 'partial', create: 'none' },
  { who: 'Traditional agencies', build: 'none', automate: 'none', create: 'full' },
  { who: 'Big4 / Consultancies', build: 'full', automate: 'full', create: 'none' },
  { who: 'SABO M&T', build: 'full', automate: 'full', create: 'full', highlight: true },
];

function Cap({ value }: { value: Capability }) {
  if (value === 'full') {
    return <CheckCircle2 size={16} className="inline-block text-paper" aria-label="yes" />;
  }
  if (value === 'partial') {
    return <CircleDashed size={16} className="inline-block text-paper/50" aria-label="partial" />;
  }
  return <Circle size={16} className="inline-block text-paper/20" aria-label="no" />;
}

interface WhySaboProps {
  locale?: 'vi' | 'en';
}

export function WhySabo({ locale = 'vi' }: WhySaboProps) {
  const en = locale === 'en';
  const rows = en ? ROWS_EN : ROWS_VI;

  return (
    <section className="luxury-section relative py-32 border-t border-paper/10">
      <EditorialBackdrop
        light="/images/light/hero-light.jpg"
        dark="/images/dark/hero-dark.jpg"
        density="quiet"
        focus="center"
      />
      <div className="relative max-w-[1440px] mx-auto px-8">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <EyebrowLabel tone="light">
              {en ? 'WHY SABO' : 'TẠI SAO SABO?'}
            </EyebrowLabel>
            <h2 className="text-display-2 font-serif text-paper mt-4">
              {en ? 'Three capabilities. One roof.' : 'Ba năng lực. Một mái nhà.'}
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-mono text-body-lg text-paper/60 max-w-md">
              {en
                ? 'Software companies don\'t do media. Agencies don\'t build systems. Big consultancies don\'t produce content. SABO erases all three boundaries.'
                : 'Công ty phần mềm không làm media. Agency không xây hệ thống. Tư vấn lớn không sản xuất content. SABO xóa bỏ cả ba ranh giới đó.'}
            </p>
          </div>
        </div>

        {/* Comparison matrix */}
        <div className="luxury-frame overflow-x-auto mb-24">
          <table className="w-full min-w-[480px]">
            <thead>
              <tr className="border-b border-paper/10">
                <th className="text-left pb-4 w-1/2" />
                {(['BUILD', 'AUTOMATE', 'CREATE'] as const).map((h) => (
                  <th key={h} className="text-center pb-4 font-mono text-eyebrow text-paper/40 tracking-[0.16em]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.who}
                  className={`border-b border-paper/10 transition-colors ${row.highlight ? 'bg-paper/[0.04]' : ''}`}
                >
                  <td className="py-5 pr-8">
                      <span className={`font-mono ${row.highlight ? 'text-paper text-body-lg font-medium' : 'text-paper/45 text-body'}`}>
                      {row.who}
                    </span>
                    {row.highlight && (
                      <span className="ml-3 font-mono text-caption text-paper/35 tracking-[0.14em] uppercase">
                        ← {en ? 'us' : 'chúng tôi'}
                      </span>
                    )}
                  </td>
                  <td className="text-center py-5"><Cap value={row.build} /></td>
                  <td className="text-center py-5"><Cap value={row.automate} /></td>
                  <td className="text-center py-5"><Cap value={row.create} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5 Differentiators */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-paper/10 pt-16">
          {DIFFERENTIATORS.map((d) => (
            <div key={d.title}>
              <p className="font-mono text-eyebrow text-paper tracking-[0.10em] uppercase">{d.title}</p>
              <p className="font-mono text-body-sm text-paper/50 mt-2">{d.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhySabo;
