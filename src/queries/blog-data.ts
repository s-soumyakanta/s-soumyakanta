import { gql, GraphQLClient } from "graphql-request";
import { getClient } from "../lib/graphQLClient";

export interface Author {
  name: string;
  profilePicture: string;
}

export interface CoverImage {
  url: string;
}

export interface Tag {
  name: string;
  slug: string;
  id: string;
}

export interface SinglePost {
  author: Author;
  title: string;
  subtitle: string;
  brief: string;
  slug: string;
  coverImage: CoverImage;
  tags: Tag[];
  publishedAt: string;
  readTimeInMinutes: number;
  content: { html: string };
}

export interface PostEdge {
  node: SinglePost;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor?: string;
}

export interface PostsData {
  totalDocuments: number;
  pageInfo: PageInfo;
  edges: PostEdge[];
}

export const getAllPosts = async (
  host: string,
  first: number = 10,
  endCursor?: string,
  tags?: string[]
): Promise<PostsData | undefined> => {
  const client: GraphQLClient = getClient();

  const data = await client.request<{ publication: { posts: PostsData } }>(
    gql`
      query allPosts(
        $first: Int!
        $host: String
        $endCursor: String
        $tags: [ObjectId!]
      ) {
        publication(host: $host) {
          posts(first: $first, after: $endCursor, filter: { tags: $tags }) {
            totalDocuments
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                author {
                  name
                  profilePicture
                }
                title
                subtitle
                brief
                slug
                coverImage {
                  url
                }
                tags {
                  name
                  slug
                  id
                }
                publishedAt
                readTimeInMinutes
                content {
                  html
                }
              }
            }
          }
        }
      }
    `,
    { first, host, endCursor, tags }
  );

  return data.publication?.posts;
};

export const getPost = async (host: string, slug: string): Promise<SinglePost | null> => {
  const client: GraphQLClient = getClient();

  const data = await client.request<{ publication: { post: SinglePost } }>(
    gql`
      query postDetails($host: String, $slug: String!) {
        publication(host: $host) {
          post(slug: $slug) {
            author {
              name
              profilePicture
            }
            publishedAt
            title
            subtitle
            readTimeInMinutes
            content {
              html
            }
            tags {
              name
              slug
              id
            }
            coverImage {
              url
            }
          }
        }
      }
    `,
    { host, slug }
  );

  return data.publication?.post || null;
};
