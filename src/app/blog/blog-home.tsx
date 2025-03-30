"use client";

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import request from 'graphql-request';
import Head from 'next/head';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { AppProvider } from '@/components/contexts/appContext';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { HeroPost } from '@/components/hero-post';
import { ArticleSVG, ChevronDownSVG } from '@/components/icons';
import { Layout } from '@/components/layout';
import { MorePosts } from '@/components/more-posts';
import { Navbar } from '@/components/navbar';
import { SecondaryPost } from '@/components/secondary-post';
import {
    MorePostsByPublicationDocument,
    MorePostsByPublicationQuery,
    MorePostsByPublicationQueryVariables,
    PageInfo,
    PostFragment,
    PublicationFragment,
} from '@/generated/graphql';
import { DEFAULT_COVER } from '@/utils/const';
import dynamic from 'next/dynamic';

const SubscribeForm = dynamic(() =>
    import('@/components/subscribe-form').then((mod) => mod.SubscribeForm),
);

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

type Props = {
    publication: PublicationFragment;
    initialAllPosts: PostFragment[];
    initialPageInfo: PageInfo;
};

export default function BlogHome({ publication, initialAllPosts, initialPageInfo }: Props) {
    const [allPosts, setAllPosts] = useState<PostFragment[]>(initialAllPosts);
    const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);
    const [loadedMore, setLoadedMore] = useState(false);

    // Hook for infinite scrolling
    const { ref, inView } = useInView({
        triggerOnce: false, // Keep triggering when visible
        threshold: 0.1, // Trigger when 10% is visible
    });

    // Load more posts function
    const loadMore = async () => {
        const data = await request<MorePostsByPublicationQuery, MorePostsByPublicationQueryVariables>(
            GQL_ENDPOINT,
            MorePostsByPublicationDocument,
            {
                first: 10,
                host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
                after: pageInfo.endCursor,
            },
        );
        if (!data.publication) {
            return;
        }
        const newPosts = data.publication.posts.edges.map((edge) => edge.node);
        setAllPosts([...allPosts, ...newPosts]);
        setPageInfo(data.publication.posts.pageInfo);
        setLoadedMore(true);
    };

    // Trigger loadMore when inView is true
    useEffect(() => {
        if (inView) {
            loadMore();
        }
    }, [inView]); // Dependency array ensures it runs only when `inView` changes

    return (
        <AppProvider publication={publication}>
            <Layout>
                <Head>
                    <title>{publication.displayTitle || publication.title || 'S Soumyakanta'}</title>
                </Head>
                {/* <Header /> */}
                <Container className="flex flex-col items-stretch gap-10 px-5 pb-10 mt-20">
                    <Navbar />

                    {allPosts.length === 0 && (
                        <div className="grid grid-cols-1 py-20 lg:grid-cols-3">
                            <div className="col-span-1 flex flex-col items-center gap-5 text-center text-slate-700 dark:text-neutral-400 lg:col-start-2">
                                <div className="w-20">
                                    <ArticleSVG className="stroke-current" />
                                </div>
                                <p className="text-xl font-semibold">Hang tight! We&apos;re drafting the first article.</p>
                            </div>
                        </div>
                    )}

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

                    {!loadedMore && pageInfo.hasNextPage && pageInfo.endCursor && (
                        <div className="flex w-full flex-row items-center justify-center">
                            <Button
                                onClick={loadMore}
                                type="outline"
                                icon={<ChevronDownSVG className="h-5 w-5 stroke-current" />}
                                label="Load more posts"
                            />
                        </div>
                    )}

                    {loadedMore && pageInfo.hasNextPage && pageInfo.endCursor && (
                        <div ref={ref} className="h-10"></div>
                    )}
                    <SubscribeForm />
                </Container>
            </Layout>
        </AppProvider>
    );
}
