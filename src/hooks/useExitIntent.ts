'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseExitIntentOptions {
  /** Delay in ms before activating exit-intent listener. Default: 30000 (30s) */
  activationDelay?: number;
  /** Callback fired when exit intent is detected */
  onExitIntent: () => void;
  /** Whether the intent has already been triggered (to fire only once) */
  triggered: boolean;
}

/**
 * useExitIntent — fires onExitIntent when:
 * - Desktop: mouse leaves the viewport from the top edge (cursor exit)
 * - Mobile: user idles for `activationDelay` ms (no scroll/touch events)
 *
 * Fires at most once per page session. Respects triggered flag.
 */
export function useExitIntent({ activationDelay = 30000, onExitIntent, triggered }: UseExitIntentOptions) {
  const activeRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fire = useCallback(() => {
    if (triggered || activeRef.current) return;
    activeRef.current = true;
    onExitIntent();
  }, [triggered, onExitIntent]);

  useEffect(() => {
    if (triggered) return;

    let activated = false;

    const activate = () => {
      activated = true;
    };

    // Activate after delay — don't ambush user immediately
    timerRef.current = setTimeout(activate, activationDelay);

    // Desktop: mouse leaves from top of viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (!activated || triggered) return;
      if (e.clientY <= 5) {
        fire();
      }
    };

    // Mobile: fire on long idle (no interaction for activationDelay)
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const resetIdle = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (activated && !triggered) fire();
      }, activationDelay);
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (isMobile) {
      window.addEventListener('scroll', resetIdle, { passive: true });
      window.addEventListener('touchstart', resetIdle, { passive: true });
      resetIdle();
    } else {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (idleTimer) clearTimeout(idleTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (isMobile) {
        window.removeEventListener('scroll', resetIdle);
        window.removeEventListener('touchstart', resetIdle);
      }
    };
  }, [triggered, activationDelay, fire]);
}
