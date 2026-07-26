// next.config.js

/**
 * @type {import('next').NextConfig}
 */
// Applied to every route. Deliberately no script-src CSP here: the app ships
// Next.js inline bootstrap and @next/third-parties tags, so a policy strict
// enough to be worth having needs nonces wired through first. frame-ancestors
// is safe to set now and is the half that actually stops clickjacking.
const securityHeaders = [
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // The contact endpoint should never be cached or read cross-origin.
        source: "/api/send",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Redirect non-www to www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "s-soumyakanta.com", // non-www version
          },
        ],
        destination: "https://www.s-soumyakanta.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
