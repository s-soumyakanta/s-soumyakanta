import { gql, GraphQLClient } from "graphql-request";
import { getClient } from "../lib/graphQLClient";

// Define interfaces for the GraphQL response structure

interface Author {
  name: string;
  profilePicture: string;
}

interface CoverImage {
  url: string;
}

interface Tag {
  name: string;
  slug: string;
  id: string;
}

export interface Post {
  author: Author;
  title: string;
  subtitle: string;
  brief: string;
  slug: string;
  coverImage: CoverImage;
  tags: Tag[];
  publishedAt: string;
  readTimeInMinutes: number;
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

interface PostEdge {
  node: Post;
}

export interface PostsData {
  totalDocuments: number;
  pageInfo: PageInfo;
  edges: PostEdge[];
}

interface Publication {
  title: string;
  posts: PostsData;
}

interface AllPostsResponse {
  publication: Publication;
}

// Convert getAllPosts to TypeScript with typed parameters and return value.
export const getAllPosts = async (
  host: string,
  first: number = 10,
  endCursor?: string,
  tags?: string[] // Adjust this type if ObjectId is not a string
): Promise<PostsData | undefined> => {
  const client: GraphQLClient = getClient();

  const data = await client.request<AllPostsResponse>(
    gql`
      query allPosts(
        $first: Int!
        $host: String
        $endCursor: String
        $tags: [ObjectId!]
      ) {
        publication(host: $host) {
          title
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
              }
            }
          }
        }
      }
    `,
    {
      first,
      host,
      endCursor,
      tags,
    }
  );

  return data?.publication?.posts;
};
