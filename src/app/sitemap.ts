import type { MetadataRoute } from 'next';

// Canonical host is www — next.config.ts permanently redirects the apex to it.
const BASE_URL = 'https://www.s-soumyakanta.com';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${BASE_URL}/`,
            lastModified: new Date('2026-07-26T00:00:00+00:00'),
            changeFrequency: 'yearly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date('2026-07-26T00:00:00+00:00'),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
    ];
}
