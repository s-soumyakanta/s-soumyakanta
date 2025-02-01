"use client";

import { useHashnodePosts } from "@/hooks";
import Link from "next/link";
import { useState } from "react";

export default function BlogPage() {
    const settings = {
        host: "s-soumyakanta.hashnode.dev",
        first: 5,
    };

    const { loading, error, posts, pageInfo, loadMorePost } = useHashnodePosts(settings);

    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const handleLoadMore = async () => {
        setIsLoadingMore(true);
        await loadMorePost();
        setIsLoadingMore(false);
    };

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Posts from {settings.host}</h1>

            {loading && !posts.length && <p>Loading posts...</p>}
            {error && <p style={{ color: "red" }}>Error fetching posts: {error.message}</p>}

            <ul style={{ listStyle: "none", padding: 0 }}>
                {posts.map((edge) => (
                    <li key={edge.node.slug} style={{ marginBottom: "1rem" }}>
                        <h2>
                            <Link href={`/blog/${edge.node.slug}`} style={{ textDecoration: "none", color: "blue" }}>
                                {edge.node.title}
                            </Link>
                        </h2>
                        <p>{edge.node.brief}</p>
                    </li>
                ))}
            </ul>

            {pageInfo.hasNextPage && (
                <button
                    onClick={handleLoadMore}
                    style={{ padding: "0.5rem", backgroundColor: "blue", color: "white" }}
                    disabled={isLoadingMore}
                >
                    {isLoadingMore ? "Loading..." : "Load More"}
                </button>
            )}
        </div>
    );
}
