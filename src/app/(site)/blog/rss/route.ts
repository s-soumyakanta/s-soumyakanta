// app/blog/rss/route.ts
import { constructRSSFeedFromPosts } from '@/utils/feed';
import request from 'graphql-request';
import { RssFeedDocument, RssFeedQuery, RssFeedQueryVariables } from '@/generated/graphql';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

export async function GET(req: Request) {
    try {
        // Get the URL to parse search params
        const url = new URL(req.url);
        const after = url.searchParams.get('after');

        // Make sure we have the GraphQL endpoint
        if (!GQL_ENDPOINT) {
            console.error('GraphQL endpoint not defined');
            return new Response("Server configuration error", { status: 500 });
        }

        const data = await request<RssFeedQuery, RssFeedQueryVariables>(
            GQL_ENDPOINT,
            RssFeedDocument,
            {
                first: 20,
                host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
                after,
            }
        );

        const publication = data.publication;
        if (!publication) {
            console.error('Publication not found');
            return new Response("Publication not found", { status: 404 });
        }

        const allPosts = publication.posts.edges.map((edge) => ({
            ...edge.node,
            tags: edge.node.tags ?? [],
            publishedAt: 'publishedAt' in edge.node && typeof edge.node.publishedAt === 'string'
                ? edge.node.publishedAt
                : new Date().toISOString(),
        }));

        const xml = constructRSSFeedFromPosts(
            {
                ...publication,
                preferences: {
                    ...publication.preferences,
                    logo: publication.preferences?.logo ?? '',
                },
            },
            allPosts,
            after,
            publication.posts.pageInfo.hasNextPage && publication.posts.pageInfo.endCursor
                ? publication.posts.pageInfo.endCursor
                : null,
        );

        return new Response(xml, {
            headers: {
                'Content-Type': 'text/xml',
                'Cache-Control': 's-maxage=1, stale-while-revalidate',
            },
        });
    } catch (error) {
        console.error('Error generating RSS feed:', error);
        return new Response("Error generating RSS feed", { status: 500 });
    }
}