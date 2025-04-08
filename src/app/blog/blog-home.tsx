"use client";

import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { request } from 'graphql-request';
import Head from 'next/head';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { AppProvider } from '@/components/contexts/appContext';
import { HeroPost } from '@/components/hero-post';
import { ArticleSVG, ChevronDownSVG } from '@/components/icons';
import { Layout } from '@/components/layout';
import { MorePosts } from '@/components/more-posts';
import { Navbar } from '@/components/navbar';
import { SecondaryPost } from '@/components/secondary-post';
import {
    MorePostsByPublicationDocument,
    MorePostsByPublicationQuery,
    PublicationFragment,
    PostFragment,
    PageInfo,
} from '@/generated/graphql';
import { DEFAULT_COVER } from '@/utils/const';
import dynamic from 'next/dynamic';

// Define props interface
interface BlogHomeProps {
    publication: PublicationFragment;
    initialAllPosts: PostFragment[];
    initialPageInfo: PageInfo;
}

// Dynamic import with proper loading placeholder
const SubscribeForm = dynamic(
    () => import('@/components/subscribe-form').then((mod) => mod.SubscribeForm),
    {
        ssr: false,
        loading: () => <div className="w-full py-8 text-center">Loading subscription form...</div>
    }
);

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT as string;

export default function BlogHome({ publication, initialAllPosts, initialPageInfo }: BlogHomeProps) {
    // Use useEffect to set the state after initial render to avoid hydration mismatch
    const [allPosts, setAllPosts] = useState<PostFragment[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
    const [loadedMore, setLoadedMore] = useState<boolean>(false);
    const [isClient, setIsClient] = useState(false);

    // Set up InView hook for infinite scrolling
    const { ref, inView } = useInView({ threshold: 0.1 });

    // Initialize state with props after component mounts
    useEffect(() => {
        setAllPosts(initialAllPosts);
        setPageInfo(initialPageInfo);
        setIsClient(true);
    }, [initialAllPosts, initialPageInfo]);

    const loadMore = useCallback(async () => {
        if (!pageInfo?.hasNextPage || !pageInfo?.endCursor) return;

        try {
            const data = await request<MorePostsByPublicationQuery>(
                GQL_ENDPOINT,
                MorePostsByPublicationDocument,
                {
                    first: 10,
                    host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST as string,
                    after: pageInfo.endCursor,
                }
            );

            if (!data.publication) return;

            const newPosts = data.publication.posts.edges.map((edge) => edge.node);
            setAllPosts((prevPosts: PostFragment[]) => [...prevPosts, ...newPosts]);
            setPageInfo(data.publication.posts.pageInfo);
            setLoadedMore(true);
        } catch (error) {
            console.error("Error loading more posts:", error);
        }
    }, [pageInfo]);

    useEffect(() => {
        if (inView && pageInfo?.hasNextPage) {
            loadMore();
        }
    }, [inView, loadMore, pageInfo?.hasNextPage]);

    // Only render client-side content after hydration
    if (!isClient) {
        return (
            <AppProvider publication={publication}>
                <Layout>
                    <Container className="flex flex-col items-stretch gap-10 px-5 pb-10 mt-20">
                        <Navbar />
                        <div className="min-h-screen"></div>
                    </Container>
                </Layout>
            </AppProvider>
        );
    }

    return (
        <AppProvider publication={publication}>
            <Layout>
                <Head>
                    <title>{publication.displayTitle || publication.title || 'S Soumyakanta'}</title>
                </Head>
                <Container className="flex flex-col items-stretch gap-10 px-5 pb-10 mt-20">
                    <Navbar />
                    {allPosts.length === 0 ? (
                        <div className="grid grid-cols-1 py-20 lg:grid-cols-3">
                            <div className="col-span-1 flex flex-col items-center gap-5 text-center text-slate-700 dark:text-neutral-400 lg:col-start-2">
                                <div className="w-20">
                                    <ArticleSVG className="stroke-current" />
                                </div>
                                <p className="text-xl font-semibold">Hang tight! We're drafting the first article.</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid items-start gap-6 xl:grid-cols-2">
                                <div className="col-span-1">
                                    {allPosts[0] && (
                                        <HeroPost
                                            title={allPosts[0].title}
                                            coverImage={allPosts[0].coverImage?.url || DEFAULT_COVER}
                                            date={allPosts[0].publishedAt}
                                            slug={allPosts[0].slug}
                                            excerpt={allPosts[0].brief}
                                        />
                                    )}
                                </div>
                                <div className="col-span-1 flex flex-col gap-6">
                                    {allPosts.slice(1, 4).map((post) => (
                                        <SecondaryPost
                                            key={post.id}
                                            title={post.title}
                                            coverImage={post.coverImage?.url || DEFAULT_COVER}
                                            date={post.publishedAt}
                                            slug={post.slug}
                                            excerpt={post.brief}
                                        />
                                    ))}
                                </div>
                            </div>
                            {allPosts.length > 4 && <MorePosts context="home" posts={allPosts.slice(4)} />}
                            {!loadedMore && pageInfo?.hasNextPage && pageInfo?.endCursor && (
                                <div className="flex w-full flex-row items-center justify-center">
                                    <Button
                                        onClick={loadMore}
                                        type="outline"
                                        icon={<ChevronDownSVG className="h-5 w-5 stroke-current" />}
                                        label="Load more posts"
                                    />
                                </div>
                            )}
                            {loadedMore && pageInfo?.hasNextPage && pageInfo?.endCursor && (
                                <div ref={ref} className="h-10" />
                            )}
                        </>
                    )}
                    <SubscribeForm />
                </Container>
            </Layout>
        </AppProvider>
    );
}