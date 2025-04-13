// app/client-blog-content.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { request } from 'graphql-request';
import { Button } from '@/components/button';
import { ChevronDownSVG } from '@/components/icons';
import { MorePosts } from '@/components/more-posts';
import {
    MorePostsByPublicationDocument,
    MorePostsByPublicationQuery,
    PostFragment,
    PageInfo,
} from '@/generated/graphql';
import dynamic from 'next/dynamic';

// Define props interface
interface ClientBlogContentProps {
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

export default function ClientBlogContent({ initialAllPosts, initialPageInfo }: ClientBlogContentProps) {
    // State setup
    const [allPosts, setAllPosts] = useState<PostFragment[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
    const [loadedMore, setLoadedMore] = useState<boolean>(false);

    // Set up InView hook for infinite scrolling
    const { ref, inView } = useInView({ threshold: 0.1 });

    // Initialize state with props after component mounts
    useEffect(() => {
        setAllPosts(initialAllPosts);
        setPageInfo(initialPageInfo);
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

    // Only render additional posts loaded client-side
    const additionalPosts = allPosts.slice(initialAllPosts.length);

    return (
        <>
            {additionalPosts.length > 0 && <MorePosts context="home" posts={additionalPosts} />}

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

            <SubscribeForm />
        </>
    );
}