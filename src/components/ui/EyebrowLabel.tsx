import { cn } from '@/lib/cn';

interface Props {
  children: React.ReactNode;
  index?: string;
  bullet?: boolean;
  className?: string;
  tone?: 'light' | 'dark';
}

export function EyebrowLabel({
  children,
  index,
  bullet = false,
  className,
  tone = 'light',
}: Props) {
  const toneClass = tone === 'light' ? 'text-paper' : 'text-ink/60';
  return (
    <p
      className={cn(
        'font-mono text-eyebrow uppercase tracking-[0.16em]',
        toneClass,
        className
      )}
    >
      {index && <span className="opacity-60 mr-2">{index}</span>}
      {bullet && <span className="mr-2">•</span>}
      {children}
    </p>
  );
}

export default EyebrowLabel;

