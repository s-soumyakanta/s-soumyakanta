// Remove the 'use client' directive since metadata requires a server component
import React from 'react';
import { Metadata } from 'next';

// Define static metadata
export const metadata: Metadata = {
	title: "S Soumyakanta's Blog | Fullstack Developer",
	description: 'Personal blog of S Soumyakanta - MERN & Golang Developer',
	keywords: 'fullstack, developer, MERN, React, Node.js, MongoDB, Express, Golang, web development',
	authors: [{ name: 'S Soumyakanta' }],
	creator: 'S Soumyakanta',
	openGraph: {
		title: "S Soumyakanta's Blog | Fullstack Developer",
		description: 'Personal blog of S Soumyakanta - MERN & Golang Developer',
		url: 'https://s-soumyakanta.com/blog',
		siteName: "S Soumyakanta's Blog",
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: "S Soumyakanta's Blog | Fullstack Developer",
		description: 'Personal blog of S Soumyakanta - MERN & Golang Developer',
		creator: '@s-soumyakanta',
	},
	icons: {
		icon: [
			{ url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: { url: '/favicon/apple-touch-icon.png', sizes: '180x180' },
		other: [
			{
				rel: 'mask-icon',
				url: '/favicon/safari-pinned-tab.svg',
				color: '#000000'
			},
		],
	},
	themeColor: '#000000',
	applicationName: "S Soumyakanta's Blog",
	metadataBase: new URL('https://s-soumyakanta.com/blog'),
	alternates: {
		types: {
			'application/rss+xml': '/feed.xml',
		},
	},
	other: {
		'msapplication-TileColor': '#000000',
		'msapplication-config': '/favicon/browserconfig.xml',
	},
};

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<div className="min-h-screen bg-white dark:bg-neutral-950">
			<main>{children}</main>
		</div>
	);
}