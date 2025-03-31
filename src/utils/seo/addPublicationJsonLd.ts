interface Publication {
	url: string;
	title: string;
	descriptionSEO?: string;
	isTeam: boolean;
	preferences?: {
		logo?: string;
	};
}

// Function to generate JSON-LD structured data for a publication
export const addPublicationJsonLd = (publication: Publication): Record<string, unknown> => {
	return {
		'@context': 'https://schema.org/',
		'@type': 'Blog',
		'@id': publication.url,
		mainEntityOfPage: publication.url,
		name: publication.title,
		description: publication.descriptionSEO ?? '',
		publisher: {
			'@type': publication.isTeam ? 'Organization' : 'Person',
			'@id': publication.url,
			name: publication.title,
			image: {
				'@type': 'ImageObject',
				url: publication.preferences?.logo ?? '',
			},
		},
	};
};
