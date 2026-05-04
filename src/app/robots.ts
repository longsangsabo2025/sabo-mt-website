import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/portal'] }],
    sitemap: 'https://sabo.com.vn/sitemap.xml'
  };
}
