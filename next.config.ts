// next.config.js
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

// Simplified getRedirectionRules that doesn't use graphql-request
const getRedirectionRules = async () => {
  try {
    const query = `
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

    const response = await fetch(GQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const { data } = await response.json();

    if (!data || !data.publication) {
      console.error("Publication data not found");
      return [];
    }

    return data.publication.redirectionRules
      .filter((rule: { source: string | string[]; }) => !rule.source.includes("*"))
      .map((rule: { source: any; destination: any; type: string; }) => ({
        source: rule.source,
        destination: rule.destination,
        permanent: rule.type === "PERMANENT",
      }));
  } catch (error) {
    console.error("Error fetching redirection rules:", error);
    return [];
  }
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
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

module.exports = nextConfig;