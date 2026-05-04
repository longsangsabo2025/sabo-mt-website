'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';

const MAX_OFFSET = 8;

export default function useMagneticHover<T extends HTMLElement = HTMLElement>(
  strength = 0.3
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      const x = Math.sign(dx) * Math.min(Math.abs(dx), MAX_OFFSET);
      const y = Math.sign(dy) * Math.min(Math.abs(dy), MAX_OFFSET);
      gsap.to(el, { x, y, duration: 0.3, ease: 'power3.out' });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return ref;
}
