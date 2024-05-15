/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/blog",
        destination: "https://starter-kit-xi.vercel.app/blog",
      },
      {
        source: "/blog/:path*",
        destination: "https://starter-kit-xi.vercel.app/blog/:path*",
      },
      {
        source: "/pdfreader",
        destination: "https://pdfreader-teal.vercel.app",
      },

    ];
  }
}


module.exports = nextConfig

