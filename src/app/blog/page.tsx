"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useHashnodePosts } from "@/hooks";

const BlogPage = () => {
    const settings = {
        host: "s-soumyakanta.hashnode.dev",
        first: 6,
    };

    const { loading, error, posts, pageInfo, loadMorePost } = useHashnodePosts(settings);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const handleLoadMore = async () => {
        setIsLoadingMore(true);
        await loadMorePost();
        setIsLoadingMore(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                Latest Blog Posts
            </h1>

            {loading && !posts.length && (
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error.message}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((edge) => (
                    <Link
                        href={`/blog/${edge.node.slug}`}
                        key={edge.node.slug}
                        className="group transform hover:-translate-y-1 transition-all duration-300"
                    >
                        <article className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <img
                                    src={edge.node.coverImage.url}
                                    alt={edge.node.title}
                                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={edge.node.author.profilePicture}
                                        alt={edge.node.author.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">{edge.node.author.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(edge.node.publishedAt).toLocaleDateString()} · {edge.node.readTimeInMinutes} min read
                                        </p>
                                    </div>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                                    {edge.node.title}
                                </h2>
                                <p className="text-gray-600 line-clamp-3 mb-4">
                                    {edge.node.brief}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {edge.node.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
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

            {pageInfo.hasNextPage && (
                <div className="text-center mt-10">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 disabled:opacity-50"
                    >
                        {isLoadingMore ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading...
                            </span>
                        ) : (
                            'Load More Posts'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogPage;