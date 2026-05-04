'use client';

import { useCallback, useEffect, useRef, useState, RefObject } from 'react';
import { gsap } from 'gsap';

interface UseExpandPanelReturn {
  open: boolean;
  toggle: () => void;
  contentRef: RefObject<HTMLDivElement>;
}

export default function useExpandPanel(
  initialOpen = false
): UseExpandPanelReturn {
  const [open, setOpen] = useState(initialOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isFirst.current) {
      isFirst.current = false;
      gsap.set(el, { height: open ? 'auto' : 0, overflow: 'hidden' });
      return;
    }

    gsap.set(el, { height: 'auto' });
    const target = el.scrollHeight;
    const from = open ? 0 : target;
    const to = open ? target : 0;

    gsap.fromTo(
      el,
      { height: from, overflow: 'hidden' },
      {
        height: to,
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: () => {
          if (open) gsap.set(el, { height: 'auto' });
        },
      }
    );
  }, [open]);

  return { open, toggle, contentRef };
}
