'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';

interface UseModalAnimationParams {
  open: boolean;
  onAnimationComplete?: () => void;
}

export default function useModalAnimation({
  open,
  onAnimationComplete,
}: UseModalAnimationParams): [RefObject<HTMLDivElement>, RefObject<HTMLDivElement>] {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!overlay || !content) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set(overlay, { opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' });
      gsap.set(content, { opacity: open ? 1 : 0, scale: open ? 1 : 0.95 });
      onAnimationComplete?.();
      return;
    }

    if (open) {
      // Fade in overlay + scale in content
      gsap.set(overlay, { pointerEvents: 'auto' });
      gsap.timeline()
        .fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power1.out' },
          0
        )
        .fromTo(
          content,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)' },
          0.1
        )
        .then(() => onAnimationComplete?.());
    } else {
      // Fade out + scale down
      gsap.set(overlay, { pointerEvents: 'none' });
      gsap.timeline().to(overlay, { opacity: 0, duration: 0.2 }).to(
        content,
        { opacity: 0, scale: 0.95, duration: 0.2 },
        0
      );
    }
  }, [open, onAnimationComplete]);

  return [overlayRef, contentRef];
}
