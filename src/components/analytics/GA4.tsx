import Script from 'next/script';

/**
 * Google Analytics 4 (GA4) instrumentation.
 * Activated only when NEXT_PUBLIC_GA4_ID is set.
 *
 * Tracks:
 * - Page views (automatic)
 * - CTA clicks (pillar service, booking, contact, SABOHUB links)
 * - Video engagement (play, pause, complete)
 * - Form submissions
 * - Scroll depth
 * - Time on page
 *
 * Events can be triggered client-side via:
 *   gtag('event', 'event_name', { param1: value1, ... });
 */
export function GA4Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
            });
          `,
        }}
      />
    </>
  );
}
