import { getPost } from "@/queries/blog-data";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds
export const revalidate = 60;

interface BlogPostPageProps {
    params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const host = "s-soumyakanta.hashnode.dev";
    const post = await getPost(host, params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div style={{ padding: "1rem", maxWidth: "700px", margin: "0 auto" }}>
            <h1>{post.title}</h1>
            {post.coverImage && (
                <img
                    src={post.coverImage.url}
                    alt={post.title}
                    style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
                />
            )}
            <p>{post.brief}</p>
            {post.content?.html && (
                <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
            )}
        </div>
    );
}
