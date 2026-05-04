'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function useStaggerReveal(): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const children = container.querySelectorAll<HTMLElement>('[data-stagger]');
    if (children.length === 0) return;

    if (reduced) {
      gsap.set(children, { opacity: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: { trigger: container, start: 'top 75%' },
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  return ref;
}
