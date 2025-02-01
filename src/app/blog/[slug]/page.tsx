"use client"

import React from "react"
import { useHashnodePostDetails } from "@/hooks"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>()
    const settings = {
        host: "s-soumyakanta.hashnode.dev",
        slug,
    }

    const { loading, error, post } = useHashnodePostDetails(settings)

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div
                className={cn(
                    "container mx-auto px-4 py-8",
                    "bg-background text-foreground"
                )}
            >
                <div
                    className={cn(
                        "p-4 my-4 border rounded",
                        "border-destructive text-destructive"
                    )}
                >
                    <strong className="font-bold">Error!</strong> {error.message}
                </div>
            </div>
        )
    }

    if (!post) {
        return (
            <div
                className={cn(
                    "container mx-auto px-4 py-8",
                    "bg-background text-foreground"
                )}
            >
                <div className="p-4 my-4 border rounded text-warning border-warning">
                    <strong className="font-bold">Notice:</strong> No post found.
                </div>
            </div>
        )
    }

    return (
        <article
            className={cn(
                "min-h-screen",
                "bg-background text-foreground mt-8"
            )}
        >
            {/* Hero Section */}
            <div
                className={cn(
                    "w-full text-white mb-8",
                    "bg-primary"
                )}
            >
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {post.title}
                    </h1>
                    {post.subtitle && (
                        <p className="text-xl text-primary-foreground/80 mb-6">
                            {post.subtitle}
                        </p>
                    )}
                    <div className="flex items-center space-x-4">
                        <img
                            src={post.author.profilePicture}
                            alt={post.author.name}
                            className="w-12 h-12 rounded-full border-2 border-white"
                        />
                        <div>
                            <p className="font-medium">{post.author.name}</p>
                            <div className="text-sm text-primary-foreground/80">
                                {new Date(post.publishedAt).toLocaleDateString()} ·{" "}
                                {post.readTimeInMinutes} min read
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 pb-16 max-w-4xl">
                {/* Cover Image */}
                <div className="mb-8 rounded-lg overflow-hidden shadow">
                    <img
                        src={post.coverImage.url}
                        alt={post.title}
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map((tag) => (
                        <span
                            key={tag.id}
                            className={cn(
                                "px-3 py-1 rounded-full text-sm",
                                "bg-secondary text-secondary-foreground"
                            )}
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>

                {/* Post Content */}
                <div
                    className={cn(
                        // Use Shadcn’s "prose" classes + dark mode inversion
                        "prose dark:prose-invert max-w-none"
                    )}
                    dangerouslySetInnerHTML={{ __html: post.content.html }}
                />
            </div>
        </article>
    )
}

export default BlogPostPage
