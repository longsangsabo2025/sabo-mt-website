import { cn } from '@/lib/cn';

export interface MarqueeItem {
  icon?: React.ReactNode;
  text: string;
}

interface Props {
  items: MarqueeItem[];
  repeat?: number;
  className?: string;
  /** Tailwind font-size + font-family classes applied to each label. */
  textClass?: string;
}

export function MarqueeText({
  items,
  repeat = 4,
  className,
  textClass = 'text-h1 font-mono',
}: Props) {
  return (
    <div className={cn('relative overflow-hidden whitespace-nowrap', className)}>
      <div className="flex animate-marquee will-change-transform">
        {Array.from({ length: repeat }).map((_, ri) => (
          <span key={ri} className="inline-flex items-center shrink-0">
            {items.map((item, ii) => (
              <span
                key={ii}
                className="inline-flex items-center gap-2 px-5"
              >
                {item.icon && (
                  <span className="inline-flex items-center shrink-0 opacity-65">
                    {item.icon}
                  </span>
                )}
                <span className={cn(textClass, 'uppercase tracking-[0.08em] whitespace-nowrap')}>
                  {item.text}
                </span>
                <span className="pl-4 opacity-20 select-none text-current">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MarqueeText;
