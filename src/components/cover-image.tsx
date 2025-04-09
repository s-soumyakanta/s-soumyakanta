// cover-image.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

type CoverImageProps = {
	title: string;
	src: string;
	slug?: string;
	priority?: boolean;
};

export const CoverImage = ({ title, src, slug, priority = false }: CoverImageProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const postURL = `/blog/${slug}`;

	return (
		<div className="relative w-full">
			{/* Skeleton UI */}
			{isLoading && (
				<div className="absolute inset-0 animate-pulse rounded-md bg-gray-200 dark:bg-neutral-800" />
			)}
			<Link href={postURL}>
				<Image
					src={src}
					alt={`Cover Image for ${title}`}
					width={1600} // Match the resized width
					height={840} // Match the resized height
					className={`w-full rounded-md border object-cover hover:opacity-90 dark:border-neutral-800 ${isLoading ? 'opacity-0' : 'opacity-100'
						}`}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1600px" // Responsive sizes
					priority={priority} // Preload if LCP element
					onLoad={() => setIsLoading(false)}
					onError={() => setIsLoading(false)} // Fallback if image fails
				/>
			</Link>
		</div>
	);
};