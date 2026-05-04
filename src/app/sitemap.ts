import type { MetadataRoute } from 'next';
import { SERVICES, CASE_STUDIES } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://sabo.com.vn';
  const now = new Date();
  const routePriorities: Record<string, { priority: number; changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' }> = {
    '': { priority: 1.0, changefreq: 'weekly' },
    '/services': { priority: 0.9, changefreq: 'monthly' },
    '/case-studies': { priority: 0.9, changefreq: 'monthly' },
    '/industries': { priority: 0.8, changefreq: 'monthly' },
    '/about': { priority: 0.7, changefreq: 'yearly' },
    '/contact': { priority: 0.8, changefreq: 'weekly' },
    '/legal/privacy': { priority: 0.5, changefreq: 'yearly' },
    '/legal/terms': { priority: 0.5, changefreq: 'yearly' },
    '/legal/cookies': { priority: 0.5, changefreq: 'yearly' },
    '/en': { priority: 1.0, changefreq: 'weekly' },
    '/en/services': { priority: 0.9, changefreq: 'monthly' },
    '/en/case-studies': { priority: 0.9, changefreq: 'monthly' },
    '/en/industries': { priority: 0.8, changefreq: 'monthly' },
    '/en/about': { priority: 0.7, changefreq: 'yearly' },
    '/en/contact': { priority: 0.8, changefreq: 'weekly' },
    '/booking': { priority: 0.8, changefreq: 'monthly' }
  };
  const staticEntries = Object.entries(routePriorities).map(([r, config]) => ({
    url: `${base}${r}`,
    lastModified: now,
    priority: config.priority,
    changeFrequency: config.changefreq
  }));
  const serviceEntries = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: 'monthly' as const
  }));
  const caseEntries = CASE_STUDIES.map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: 'monthly' as const
  }));
  const enServiceEntries = SERVICES.map((s) => ({
    url: `${base}/en/services/${s.slug}`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: 'monthly' as const
  }));
  const enCaseEntries = CASE_STUDIES.map((c) => ({
    url: `${base}/en/case-studies/${c.slug}`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: 'monthly' as const
  }));
  return [...staticEntries, ...serviceEntries, ...caseEntries, ...enServiceEntries, ...enCaseEntries];
}
