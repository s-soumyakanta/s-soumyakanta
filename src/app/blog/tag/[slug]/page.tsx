import { request } from 'graphql-request';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { AppProvider } from '@/components/contexts/appContext';
import { Layout } from '@/components/layout';
import { Container } from '@/components/container';
import { MorePosts } from '@/components/more-posts';


import {
    type Post,
    Publication,
    TagPostsByPublicationDocument,
    TagPostsByPublicationQuery,
    TagPostsByPublicationQueryVariables,
} from '@/generated/graphql';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // Await the params object before destructuring
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    const data = await request<TagPostsByPublicationQuery, TagPostsByPublicationQueryVariables>(
        process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!,
        TagPostsByPublicationDocument,
        {
            host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
            first: 1, // Only need publication name
            tagSlug: slug,
        },
    );

    const publication = data.publication;
    if (!publication) {
        return {
            title: `Tag - #${slug}`,
        };
    }

    return {
        title: `#${slug} - ${publication.title}`,
    };
}

// Main page component
export default async function TagPage({ params }: Props) {
    // Await the params object before destructuring
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    const data = await request<TagPostsByPublicationQuery, TagPostsByPublicationQueryVariables>(
        process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!,
        TagPostsByPublicationDocument,
        {
            host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
            first: 20,
            tagSlug: slug,
        },
    );

    const publication = data.publication;
    if (!publication) {
        notFound();
    }

    const posts = publication.posts.edges.map((edge) => edge.node);

    return (
        <AppProvider publication={publication}>
            <Layout>
                <Container className="flex flex-col items-stretch gap-10 px-5 pb-10 mt-20">
                    <div className="flex flex-col gap-1 pt-5">
                        <p className="font-bold uppercase text-slate-500 dark:text-neutral-400">Tag</p>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-neutral-50">#{slug}</h1>
                    </div>
                    <MorePosts context="tag" posts={posts} />
                </Container>
            </Layout>
        </AppProvider>
    );
}

// Generate static paths (equivalent to getStaticPaths)
export async function generateStaticParams() {
    return []; // Using empty array with dynamic rendering
}