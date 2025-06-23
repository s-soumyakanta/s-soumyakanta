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
	url: string; // fallback domain
	staticPages: { edges: { node: Page }[] };
	posts: Post[];
}

export const getSitemap = (publication: Publication, baseUrl?: string): string => {
	const domain = baseUrl ?? publication.url;
	const staticPages = publication.staticPages.edges.map((edge) => edge.node);
	const posts = publication.posts;

	let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
	xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

	// Root domain
	xml += `  <url>\n`;
	xml += `    <loc>${domain}</loc>\n`;
	xml += `    <changefreq>always</changefreq>\n`;
	xml += `    <priority>1</priority>\n`;
	if (posts.length > 0 && posts[0].publishedAt) {
		xml += `    <lastmod>${posts[0].publishedAt}</lastmod>\n`;
	}
	xml += `  </url>\n`;

	// Posts
	for (const post of posts) {
		xml += `  <url>\n`;
		xml += `    <loc>${domain}/blog/${post.slug}</loc>\n`;
		xml += `    <changefreq>daily</changefreq>\n`;
		xml += `    <priority>0.8</priority>\n`;
		if (post.updatedAt) {
			xml += `    <lastmod>${post.updatedAt}</lastmod>\n`;
		}
		xml += `  </url>\n`;
	}

	// Static pages
	for (const page of staticPages) {
		xml += `  <url>\n`;
		xml += `    <loc>${domain}/${page.slug}</loc>\n`;
		xml += `    <changefreq>always</changefreq>\n`;
		xml += `    <priority>1</priority>\n`;
		xml += `  </url>\n`;
	}

	// Tags (unique)
	const uniqueTags = new Set<string>();
	for (const post of posts) {
		post.tags?.forEach((tag) => uniqueTags.add(tag.slug));
	}

	for (const tag of uniqueTags) {
		xml += `  <url>\n`;
		xml += `    <loc>${domain}/tag/${tag}</loc>\n`;
		xml += `    <changefreq>always</changefreq>\n`;
		xml += `    <priority>1</priority>\n`;
		xml += `  </url>\n`;
	}

	xml += `</urlset>`;

	return xml;
};
