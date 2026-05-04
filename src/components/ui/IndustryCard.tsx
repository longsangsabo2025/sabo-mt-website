import Link from 'next/link';
import { EyebrowLabel } from './EyebrowLabel';

interface Props {
  href: string;
  image: string;
  index: string;
  title: string;
  eyebrow?: string;
}

export function IndustryCard({ href, image, index, title, eyebrow = 'INDUSTRY' }: Props) {
  const isExternal = /^https?:\/\//.test(href);
  const cls = 'media-reveal motion-lift relative aspect-[16/10] w-full overflow-hidden bg-ink-soft block group border border-paper/10';
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 object-cover w-full h-full transition-transform duration-1200 ease-expo group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-8 lg:p-12">
        <EyebrowLabel index={index} tone="light">
          {eyebrow}
        </EyebrowLabel>
        <h2 className="text-display-2 font-serif text-paper mt-4">{title}</h2>
      </div>
    </>
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

export default IndustryCard;
