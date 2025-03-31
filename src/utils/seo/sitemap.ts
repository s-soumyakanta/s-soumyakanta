interface Post {
	slug: string;
	publishedAt?: string;
	updatedAt?: string;
	tags?: Tag[];
}

interface Tag {
	slug: string;
}

interface Page {
	slug: string;
}

interface Publication {
	url: string;
	staticPages: { edges: { node: Page }[] };
	posts: Post[];
}

// Function to generate sitemap XML
export const getSitemap = (publication: Publication): string => {
	let xml =
		'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

	const domain = publication.url;
	const staticPages = publication.staticPages.edges.map((edge) => edge.node);
	const posts = publication.posts;

	// Root domain entry
	xml += '<url>';
	xml += `<loc>${domain}</loc>`;
	xml += '<changefreq>always</changefreq>';
	xml += '<priority>1</priority>';

	if (posts.length > 0 && posts[0].publishedAt) {
		xml += `<lastmod>${posts[0].publishedAt}</lastmod>`;
	}
	xml += '</url>';

	// Posts in the sitemap
	for (const post of posts) {
		xml += '<url>';
		xml += `<loc>${domain}/${post.slug}</loc>`;
		xml += '<changefreq>daily</changefreq>';
		xml += '<priority>0.8</priority>';
		if (post.updatedAt) {
			xml += `<lastmod>${post.updatedAt}</lastmod>`;
		}
		xml += '</url>';
	}

	// Static pages in the sitemap
	staticPages.forEach((page) => {
		xml += '<url>';
		xml += `<loc>${domain}/${page.slug}</loc>`;
		xml += '<changefreq>always</changefreq>';
		xml += '<priority>1</priority>';
		xml += '</url>';
	});

	// Collect unique tags
	const uniqueTags = new Set<string>();
	for (const post of posts) {
		if (Array.isArray(post.tags)) {
			for (const tag of post.tags) {
				uniqueTags.add(tag.slug);
			}
		}
	}

	// Tags in the sitemap
	uniqueTags.forEach((tag) => {
		xml += '<url>';
		xml += `<loc>${domain}/tag/${tag}</loc>`;
		xml += '<changefreq>always</changefreq>';
		xml += '<priority>1</priority>';
		xml += '</url>';
	});

	xml += '</urlset>';
	return xml;
};
