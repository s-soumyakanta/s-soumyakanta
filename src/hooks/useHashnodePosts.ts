"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllPosts, PostsData, PostEdge, PageInfo } from "@/queries/blog-data";

interface UseHashnodePostsSettings {
    host: string;
    first?: number;
    endCursor?: string;
}

interface UseHashnodePostsReturn {
    loading: boolean;
    error: Error | null;
    posts: PostEdge[];
    totalDocs: number;
    pageInfo: PageInfo;
    loadMorePost: () => Promise<void>;
}

export function useHashnodePosts(settings: UseHashnodePostsSettings): UseHashnodePostsReturn {
    const [pageInfo, setPageInfo] = useState<PageInfo>({ hasNextPage: false, endCursor: undefined });
    const [posts, setPosts] = useState<PostEdge[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [totalDocs, setTotalDocs] = useState<number>(0);

    const { host, first = 10 } = settings;

    const fetchPosts = useCallback(
        async (loadMore: boolean) => {
            try {
                setLoading(true);

                const data: PostsData | undefined = await getAllPosts(
                    host,
                    first,
                    loadMore ? pageInfo.endCursor ?? undefined : undefined // Convert null to undefined
                );

                if (data) {
                    setPageInfo({
                        hasNextPage: data.pageInfo.hasNextPage,
                        endCursor: data.pageInfo.endCursor ?? undefined, // Convert null to undefined
                    });

                    setTotalDocs(data.totalDocuments ?? 0);

                    setPosts((prev) =>
                        loadMore ? [...prev, ...data.edges] : data.edges
                    );
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            } finally {
                setLoading(false);
            }
        },
        [host, first, pageInfo.endCursor]
    );

    useEffect(() => {
        fetchPosts(false);
    }, [host, first]);

    const loadMorePost = useCallback(async () => {
        if (pageInfo.hasNextPage && pageInfo.endCursor) {
            await fetchPosts(true);
        }
    }, [pageInfo.hasNextPage, pageInfo.endCursor, fetchPosts]);

    return {
        loading,
        error,
        posts,
        totalDocs,
        pageInfo,
        loadMorePost,
    };
}
