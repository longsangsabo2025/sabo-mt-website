'use client';

import { useGA4Events } from '@/hooks/useGA4Events';

/**
 * GA4 Event Tracker — activates event tracking for:
 * - CTA clicks (data-cta attribute)
 * - External link clicks
 * - Form submissions
 * - Scroll depth
 * - Time on page
 */
export function GA4EventTracker() {
  useGA4Events();
  return null;
}
