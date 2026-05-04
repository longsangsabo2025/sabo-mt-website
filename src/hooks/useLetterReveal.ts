'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function useLetterReveal<T extends HTMLElement = HTMLElement>(
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
    const words = text.split(' ');
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="word" style="display:inline-block;white-space:nowrap">${Array.from(word)
            .map((ch) => `<span class="letter inline-block">${ch}</span>`)
            .join('')}</span>`
      )
      .join(' ');

    const targets = el.querySelectorAll<HTMLElement>('.letter');

    if (reduced) {
      gsap.set(targets, { y: 0, opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      targets,
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'expo.out',
        stagger: 0.025,
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
