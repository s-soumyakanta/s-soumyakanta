import { notFound } from 'next/navigation';
import request from 'graphql-request';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Container } from '@/components/container';
import { AppProvider } from '@/components/contexts/appContext';
import { Footer } from '@/components/footer';
import { Layout } from '@/components/layout';
import { MarkdownToHtml } from '@/components/markdown-to-html';
import { PostHeader } from '@/components/post-header';
import { PostTOC } from '@/components/post-toc';

import {
    PageByPublicationDocument,
    PostFullFragment,
    PublicationFragment,
    SinglePostByPublicationDocument,
    SlugPostsByPublicationDocument,
    StaticPageFragment,
} from '@/generated/graphql';
import { SubscribeForm } from '@/components/subscribe-form';

const AboutAuthor = dynamic(() => import('@/components/about-author'));
// const Subscribe = dynamic(() => import('@/components/subscribe').then((mod) => mod.Subscribe));
// const PostComments = dynamic(() =>
//     import('@/components/post-comments').then((mod) => mod.PostComments),
// );

type Props = {
    type: 'post' | 'page';
    data: PostFullFragment | StaticPageFragment;
    publication: PublicationFragment;
};

export async function generateStaticParams() {
    try {
        const endpoint = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!;
        const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST!;

        if (!endpoint || !host) {
            console.error("Missing environment variables.");
            return [];
        }

        const data = await request(endpoint, SlugPostsByPublicationDocument, { first: 10, host });

        return (data.publication?.posts.edges ?? []).map((edge) => ({
            slug: edge.node.slug,
        }));
    } catch (error) {
        console.error("Error fetching slugs:", error);
        return [];
    }
}

export default async function PostOrPage({ params }: { params: { slug: string } }) {
    try {
        const slug = await params.slug;

        const endpoint = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!;
        const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST!;

        if (!endpoint || !host) {
            console.error("Missing required environment variables.");
            return notFound();
        }

        // Fetch post data
        const postData = await request(endpoint, SinglePostByPublicationDocument, { host, slug });

        if (postData.publication?.post) {
            return <PostPage type="post" data={postData.publication.post} publication={postData.publication} />;
        }

        // Fetch static page data if not a post
        const pageData = await request(endpoint, PageByPublicationDocument, { host, slug });

        if (pageData.publication?.staticPage) {
            return <PagePage type="page" data={pageData.publication.staticPage} publication={pageData.publication} />;
        }

        return notFound();
    } catch (error) {
        console.error("Error fetching post or page:", error);
        return notFound();
    }
}

function PostPage({ data, publication }: Props) {
    const post = data as PostFullFragment;

    return (
        <>
            <Head>
                <title>{post.seo?.title || post.title}</title>
                <link rel="canonical" href={post.url} />
            </Head>
            <AppProvider publication={publication} post={post}>
                <Layout>
                    {/* <Header /> */}
                    <Container className="mt-24">
                        <article className="flex flex-col items-start gap-10 pb-10">
                            <PostHeader
                                title={post.title}
                                coverImage={post.coverImage?.url}
                                date={post.publishedAt}
                                author={post.author}
                                readTimeInMinutes={post.readTimeInMinutes}
                            />
                            {post.features?.tableOfContents?.isEnabled && <PostTOC />}
                            <MarkdownToHtml contentMarkdown={post.content.markdown} />
                            <AboutAuthor />
                            {/* {!post.preferences?.disableComments && <PostComments />} */}
                            <SubscribeForm />
                        </article>
                    </Container>
                    {/* <Footer /> */}
                </Layout>
            </AppProvider>
        </>
    );
}

function PagePage({ data, publication }: Props) {
    const page = data as StaticPageFragment;

    return (
        <>
            <Head>
                <title>{page.title}</title>
            </Head>
            <AppProvider publication={publication} page={page}>
                <Layout>
                    {/* <Header /> */}
                    <Container className="pt-10">
                        <MarkdownToHtml contentMarkdown={page.content.markdown} />
                    </Container>
                    <Footer />
                </Layout>
            </AppProvider>
        </>
    );
}
