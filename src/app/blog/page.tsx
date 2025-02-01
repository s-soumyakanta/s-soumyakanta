// app/blog/page.tsx

import { getAllPosts } from '@/queries/blog-data';

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function BlogPage() {
    const host = 's-soumyakanta.hashnode.dev';
    const postsData = await getAllPosts(host, 5); // endCursor is omitted here

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Posts from {host}</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {postsData?.edges.map((edge) => (
                    <li key={edge.node._id} style={{ marginBottom: '1rem' }}>
                        <h2>{edge.node.title}</h2>
                        <p>{edge.node.brief}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
