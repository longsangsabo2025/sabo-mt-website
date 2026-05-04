import Image from 'next/image';
import { cn } from '@/lib/cn';

type BackdropDensity = 'quiet' | 'standard' | 'strong';
type BackdropFocus = 'left' | 'center' | 'right';

interface EditorialBackdropProps {
  light: string;
  dark: string;
  density?: BackdropDensity;
  focus?: BackdropFocus;
  className?: string;
}

const densityClasses: Record<BackdropDensity, string> = {
  quiet: 'opacity-[0.08] dark:opacity-[0.10]',
  standard: 'opacity-[0.12] dark:opacity-[0.14]',
  strong: 'opacity-[0.18] dark:opacity-[0.20]',
};

const focusClasses: Record<BackdropFocus, string> = {
  left: 'object-left',
  center: 'object-center',
  right: 'object-right',
};

export function EditorialBackdrop({
  light,
  dark,
  density = 'standard',
  focus = 'center',
  className,
}: EditorialBackdropProps) {
  const imageClass = cn(
    'object-cover scale-[1.03] luxury-drift',
    densityClasses[density],
    focusClasses[focus]
  );

  return (
    <div aria-hidden="true" className={cn('absolute inset-0 h-full w-full overflow-hidden pointer-events-none hidden dark:block', className)}>
      <Image src={dark} alt="" fill sizes="100vw" className={imageClass} />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="architect-grid absolute inset-0" />
      <div className="luxury-scan absolute inset-x-8 top-24 bottom-24 hidden md:block" />
    </div>
  );
}

export default EditorialBackdrop;
