import { notFound } from 'next/navigation';
import request from 'graphql-request';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Container } from '@/components/container';
import { AppProvider } from '@/components/contexts/appContext';
import { Footer } from '@/components/footer';
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
import Link from 'next/link';

const AboutAuthor = dynamic(() => import('@/components/about-author'));

type Props = {
    type: 'post' | 'page';
    data: PostFullFragment | StaticPageFragment;
    publication: PublicationFragment;
};
type Tag = {
    id: string;
    slug: string;
    name: string;
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

        return (data.publication?.posts.edges ?? []).map((edge: any) => ({
            slug: edge.node.slug,
        }));
    } catch (error) {
        console.error("Error fetching slugs:", error);
        return [];
    }
}

export default async function PostOrPage({ params }: { params: Promise<{ slug: string }> }) {
    try {
        // Await params before accessing properties
        const { slug } = await Promise.resolve(params);

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
    const highlightJsMonokaiTheme =
        '.hljs{display:block;overflow-x:auto;padding:.5em;background:#23241f}.hljs,.hljs-subst,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong{color:#a8a8a2}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ae81ff}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#a6e22e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#f92672}.hljs-attribute,.hljs-symbol{color:#66d9ef}.hljs-class .hljs-title,.hljs-params{color:#f8f8f2}.hljs-addition,.hljs-built_in,.hljs-builtin-name,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#e6db74}.hljs-comment,.hljs-deletion,.hljs-meta{color:#75715e}';

    const post = data as PostFullFragment;
    const tagsList = post.tags?.map((tag: Tag) => (
        <li key={tag.id}>
            <Link
                href={`/blog/tag/${tag.slug}`}
                className="block rounded-full border px-2 py-1 font-medium hover:bg-slate-50 dark:border-neutral-800 dark:hover:bg-neutral-800 md:px-4"
            >
                #{tag.slug}
            </Link>
        </li>
    ));
    return (
        <>
            <Head>
                <title>{post.seo?.title || post.title}</title>
                <link rel="canonical" href={post.url} />
            </Head>
            <AppProvider publication={publication} post={post}>
                <Container className="mt-24">
                    <article className="flex flex-col items-start gap-10 pb-10">
                        <style dangerouslySetInnerHTML={{ __html: highlightJsMonokaiTheme }}></style>
                        <PostHeader
                            title={post.title}
                            coverImage={post.coverImage?.url}
                            date={post.publishedAt}
                            author={post.author}
                            readTimeInMinutes={post.readTimeInMinutes}
                        />
                        {post.features?.tableOfContents?.isEnabled && <PostTOC />}
                        <MarkdownToHtml contentMarkdown={post.content.markdown} />
                        <div className="mx-auto w-full px-5 text-slate-600 dark:text-neutral-300 md:max-w-screen-md">
                            <ul className="flex flex-row flex-wrap items-center gap-2">{tagsList}</ul>
                        </div>
                        <AboutAuthor />
                        <SubscribeForm />
                    </article>
                </Container>
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
                <Container className="pt-10">
                    <MarkdownToHtml contentMarkdown={page.content.markdown} />
                </Container>
                <Footer />
            </AppProvider>
        </>
    );
}
