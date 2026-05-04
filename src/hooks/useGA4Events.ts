'use client';

import { useEffect } from 'react';

/**
 * GA4 Event Tracking Hook
 *
 * Automatically tracks:
 * - CTA button clicks (data-cta attribute)
 * - External link clicks (target="_blank")
 * - Form submissions
 * - Modal interactions
 */
export function useGA4Events() {
  useEffect(() => {
    // Ensure gtag is available
    if (typeof window === 'undefined' || typeof (window as any).gtag === 'undefined') {
      return;
    }

    const gtag = (window as any).gtag;

    // Track CTA clicks (buttons with data-cta attribute)
    const handleCtaClick = (e: Event) => {
      const button = e.target as HTMLElement;
      const ctaLabel = button.getAttribute('data-cta') || button.textContent || 'Unknown CTA';
      const ctaType = button.getAttribute('data-cta-type') || 'primary';
      
      gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: ctaLabel,
        cta_type: ctaType,
        page_title: document.title,
      });
    };

    // Track external link clicks
    const handleExternalClick = (e: Event) => {
      const link = e.target as HTMLAnchorElement;
      if (link.hostname && link.hostname !== window.location.hostname) {
        gtag('event', 'outbound_click', {
          event_category: 'engagement',
          event_label: link.href,
          event_value: 1,
        });
      }
    };

    // Track form submissions
    const handleFormSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement;
      const formName = form.getAttribute('data-form-name') || form.name || 'unknown_form';
      
      gtag('event', 'form_submit', {
        event_category: 'conversion',
        event_label: formName,
        form_id: form.id,
      });
    };

    // Attach listeners
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.hasAttribute('data-cta')) handleCtaClick(e);
      if (target.tagName === 'A' && target.hasAttribute('target')) handleExternalClick(e);
    });

    document.addEventListener('submit', handleFormSubmit);

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0 && maxScroll > 0) {
          gtag('event', 'scroll_depth', {
            event_category: 'engagement',
            depth: maxScroll,
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track page visibility (time on page)
    let timeOnPage = 0;
    let isVisible = true;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
      } else {
        isVisible = true;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const pageTimer = setInterval(() => {
      if (isVisible) timeOnPage++;
    }, 1000);

    // Send time on page when user leaves
    const handleBeforeUnload = () => {
      if (timeOnPage > 5) {
        gtag('event', 'page_engagement', {
          event_category: 'engagement',
          time_on_page_seconds: timeOnPage,
          page_title: document.title,
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(pageTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}
