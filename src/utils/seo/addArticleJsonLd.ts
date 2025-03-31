interface Publication {
	url: string;
	title: string;
	about?: {
		markdown?: string;
	};
	isTeam: boolean;
	preferences?: {
		logo?: string;
		darkMode?: {
			logo?: string;
		};
	};
}

interface Author {
	username?: string;
	name?: string;
}

interface Tag {
	name: string;
}

interface Post {
	url: string;
	title: string;
	seo?: {
		description?: string;
	};
	brief?: string;
	publishedAt?: string;
	updatedAt?: string;
	author?: Author;
	coverImage?: {
		url?: string;
	};
	tags?: Tag[];
}

// Function to generate JSON-LD structured data for an article
export const addArticleJsonLd = (publication: Publication, post: Post): Record<string, unknown> => {
	const tags = (post.tags ?? []).map((tag) => tag.name);

	return {
		'@context': 'https://schema.org/',
		'@type': 'Blog',
		'@id': publication.url,
		mainEntityOfPage: publication.url,
		name: publication.title,
		description: publication.about?.markdown ?? '',
		publisher: {
			'@type': publication.isTeam ? 'Organization' : 'Person',
			'@id': publication.url,
			name: publication.title,
			image: {
				'@type': 'ImageObject',
				url: publication.preferences?.logo ?? publication.preferences?.darkMode?.logo ?? '',
			},
		},
		blogPost: [
			{
				'@type': 'BlogPosting',
				'@id': post.url,
				mainEntityOfPage: post.url,
				headline: post.title,
				name: post.title,
				description: post.seo?.description ?? post.brief ?? '',
				datePublished: post.publishedAt ?? '',
				dateModified: post.updatedAt ?? '',
				author: {
					'@type': 'Person',
					'@id': post.author?.username ? `https://hashnode.com/@${post.author.username}` : '',
					name: post.author?.name ?? '',
					url: post.author?.username ? `https://hashnode.com/@${post.author.username}` : '',
				},
				image: {
					'@type': 'ImageObject',
					url: post.coverImage?.url ?? '',
				},
				url: post.url,
				keywords: tags,
			},
		],
	};
};
