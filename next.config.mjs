/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: "/blog",
            destination: "https://starter-kit-plum.vercel.app/blog",
          },
          {
            source: "/blog/:path*",
            destination: "https://starter-kit-plum.vercel.app/blog/:path*",
          },
        ];
      },
};

export default nextConfig;
