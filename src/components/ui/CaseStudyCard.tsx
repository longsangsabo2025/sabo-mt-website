import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { EyebrowLabel } from './EyebrowLabel';

interface Props {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
}

export function CaseStudyCard({ href, image, eyebrow, title }: Props) {
  const isExternal = /^https?:\/\//.test(href);
  const cls = 'group motion-lift block';
  const inner = (
      <div className="media-reveal relative overflow-hidden bg-ink-soft aspect-[4/5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1200 ease-expo group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <EyebrowLabel className="text-paper/70">{eyebrow}</EyebrowLabel>
          <p className="text-h3 font-serif text-paper mt-2 flex items-center gap-2 leading-snug">
            {title}
            <ArrowUpRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </div>
      </div>
  );
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export default CaseStudyCard;
