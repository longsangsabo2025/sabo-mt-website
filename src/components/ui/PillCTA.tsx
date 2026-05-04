'use client';

import Link from 'next/link';
import useMagneticHover from '@/hooks/useMagneticHover';
import { cn } from '@/lib/cn';

type Variant = 'dark' | 'light' | 'outline' | 'glass';
type Size = 'sm' | 'md';

interface PillCTAProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  trackingLabel?: string;
  icon?: React.ReactNode;
}

// All variants share the liquid-glass gold design.
// Semantic distinction (dark/light/outline/glass) is preserved for future use.
const variantClasses: Record<Variant, string> = {
  dark:    'btn-liquid-glass',
  light:   'btn-liquid-glass',
  outline: 'btn-liquid-glass',
  glass:   'btn-liquid-glass',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 gap-2',
  md: 'px-7 py-3.5 gap-3',
};

export function PillCTA({
  href,
  children,
  variant = 'dark',
  size = 'md',
  className,
  external = false,
  onClick,
  trackingLabel,
  icon,
}: PillCTAProps) {
  const ref = useMagneticHover<HTMLDivElement>();

  const base = 'rounded-none inline-flex items-center font-mono uppercase tracking-widest text-xs transition-colors';

  const inner = (
    <>
      {icon && (
        <span
          className="btn-liquid-glass-icon grid place-items-center"
          style={{ width: size === 'sm' ? 14 : 16, height: size === 'sm' ? 14 : 16 }}
        >
          {icon}
        </span>
      )}
      <span>{children}</span>
    </>
  );

  const anchorClass = cn(base, sizeClasses[size], variantClasses[variant], className);
  const ctaLabel = trackingLabel || (typeof children === 'string' ? children : 'CTA');

  return (
    <div ref={ref} className="inline-block">
      {external ? (
        <a
          className={anchorClass}
          href={href}
          target="_blank"
          rel="noreferrer"
          onClick={onClick}
          data-cta={ctaLabel}
          data-cta-type={variant}
        >
          {inner}
        </a>
      ) : (
        <Link
          className={anchorClass}
          href={href}
          onClick={onClick}
          data-cta={ctaLabel}
          data-cta-type={variant}
        >
          {inner}
        </Link>
      )}
    </div>
  );
}

export default PillCTA;
