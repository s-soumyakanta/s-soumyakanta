// next.config.js

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
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
