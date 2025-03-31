import { createRequire } from "module";
const require = createRequire(import.meta.url);

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
  // Import your own wrapper instead of directly from graphql-request
  const { gql } = await import("./resolve-graphql-request.js");

  // Use fetch API directly instead of relying on request from graphql-request
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

  const response = await fetch(GQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  const data = await response.json();

  if (!data.data || !data.data.publication) {
    throw new Error("Please ensure you have set the env var NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST correctly.");
  }

  return data.data.publication.redirectionRules
    .filter((rule: { source: string | string[]; }) => !rule.source.includes("*"))
    .map((rule: { source: any; destination: any; type: string; }) => ({
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
  webpack: (config: { resolve: { alias: { [x: string]: string; }; }; }, { isServer }: any) => {
    // Add resolver for graphql-request
    config.resolve.alias['graphql-request'] = require.resolve('./resolve-graphql-request.js');
    return config;
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
    try {
      return await getRedirectionRules();
    } catch (error) {
      console.error("Error getting redirection rules:", error);
      return [];
    }
  },
};

export default config;