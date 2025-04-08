import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { request } from 'graphql-request';

import { Container } from '@/components/container';
import { AppProvider } from '@/components/contexts/appContext';
import { MarkdownToHtml } from '@/components/markdown-to-html';
import { Layout } from '@/components/layout';
import { PostHeader } from '@/components/post-header';

import {
    DraftByIdDocument,
    DraftByIdQuery,
    DraftByIdQueryVariables,
    PublicationByHostDocument,
    PublicationByHostQuery,
    PublicationByHostQueryVariables,
    PublicationFragment,
    PostFullFragment
} from '@/generated/graphql';

type Props = {
    params: Promise<{ id: string }>; // Updated to reflect async nature
};

type Tag = {
    id: string;
    slug: string;
    name: string;
};

// Metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params; // Await the params promise

    try {
        const dataDraft = await request<DraftByIdQuery, DraftByIdQueryVariables>(
            process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT as string,
            DraftByIdDocument,
            { id }
        );

        const draft = dataDraft.draft;

        if (!draft) {
            return {
                title: 'Draft not found'
            };
        }

        return {
            title: `${draft.title || 'Untitled'} | Next.js Blog Example with Hashnode`,
        };
    } catch (error) {
        return {
            title: 'Error loading draft'
        };
    }
}

// This replaces getStaticPaths
export async function generateStaticParams() {
    return [];
}

export default async function DraftPage({ params }: Props) {
    const { id } = await params; // Await the params promise

    try {
        const [dataDraft, dataPublication]: [DraftByIdQuery, PublicationByHostQuery] = await Promise.all([
            request<DraftByIdQuery, DraftByIdQueryVariables>(
                process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT as string,
                DraftByIdDocument,
                { id }
            ),
            request<PublicationByHostQuery, PublicationByHostQueryVariables>(
                process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT as string,
                PublicationByHostDocument,
                {
                    host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST as string,
                }
            ),
        ]);

        const publication = dataPublication.publication;
        const draft = dataDraft.draft;

        if (!draft || !publication) {
            notFound();
        }

        const typeSafePublication: PublicationFragment = {
            ...publication,
            id: publication.id,
            title: publication.title,
            isTeam: publication.isTeam || false,
        };

        const compatiblePost: PostFullFragment = {
            id: draft.id,
            slug: draft.id,
            url: "",
            brief: "",
            title: draft.title || 'Untitled',
            publishedAt: draft.dateUpdated,
            updatedAt: draft.dateUpdated,
            readTimeInMinutes: draft.readTimeInMinutes,
            reactionCount: 0,
            responseCount: 0,
            hasLatexInPost: false,
            content: {
                __typename: 'Content',
                markdown: draft.content?.markdown || '',
                html: '',
            },
            author: draft.author,
            tags: draft.tags || [],
            features: {
                __typename: 'PostFeatures',
                tableOfContents: {
                    __typename: 'TableOfContentsFeature',
                    isEnabled: false,
                    items: []
                }
            },
            preferences: {
                __typename: 'PostPreferences',
                disableComments: false
            },
            comments: {
                __typename: 'PostCommentConnection',
                totalDocuments: 0,
                edges: []
            }
        };

        const highlightJsMonokaiTheme =
            '.hljs{display:block;overflow-x:auto;padding:.5em;background:#23241f}.hljs,.hljs-subst,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong{color:#a8a8a2}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ae81ff}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#a6e22e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#f92672}.hljs-attribute,.hljs-symbol{color:#66d9ef}.hljs-class .hljs-title,.hljs-params{color:#f8f8f2}.hljs-addition,.hljs-built_in,.hljs-builtin-name,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#e6db74}.hljs-comment,.hljs-deletion,.hljs-meta{color:#75715e}';

        const tagsList = draft.tags?.map((tag: Tag) => (
            <li key={tag.id}>
                <Link
                    href={`/tag/${tag.slug}`}
                    className="block rounded-full border px-2 py-1 font-medium hover:bg-slate-50 dark:border-neutral-800 dark:hover:bg-neutral-800 md:px-4"
                >
                    #{tag.slug}
                </Link>
            </li>
        ));

        return (
            <AppProvider publication={typeSafePublication} post={compatiblePost}>
                <Layout>
                    <Container className="pt-10">
                        <article className="flex flex-col items-start gap-10 pb-10 mt-20">
                            <style dangerouslySetInnerHTML={{ __html: highlightJsMonokaiTheme }}></style>
                            <PostHeader
                                title={draft.title || 'Untitled'}
                                coverImage={draft.coverImage?.url}
                                date={draft.dateUpdated}
                                author={draft.author}
                                readTimeInMinutes={draft.readTimeInMinutes}
                            />
                            <MarkdownToHtml contentMarkdown={draft.content?.markdown || ''} />
                            <div className="mx-auto w-full px-5 text-slate-600 dark:text-neutral-300 md:max-w-screen-md">
                                <ul className="flex flex-row flex-wrap items-center gap-2">{tagsList}</ul>
                            </div>
                        </article>
                    </Container>
                </Layout>
            </AppProvider>
        );
    } catch (error) {
        console.error('Error fetching data:', error);
        notFound();
    }
}