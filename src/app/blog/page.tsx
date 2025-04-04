// import { addPublicationJsonLd } from '@/utils/seo/addPublicationJsonLd';
import { getAutogeneratedPublicationOG } from '@/utils/social/og';
import request from 'graphql-request';
import { Metadata } from 'next';

import {
	PostsByPublicationDocument,
	PostsByPublicationQuery,
	PostsByPublicationQueryVariables,
	Publication, // ✅ Ensure Publication type is imported
} from '@/generated/graphql';
import BlogHome from './blog-home';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

export async function generateMetadata(): Promise<Metadata> {
	const data = await request<PostsByPublicationQuery, PostsByPublicationQueryVariables>(
		GQL_ENDPOINT,
		PostsByPublicationDocument,
		{
			first: 10,
			host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
		}
	);

	const publication = data.publication ?? ({} as Partial<Publication>); // Ensure publication is always defined

	// Ensure favicon is not null and handle it as a string or undefined
	const favicon = publication.favicon === null ? undefined : publication.favicon;

	// Handle the favicon case where it could be a path to a local file (e.g., relative path)
	const faviconUrl = favicon ? (favicon.startsWith('/') ? `${process.env.NEXT_PUBLIC_BASE_URL}${favicon}` : favicon) : undefined;

	return {
		title: publication.displayTitle || publication.title || 'Hashnode Blog Starter Kit',
		description:
			publication.descriptionSEO || publication.title || `${publication.author?.name ?? 'Unknown'}'s Blog`, // Ensure author is defined
		// openGraph: {
		// 	images: [publication.ogMetaData?.image || getAutogeneratedPublicationOG(publication)],
		// },
		twitter: {
			card: 'summary_large_image',
			title: publication.displayTitle || publication.title || 'Hashnode Blog Starter Kit',
			description:
				publication.descriptionSEO || publication.title || `${publication.author?.name ?? 'Unknown'}'s Blog`,
			// images: [publication.ogMetaData?.image || getAutogeneratedPublicationOG(publication)],
		},
		// Removed favicon as it is not part of the Metadata type
	};
}



export default async function BlogPage() {
	const data = await request<PostsByPublicationQuery, PostsByPublicationQueryVariables>(
		GQL_ENDPOINT,
		PostsByPublicationDocument,
		{
			first: 10,
			host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
		},
	);

	if (!data.publication) {
		return <div>Not Found</div>;
	}

	// Ensure publication is always assigned a valid object and handle the favicon field
	const publication = data.publication ?? ({} as Publication); // ✅ Fix: Ensure publication is always assigned a valid object

	// Ensure posts are always an array
	const initialAllPosts = publication.posts?.edges?.map((edge) => edge.node) ?? []; // ✅ Fix: Ensure posts are always an array

	return (
		<BlogHome
			publication={publication}
			initialAllPosts={initialAllPosts}
			initialPageInfo={publication.posts?.pageInfo ?? { endCursor: null, hasNextPage: false }} // ✅ Fix: Ensure pageInfo is always an object
		/>
	);
}
