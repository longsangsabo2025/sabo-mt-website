import { cn } from '@/lib/cn';

export function Eyebrow({ children, className, light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <span
      className={cn(
        'inline-block text-eyebrow uppercase tracking-[0.08em] font-medium',
        light ? 'text-gold' : 'text-gold',
        className
      )}
    >
      {children}
    </span>
  );
}
