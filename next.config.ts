import { createRequire } from "module";
const require = createRequire(import.meta.url); // ✅ Fix CommonJS + ESM issue

const ANALYTICS_BASE_URL = "https://hn-ping2.hashnode.com";
const HASHNODE_ADVANCED_ANALYTICS_URL = "https://user-analytics.hashnode.com";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;
const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;

const getBasePath = () => {
  if (BASE_URL && BASE_URL.indexOf("/") !== -1) {
    return BASE_URL.substring(BASE_URL.indexOf("/"));
  }
  return undefined;
};

const getRedirectionRules = async () => {
  const { request, gql } = await import("graphql-request"); // ✅ Dynamic Import Fix

  const query = gql`
    query GetRedirectionRules {
      publication(host: "${host}") {
        id
        redirectionRules {
          source
          destination
          type
        }
      }
    }
  `;

  const data = (await request(GQL_ENDPOINT, query)) as {
    publication?: { id: string; redirectionRules: { source: string; destination: string; type: string }[] };
  };

  if (!data.publication) {
    throw new Error("Please ensure you have set the env var NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST correctly.");
  }

  return data.publication.redirectionRules
    .filter((rule) => !rule.source.includes("*")) // ✅ Remove wildcard redirects (Next.js doesn't support them)
    .map((rule) => ({
      source: rule.source,
      destination: rule.destination,
      permanent: rule.type === "PERMANENT",
    }));
};

/**
 * @type {import('next').NextConfig}
 */
const config = {
  transpilePackages: ["@/utils"],
  basePath: getBasePath(),
  experimental: {
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/ping/data-event",
        destination: `${ANALYTICS_BASE_URL}/api/data-event`,
      },
      {
        source: "/api/analytics",
        destination: `${HASHNODE_ADVANCED_ANALYTICS_URL}/api/analytics`,
      },
    ];
  },
  async redirects() {
    return await getRedirectionRules();
  },
};

export default config; // ✅ Use ESM export
