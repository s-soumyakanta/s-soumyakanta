import { request } from 'graphql-request';
import Link from 'next/link';
import { Metadata } from 'next';
import { resizeImage } from '@/utils/image';
import { DEFAULT_COVER } from '@/utils/const';
import { CoverImage } from '@/components/cover-image';
import { DateFormatter } from '@/components/date-formatter';
import { Breadcrumb } from '@/components/Breadcrumb';


export const metadata: Metadata = {
    title: 'All Series - Blog',
};

const GET_SERIES_QUERY = `
  query GetSeries($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      posts(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            series {
              id
              name
              slug
              description {
                text
              }
              coverImage
              createdAt
            }
          }
        }
      }
    }
  }
`;

async function fetchAllPosts(host: string) {
    let allPosts: any[] = [];
    let hasNextPage = true;
    let after: string | null = null;

    while (hasNextPage) {
        const data: any = await request(
            process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!,
            GET_SERIES_QUERY,
            {
                host,
                first: 50,
                after,
            }
        );

        const posts = data.publication?.posts.edges || [];
        allPosts = [...allPosts, ...posts];

        hasNextPage = data.publication?.posts.pageInfo.hasNextPage || false;
        after = data.publication?.posts.pageInfo.endCursor || null;
    }

    return allPosts;
}

interface SeriesData {
    id: string;
    name: string;
    slug: string;
    description?: {
        text?: string;
    };
    coverImage?: string;
    createdAt?: string;
    postCount: number;
}

export default async function SeriesPage() {
    try {
        const allPosts = await fetchAllPosts(process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST!);
        const seriesMap = new Map<string, SeriesData>();

        allPosts.forEach((post: any) => {
            if (post.node.series) {
                const series = post.node.series;
                if (!seriesMap.has(series.slug)) {
                    seriesMap.set(series.slug, {
                        ...series,
                        postCount: 1,
                    });
                } else {
                    const existingSeries = seriesMap.get(series.slug)!;
                    existingSeries.postCount += 1;
                }
            }
        });

        const series = Array.from(seriesMap.values());

        return (
            <div className="max-w-6xl px-4 py-8 mx-auto mt-20">

                <h1 className="text-3xl font-bold mb-6">All Series</h1>
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: 'Home', href: '/' },
                        { name: 'Blog', href: '/blog' },
                        { name: 'Series' },
                    ]}
                />

                {series.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {series.map(seriesItem => {
                            const cover = resizeImage(seriesItem.coverImage, { w: 1600, h: 840, c: 'thumb' }, DEFAULT_COVER);

                            return (
                                <Link key={seriesItem.slug} href={`/blog/series/${seriesItem.slug}`}>
                                    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-neutral-700">
                                        <CoverImage
                                            title={seriesItem.name}
                                            src={cover}
                                            slug={`series/${seriesItem.slug}`}
                                        />

                                        <div className="p-4">
                                            <h2 className="text-xl font-bold text-slate-900 dark:text-neutral-50 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {seriesItem.name}
                                            </h2>

                                            {seriesItem.description?.text && (
                                                <p className="text-slate-600 dark:text-neutral-400 text-sm mb-3 line-clamp-3">
                                                    {seriesItem.description.text.length > 150
                                                        ? `${seriesItem.description.text.substring(0, 150)}...`
                                                        : seriesItem.description.text}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-500">
                                                <span className="bg-blue-100 dark:bg-white text-blue-800 dark:text-black px-2 py-1 rounded">
                                                    {seriesItem.postCount} posts
                                                </span>
                                                {seriesItem.createdAt && (
                                                    <span>
                                                        <DateFormatter dateString={seriesItem.createdAt} />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="max-w-md mx-auto">
                            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-900 rounded-lg p-8">
                                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-neutral-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-neutral-100 mb-2">
                                    No Series Found
                                </h3>
                                <p className="text-gray-600 dark:text-neutral-400">
                                    There are currently no series available. Check back later!
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        );
    } catch (error) {
        console.error('Error fetching series:', error);
        return (
            <div className="max-w-6xl px-4 py-8 mx-auto">
                <h1 className="text-3xl font-bold mb-6">All Series</h1>
                <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
                            <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
                                Unable to Load Series
                            </h3>
                            <p className="text-red-600 dark:text-red-300">
                                There was an error loading the series. Please try again later.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
