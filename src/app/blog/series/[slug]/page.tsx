import { resizeImage } from '@/utils/image';
import { request } from 'graphql-request';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { AppProvider } from '@/components/contexts/appContext';

import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { MorePosts } from '@/components/more-posts';
import { CoverImage } from '@/components/cover-image';

import {
	PostFragment,
	PublicationFragment,
	SeriesFragment,
	SeriesPostsByPublicationDocument,
	SeriesPostsByPublicationQuery,
	SeriesPostsByPublicationQueryVariables,
} from '@/generated/graphql';

import { DEFAULT_COVER } from '@/utils/const';

type Props = {
	params: Promise<{
		slug: string;
	}>;
};


// Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await Promise.resolve(params);

	try {
		const data = await request<SeriesPostsByPublicationQuery, SeriesPostsByPublicationQueryVariables>(
			process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!,
			SeriesPostsByPublicationDocument,
			{
				host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST!,
				first: 1,
				seriesSlug: slug,
			},
		);

		const publication = data.publication;
		const series = publication?.series;

		return {
			title: series ? `${series.name} - ${publication.title}` : slug,
		};
	} catch {
		return {
			title: slug,
		};
	}
}

// Main page component
export default async function SeriesPage({ params }: Props) {
	const { slug } = await Promise.resolve(params);

	const data = await request<SeriesPostsByPublicationQuery, SeriesPostsByPublicationQueryVariables>(
		process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT!,
		SeriesPostsByPublicationDocument,
		{
			host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST!,
			first: 20,
			seriesSlug: slug,
		},
	);

	const publication = data.publication;
	const series = publication?.series;

	if (!publication || !series) {
		notFound();
	}

	const posts: PostFragment[] = series.posts.edges.map((edge) => edge.node);

	return (
		<AppProvider publication={publication as PublicationFragment} series={series as SeriesFragment}>
			<Container className="flex flex-col items-stretch gap-10 px-5 pb-10 mt-20">
				<div className={`${series.coverImage ? 'col-span-full' : 'col-span-3'} grid grid-cols-4 pt-5 md:gap-5`}>
					<div className="col-span-full flex flex-col gap-1 md:col-span-2 lg:col-span-3">
						<p className="font-bold uppercase text-slate-500 dark:text-neutral-400">Series</p>
						<h1 className="text-4xl font-bold text-slate-900 dark:text-neutral-50">{series.name}</h1>
						<div
							className="hashnode-content-style mb-4"
							dangerouslySetInnerHTML={{ __html: series.description?.html ?? '' }}
						/>
					</div>
					<div className="relative col-span-full md:col-span-2 lg:col-span-1">
						<CoverImage
							title={series.name}
							src={resizeImage(
								series.coverImage,
								{ w: 400, h: 210, c: 'thumb' },
								DEFAULT_COVER,
							)}
						/>
					</div>
				</div>
				{posts.length > 0 ? (
					<MorePosts context="series" posts={posts} />
				) : (
					<div>No posts found</div>
				)}
			</Container>
			<Footer />
		</AppProvider>
	);
}

// Optional if using static site generation (but generally SSR/dynamic recommended for dynamic content)
export async function generateStaticParams() {
	return []; // Empty to enable fallback rendering
}
