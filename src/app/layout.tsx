import type { Metadata } from 'next';
import { Be_Vietnam_Pro, IBM_Plex_Mono, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ChatWidget } from '@/components/ui/ChatWidget';
import { Analytics } from '@/components/analytics/Analytics';
import { GA4Analytics } from '@/components/analytics/GA4';
import { GA4EventTracker } from '@/components/analytics/GA4EventTracker';
import { SITE } from '@/content/site';

const beVietnamPro = Be_Vietnam_Pro({ subsets: ['latin', 'latin-ext', 'vietnamese'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin', 'latin-ext', 'vietnamese'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });
const cormorantGaramond = Cormorant_Garamond({ subsets: ['latin', 'latin-ext', 'vietnamese'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://sabo.com.vn'),
  title: { default: `${SITE.shortName} — ${SITE.tagline}`, template: `%s · ${SITE.shortName}` },
  description: SITE.oneLiner,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  keywords: ['custom AI solutions', 'AI studio Vietnam', 'phần mềm tùy chỉnh', 'tự động hóa AI', 'AI media production', 'build automate create', 'SABO M&T', 'Vietnam AI'],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://sabo.com.vn',
    siteName: SITE.name,
    title: `${SITE.shortName} — ${SITE.tagline}`,
    description: SITE.oneLiner,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SABO M&T' }]
  },
  twitter: { card: 'summary_large_image', title: SITE.shortName, description: SITE.oneLiner },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    alternateName: [SITE.shortName, 'sabo.com.vn'],
    description: SITE.oneLiner,
    url: 'https://sabo.com.vn',
    logo: 'https://sabo.com.vn/logo.png',
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: String(SITE.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.split(',')[0],
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'VN'
    },
    areaServed: 'Vietnam',
    knowsAbout: [
      'Custom Software Development',
      'AI Workflow Automation',
      'AI Media Production',
      'Business Process Automation Vietnam',
      'Custom AI Solutions',
      'AI Integration for SMEs'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'SABO M&T Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Build — Custom Software Development',
            description: 'Web app, mobile app, backend systems tùy chỉnh cho doanh nghiệp'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Automate — AI & Workflow Automation',
            description: 'Tự động hóa quy trình, AI agents, system integration'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Create — AI Media Production',
            description: 'Sản xuất hình ảnh, video, content bằng AI pipeline'
          }
        }
      ]
    },
    sameAs: [
      'https://www.facebook.com/sabomedia.tech',
      'https://www.youtube.com/@sabomediatech',
      ...(SITE.social.linkedin ? [SITE.social.linkedin] : [])
    ],
    founder: {
      '@type': 'Person',
      name: 'Võ Long Sang',
      jobTitle: 'Founder & CEO',
      worksFor: { '@type': 'Organization', name: SITE.name },
      knowsAbout: ['Custom Software Development', 'AI Automation', 'AI Media Production', 'Business Technology Vietnam']
    },
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 10 },
    legalName: 'SABO Media & Technology',
    taxID: SITE.taxCode,
    vatID: SITE.taxCode,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      email: SITE.email,
      contactType: 'customer service',
      availableLanguage: ['Vietnamese', 'English'],
      areaServed: 'VN'
    }
  };
  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    alternateName: SITE.shortName,
    url: 'https://sabo.com.vn',
    inLanguage: ['vi-VN', 'en-US'],
    description: SITE.oneLiner,
    potentialAction: {
      '@type': 'ContactAction',
      name: 'Đặt lịch tư vấn',
      target: 'https://sabo.com.vn/booking'
    }
  };
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${ibmPlexMono.variable} ${cormorantGaramond.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-ink text-paper font-sans">
        <ThemeProvider>
          <LenisProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
            <GA4EventTracker />
          </LenisProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <GA4Analytics />
        <Analytics />
      </body>
    </html>
  );
}


