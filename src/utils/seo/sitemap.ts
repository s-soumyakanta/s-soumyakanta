interface Post {
	slug: string;
	publishedAt?: string;
	updatedAt?: string;
	tags?: Tag[];
}

interface Tag {
	slug: string;
}

interface Publication {
	url: string; // fallback domain
	posts: Post[];
}

/**
 * Blog-only sitemap: posts and tag indexes.
 *
 * The site's static routes (/, /blog, /contact) are owned by app/sitemap.ts,
 * so they are deliberately not repeated here.
 */
export const getSitemap = (publication: Publication, baseUrl?: string): string => {
	const domain = (baseUrl ?? publication.url).replace(/\/$/, '');
	const posts = publication.posts;

	let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
	xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

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

	// Tags (unique)
	const uniqueTags = new Set<string>();
	for (const post of posts) {
		post.tags?.forEach((tag) => uniqueTags.add(tag.slug));
	}

	for (const tag of uniqueTags) {
		xml += `  <url>\n`;
		xml += `    <loc>${domain}/blog/tag/${tag}</loc>\n`;
		xml += `    <changefreq>weekly</changefreq>\n`;
		xml += `    <priority>0.5</priority>\n`;
		xml += `  </url>\n`;
	}

	xml += `</urlset>`;

	return xml;
};
