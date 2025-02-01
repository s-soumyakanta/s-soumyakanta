"use client";

import React from 'react';
import { useHashnodePostDetails } from "@/hooks";
import { useParams } from "next/navigation";

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const settings = {
        host: "s-soumyakanta.hashnode.dev",
        slug,
    };

    const { loading, error, post } = useHashnodePostDetails(settings);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error.message}</span>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Notice:</strong>
                    <span className="block sm:inline"> No post found.</span>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="w-full bg-gradient-to-b from-blue-900 to-blue-800 text-white">
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {post.title}
                    </h1>
                    {post.subtitle && (
                        <p className="text-xl text-blue-100 mb-6">
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
                            <div className="text-sm text-blue-100">
                                {new Date(post.publishedAt).toLocaleDateString()} · {post.readTimeInMinutes} min read
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Cover Image */}
                <div className="mb-8 -mt-20 rounded-lg overflow-hidden shadow-xl">
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
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>

                {/* Article Content */}
                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content.html }}
                />
            </div>
        </article>
    );
};

export default BlogPostPage;