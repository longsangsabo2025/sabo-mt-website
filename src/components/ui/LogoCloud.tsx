import { cn } from '@/lib/cn';

interface Logo {
  src: string;
  alt: string;
}

interface Props {
  logos: Logo[];
  mode?: 'grid' | 'marquee';
  tone?: 'light' | 'dark';
}

export function LogoCloud({ logos, mode = 'grid', tone = 'light' }: Props) {
  const invertClass = tone === 'dark' ? 'invert' : '';

  if (mode === 'marquee') {
    const doubled = [...logos, ...logos];
    return (
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee will-change-transform gap-12">
          {doubled.map((logo, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className={cn(
                'h-10 object-contain opacity-70 hover:opacity-100 transition-opacity shrink-0',
                invertClass
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-8">
      {logos.map((logo, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={logo.src}
          alt={logo.alt}
          className={cn(
            'h-10 object-contain opacity-70 hover:opacity-100 transition-opacity',
            invertClass
          )}
        />
      ))}
    </div>
  );
}

export default LogoCloud;
