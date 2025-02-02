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
    loadMorePost: () => void;
}

export function useHashnodePosts(
    settings: UseHashnodePostsSettings
): UseHashnodePostsReturn {
    const [pageInfo, setPageInfo] = useState<PageInfo>({ hasNextPage: false });
    const [posts, setPosts] = useState<PostEdge[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [totalDocs, setTotalDocs] = useState<number>(0);

    const { host, first = 10, endCursor } = settings;

    const fetchPosts = useCallback(
        async (loadMore: boolean) => {
            try {
                setLoading(true);
                const data: PostsData | undefined = await getAllPosts(
                    host,
                    first,
                    loadMore ? pageInfo.endCursor : endCursor
                );
                if (data) {
                    setPageInfo(data.pageInfo);
                    setTotalDocs(data.totalDocuments ?? 0);

                    setPosts((prev) => (loadMore ? [...prev, ...data.edges] : data.edges));
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            } finally {
                setLoading(false);
            }
        },
        [host, first, endCursor, pageInfo.endCursor]
    );

    useEffect(() => {
        fetchPosts(false);
    }, [host, first, fetchPosts]);

    const loadMorePost = useCallback(() => {
        if (pageInfo.hasNextPage && pageInfo.endCursor) {
            fetchPosts(true);
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
