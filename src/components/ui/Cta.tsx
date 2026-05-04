import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'gold';
type Size = 'sm' | 'md' | 'lg';

interface CtaProps {
  href: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function Cta({ href, variant = 'primary', size = 'md', arrow = false, children, className, external }: CtaProps) {
  const cls = cn(
    'btn',
    size === 'sm' && 'btn-sm',
    size === 'md' && 'btn-md',
    size === 'lg' && 'btn-lg',
    variant === 'primary'   && 'btn-primary',
    variant === 'secondary' && 'btn-secondary',
    variant === 'tertiary'  && 'btn-tertiary',
    variant === 'gold'      && 'btn-gold',
    className
  );
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="arrow w-4 h-4" strokeWidth={2} />}
    </>
  );
  if (external) return <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  return <Link className={cls} href={href}>{inner}</Link>;
}
