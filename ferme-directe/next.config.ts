/** @type {import('next').NextConfig} */
const nextConfig = {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Optimisation images
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.stripe.com',
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Headers de sécurité
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      {
        // Disable body parsing pour les webhooks Stripe (signature verification)
        source: '/api/stripe/webhooks',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Redirections
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  async redirects() {
    return [
      {
        source: '/shop',
        destination: '/boutique',
        permanent: true,
      },
      {
        source: '/farm',
        destination: '/notre-ferme',
        permanent: true,
      },
    ];
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Performance
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  compress: true,
  poweredByHeader: false,

  // Allow build even with TS errors during development
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
