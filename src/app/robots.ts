import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/private/',
            },
            {
                userAgent: 'AdsBot-Google',
                allow: '/',
            },
            {
                userAgent: 'GPTBot',
                disallow: '/',
            },
        ],
        sitemap: [
            'https://s-soumyakanta.com/sitemap.xml',
            'https://s-soumyakanta.com/blog/sitemap.xml',
        ],
    };
}
