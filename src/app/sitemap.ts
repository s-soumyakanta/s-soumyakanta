import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.s-soumyakanta.com/blog',
            lastModified: new Date('2025-02-04T19:35:08+00:00'),
            priority: 1.0,
        },
        {
            url: 'https://www.s-soumyakanta.com/',
            lastModified: new Date('2025-06-23T19:35:08+00:00'),
            priority: 0.8,
        },
        {
            url: 'https://www.s-soumyakanta.com/contact',
            lastModified: new Date('2025-02-04T19:35:08+00:00'),
            priority: 0.8,
        },
        {
            url: 'https://www.s-soumyakanta.com/resume',
            lastModified: new Date('2025-06-23T19:35:08+00:00'),
            priority: 0.8,
        },
    ];
}
