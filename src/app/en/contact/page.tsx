import type { Metadata } from 'next';
import { SiFlutter, SiNextdotjs, SiTypescript, SiSupabase, SiPython, SiGooglegemini } from '@icons-pack/react-simple-icons';
import { Mail, Phone, User, MapPin, Calendar } from 'lucide-react';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { ContactFormLoud } from '@/components/forms/ContactFormLoud';
import { SITE } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact — Start building with SABO today',
  description: 'Reach out to SABO M&T — Custom AI Solutions Studio in Ho Chi Minh City. Email, phone, or submit a brief. We reply within 24 business hours.',
  openGraph: {
    title: 'Contact — SABO M&T',
    description: 'Start your project with SABO M&T. Reply within 24 business hours.',
    url: 'https://sabo.com.vn/en/contact',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SABO M&T Contact' }]
  },
  alternates: {
    canonical: 'https://sabo.com.vn/en/contact',
    languages: { 'vi': 'https://sabo.com.vn/contact' }
  }
};

export default function ContactEnPage() {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://sabo.com.vn/en/contact',
    name: SITE.name,
    alternateName: SITE.shortName,
    description: 'Custom AI Solutions Studio — building custom software, AI automation, and media production for Vietnamese businesses',
    url: 'https://sabo.com.vn',
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.split(',')[0],
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'VN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '10.8231',
      longitude: '106.6297'
    },
    areaServed: 'Vietnam',
    openingHours: 'Mo-Fr 09:00-18:00'
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <section className="bg-ink text-paper pt-40 pb-32 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <EyebrowLabel tone="light">CONTACT — GET IN TOUCH</EyebrowLabel>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-6 flex flex-col">
              <h1 className="text-display-1 font-serif text-paper text-balance leading-[0.95]">
                Start building
                <br />
                with SABO
                <br />
                today.
              </h1>
              <p className="mt-8 font-mono text-sm uppercase tracking-[0.12em] text-paper/50">
                Reply within 24 business hours.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/40 text-paper/70">Free Consultation</span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/40 text-paper/70">Custom Software</span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/40 text-paper/70">AI Automation</span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] px-3 py-1.5 border border-paper/40 text-paper/70">Media Production</span>
              </div>
              <div className="mt-5 pt-4 border-t border-paper/10 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-mono text-xs text-paper/40 uppercase tracking-[0.12em]">Stack</span>
                <SiFlutter size={14} className="text-paper" title="Flutter" />
                <SiNextdotjs size={14} className="text-paper" title="Next.js" />
                <SiTypescript size={14} className="text-paper" title="TypeScript" />
                <SiSupabase size={14} className="text-paper" title="Supabase" />
                <SiPython size={14} className="text-paper" title="Python" />
                <SiGooglegemini size={14} className="text-paper" title="Gemini AI" />
              </div>

              <div className="mt-16 space-y-10 max-w-md">
                <a
                  href={`mailto:${SITE.email}`}
                  className="block group border-t border-paper/10 pt-6 transition-colors hover:border-paper"
                >
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-paper/40" />
                    <EyebrowLabel tone="light">EMAIL</EyebrowLabel>
                  </div>
                  <div className="mt-3 text-h3 font-serif text-paper group-hover:text-paper/80 transition-colors">
                    {SITE.email}
                  </div>
                </a>

                {SITE.phone && (
                  <a
                    href={`tel:${SITE.phone}`}
                    className="block group border-t border-paper/10 pt-6 transition-colors hover:border-paper"
                  >
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-paper/40" />
                      <EyebrowLabel tone="light">PHONE</EyebrowLabel>
                    </div>
                    <div className="mt-3 text-h3 font-serif text-paper group-hover:text-paper/80 transition-colors">
                      {SITE.phone}
                    </div>
                  </a>
                )}

                <div className="block border-t border-paper/10 pt-6">
                  <div className="flex items-center gap-2">
                    <User size={12} className="text-paper/40" />
                    <EyebrowLabel tone="light">FOUNDER</EyebrowLabel>
                  </div>
                  <a
                    href={`mailto:${SITE.emailFounder}`}
                    className="mt-3 text-h3 font-serif text-paper hover:text-paper/80 transition-colors block"
                  >
                    {SITE.emailFounder}
                  </a>
                </div>

                <div className="block border-t border-paper/10 pt-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-paper/40" />
                    <EyebrowLabel tone="light">HEADQUARTERS</EyebrowLabel>
                  </div>
                  <div className="mt-3 text-h3 font-serif text-paper">{SITE.address}</div>
                </div>

                <a
                  href="/booking"
                  className="block group border-t border-paper/10 pt-6 transition-colors hover:border-paper"
                >
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-paper/40" />
                    <EyebrowLabel tone="light">BOOK A 1:1 CONSULTATION</EyebrowLabel>
                  </div>
                  <div className="mt-3 text-h3 font-serif text-paper group-hover:text-paper/80 transition-colors">
                    Book a Google Meet →
                  </div>
                  <p className="mt-2 text-body-sm text-paper/60">
                    30 / 60 / 120 min · Online payment available · Pick your slot
                  </p>
                </a>
              </div>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <ContactFormLoud lang="en" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
