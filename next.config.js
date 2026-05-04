/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' }
    ]
  },
  experimental: { optimizePackageImports: ['lucide-react'] },
  async redirects() {
    return [
      // Service slug rename — Session 8 (Build. Automate. Create. positioning)
      { source: '/services/strategy', destination: '/services/build', permanent: true },
      { source: '/services/operate', destination: '/services/automate', permanent: true },
      { source: '/en/services/strategy', destination: '/en/services/build', permanent: true },
      { source: '/en/services/operate', destination: '/en/services/automate', permanent: true },
      // Case-study slug rename — Session 10 (forge truth alignment)
      { source: '/case-studies/vt-dream-homes', destination: '/case-studies/vungtauland', permanent: true },
      { source: '/case-studies/long-sang-forge', destination: '/case-studies/ainewbievn', permanent: true },
      { source: '/en/case-studies/vt-dream-homes', destination: '/en/case-studies/vungtauland', permanent: true },
      { source: '/en/case-studies/long-sang-forge', destination: '/en/case-studies/ainewbievn', permanent: true }
    ];
  }
};

module.exports = nextConfig;
