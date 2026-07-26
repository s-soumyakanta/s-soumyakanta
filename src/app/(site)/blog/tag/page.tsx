import { request } from 'graphql-request';
import Link from 'next/link';
import { Metadata } from 'next';
import { SitemapDocument, SitemapQuery, SitemapQueryVariables } from '@/generated/graphql';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
    title: 'All Tags - Blog',
};

export default async function TagsPage() {
    const data = await request<SitemapQuery, SitemapQueryVariables>(
        process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!,
        SitemapDocument,
        {
            host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST!,
            postsCount: 100,
            staticPagesCount: 0,
        }
    );

    const tagsSet = new Set<string>();
    data.publication?.posts.edges.forEach(post => {
        post.node.tags?.forEach(tag => tag.name && tagsSet.add(tag.name));
    });

    const tags = Array.from(tagsSet);

    return (
        <div className="max-w-4xl px-4 py-8 mx-auto mt-20">
            <h1 className="text-3xl font-bold ">All Tags</h1>
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { name: 'Home', href: '/' },
                    { name: 'Blog', href: '/blog' },
                    { name: 'Tag' },
                ]}
            />
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {tags.map(tag => (
                    <li key={tag}>
                        <Link href={`/blog/tag/${tag}`}>
                            <div className="p-3 bg-neutral-900 text-white rounded hover:bg-neutral-700 transition-all">
                                #{tag}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
