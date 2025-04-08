import request from 'graphql-request';
import { PostsByPublicationDocument } from '@/generated/graphql';
import BlogHome from './blog-home';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

export async function generateMetadata() {
	const data = await request(GQL_ENDPOINT, PostsByPublicationDocument, {
		first: 10,
		host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
	});

	const publication = data.publication ?? {};
	const favicon = publication.favicon && !publication.favicon.startsWith('/')
		? publication.favicon
		: `${process.env.NEXT_PUBLIC_BASE_URL}${publication.favicon || ''}`;

	return {
		title: publication.displayTitle || publication.title || 'S Soumyakanta',
		description: publication.descriptionSEO || `${publication.author?.name ?? 'S Soumyakanta'}'s Blog`,
		twitter: {
			card: 'summary_large_image',
			title: publication.displayTitle || publication.title || 'S Soumyakanta',
			description: publication.descriptionSEO || `${publication.author?.name ?? 'S Soumyakanta'}'s Blog`,
		},
	};
}

export default async function BlogPage() {
	const data = await request(GQL_ENDPOINT, PostsByPublicationDocument, {
		first: 10,
		host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
	});

	if (!data.publication) {
		return <div>Not Found</div>;
	}

	const publication = data.publication;
	const initialAllPosts = publication.posts?.edges?.map((edge: { node: any; }) => edge.node) ?? [];
	const initialPageInfo = publication.posts?.pageInfo ?? { endCursor: null, hasNextPage: false };

	return (
		<BlogHome
			publication={publication}
			initialAllPosts={initialAllPosts}
			initialPageInfo={initialPageInfo}
		/>
	);
}