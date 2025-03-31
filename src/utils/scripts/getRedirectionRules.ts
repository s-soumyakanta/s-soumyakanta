import { request, gql } from "graphql-request";

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;
const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;

export const getRedirectionRules = async () => {
    if (!GQL_ENDPOINT || !host) {
        throw new Error("Missing environment variables for Hashnode GraphQL.");
    }

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
        throw new Error("Invalid publication host.");
    }

    return data.publication.redirectionRules
        .filter((rule) => !rule.source.includes("*")) // ✅ Remove wildcard redirects
        .map((rule) => ({
            source: rule.source,
            destination: rule.destination,
            permanent: rule.type === "PERMANENT",
        }));
};
