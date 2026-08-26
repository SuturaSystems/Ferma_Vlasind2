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
  // Headers de sécurité (OWASP Hardened)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // ── Anti-clickjacking ──
          { key: 'X-Frame-Options', value: 'DENY' },

          // ── Anti-MIME sniffing ──
          { key: 'X-Content-Type-Options', value: 'nosniff' },

          // ── Referrer minimal (ne pas leaker l'URL Stripe) ──
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

          // ── HSTS : force HTTPS pendant 1 an (à activer en prod) ──
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },

          // ── Content Security Policy (strict, autorise Stripe) ──
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://js.stripe.com https://fonts.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.stripe.com",
              "connect-src 'self' https://api.stripe.com https://checkout.stripe.com",
              "frame-src https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self' https://checkout.stripe.com",
              "upgrade-insecure-requests",
            ].join('; '),
          },

          // ── Permissions Browser API : désactiver ce qu'on n'utilise pas ──
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'browsing-topics=()',
              'payment=(self "https://js.stripe.com")',
            ].join(', '),
          },

          // ── Cross-Origin Policies ──
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },

          // ── Ne pas envoyer X-Powered-By (redondant mais explicite) ──
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      {
        // Webhooks Stripe : jamais en cache, jamais en CDN
        source: '/api/stripe/webhooks',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
        ],
      },
      {
        // API routes : jamais en cache
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
          { key: 'X-Robots-Tag', value: 'noindex' },
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
  // Performance & Durcissement
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  compress: true,
  poweredByHeader: false,

  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

