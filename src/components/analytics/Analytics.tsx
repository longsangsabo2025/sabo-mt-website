import Script from 'next/script';

/**
 * Plausible Analytics — privacy-friendly, no cookies, no banner needed.
 * Activated only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 *
 * Self-host or cloud (https://plausible.io). Override script source via
 * NEXT_PUBLIC_PLAUSIBLE_SRC if using a self-hosted instance.
 *
 * Includes `outbound-links` extension for tracking external clicks
 * (sabohub redirects, social profiles, partner links).
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? 'https://plausible.io/js/script.outbound-links.js';
  return (
    <Script
      defer
      data-domain={domain}
      src={src}
      strategy="afterInteractive"
    />
  );
}
