"use client";

import { useHashnodePostDetails } from "@/hooks";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();

    const settings = {
        host: "s-soumyakanta.hashnode.dev",
        slug,
    };

    const { loading, error, post } = useHashnodePostDetails(settings);

    if (loading) return <p>Loading post details...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;
    if (!post) return <p>No post found.</p>;

    return (
        <div style={{ padding: "1rem", maxWidth: "800px", margin: "auto" }}>
            <h1>{post.title}</h1>
            <p><strong>Author:</strong> {post.author.name}</p>
            <p><strong>Published:</strong> {new Date(post.publishedAt).toLocaleDateString()}</p>
            <img src={post.coverImage.url} alt={post.title} style={{ width: "100%", borderRadius: "10px" }} />
            <div dangerouslySetInnerHTML={{ __html: post.content.html }} style={{ marginTop: "1rem" }} />
        </div>
    );
}
