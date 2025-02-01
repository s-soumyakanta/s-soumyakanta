"use client"

import React, { useState } from "react"
import Link from "next/link"
// If you have a Shadcn <Button> component:
import { Button } from "@/components/ui/button"
// Import your custom classNames helper from Shadcn if you have it:
import { cn } from "@/lib/utils"

// Import your existing hook
import { useHashnodePosts } from "@/hooks"

const BlogPage = () => {
    const settings = {
        host: "s-soumyakanta.hashnode.dev",
        first: 6,
    }

    const { loading, error, posts, pageInfo, loadMorePost } = useHashnodePosts(settings)
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    const handleLoadMore = async () => {
        setIsLoadingMore(true)
        await loadMorePost()
        setIsLoadingMore(false)
    }

    return (
        <div
            className={cn(
                // Container
                "container mx-auto px-4 py-8",
                // Shadcn color tokens that handle light/dark
                "bg-background text-foreground"
            )}
        >


            {/* Loading state (if no posts are yet loaded) */}
            {loading && !posts.length && (
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div
                    className={cn(
                        "p-4 my-4 border rounded",
                        // Shadcn "destructive" color for errors
                        "border-destructive text-destructive"
                    )}
                >
                    <strong className="font-bold">Error!</strong> {error.message}
                </div>
            )}

            {/* Post list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
                {posts.map((edge) => (
                    <Link
                        href={`/blog/${edge.node.slug}`}
                        key={edge.node.slug}
                        className="group transform hover:-translate-y-1 transition-all duration-300"
                    >
                        <article
                            className={cn(
                                "rounded-lg shadow overflow-hidden h-full",
                                // Shadcn "card" colors for consistent backgrounds in light/dark
                                "bg-card text-card-foreground"
                            )}
                        >
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <img
                                    src={edge.node.coverImage.url}
                                    alt={edge.node.title}
                                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                {/* Author info */}
                                <div className="flex items-center mb-4">
                                    <img
                                        src={edge.node.author.profilePicture}
                                        alt={edge.node.author.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium">
                                            {edge.node.author.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(edge.node.publishedAt).toLocaleDateString()} ·{" "}
                                            {edge.node.readTimeInMinutes} min read
                                        </p>
                                    </div>
                                </div>

                                {/* Post title */}
                                <h2
                                    className={cn(
                                        "text-xl font-semibold mb-2 line-clamp-2",
                                        // Hover color in Shadcn is typically "text-primary"
                                        "group-hover:text-primary"
                                    )}
                                >
                                    {edge.node.title}
                                </h2>

                                {/* Post brief */}
                                <p
                                    className={cn(
                                        "text-sm mb-4 line-clamp-3",
                                        "text-muted-foreground"
                                    )}
                                >
                                    {edge.node.brief}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {edge.node.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag.id}
                                            className={cn(
                                                "px-2 py-1 text-xs rounded-full",
                                                // Shadcn "secondary" color
                                                "bg-secondary text-secondary-foreground"
                                            )}
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {/* If there's another page to fetch */}
            {pageInfo.hasNextPage && (
                <div className="text-center mt-10">
                    <Button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="px-6 py-3"
                    >
                        {isLoadingMore ? "Loading..." : "Load More Posts"}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default BlogPage
