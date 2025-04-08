// app/robots.txt/route.ts
export async function GET() {
    const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;
    if (!host) {
        throw new Error('Could not determine host');
    }

    const sitemapUrl = `https://${host}/sitemap.xml`;
    const robotsTxt = `
User-agent: *
Allow: /

# Google adsbot ignores robots.txt unless specifically named!
User-agent: AdsBot-Google
Allow: /

User-agent: GPTBot
Disallow: /

Sitemap: ${sitemapUrl}
  `.trim();

    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 's-maxage=86400, stale-while-revalidate'
        }
    });
}