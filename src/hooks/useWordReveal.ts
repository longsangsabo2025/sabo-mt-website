'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function useWordReveal<T extends HTMLElement = HTMLElement>(
  deps: unknown[] = []
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const text = el.textContent ?? '';
    const words = text.split(/\s+/).filter(Boolean);
    el.innerHTML = words
      .map((w) => `<span class="word inline-block">${w}</span>`)
      .join(' ');

    const targets = el.querySelectorAll<HTMLElement>('.word');

    if (reduced) {
      gsap.set(targets, { y: 0, opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      targets,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: 'top 80%' },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
