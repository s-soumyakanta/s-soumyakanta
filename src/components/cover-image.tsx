import Image from 'next/image';
import Link from 'next/link';

// Define the Props interface
interface CoverImageProps {
	title: string;
	src: string;
	slug?: string;
	priority?: boolean;
}

export const CoverImage = ({ title, src, slug, priority = false }: CoverImageProps) => {
	const postURL = `/blog/${slug}`;

	const image = (
		<div className="relative pt-[52.5%]">
			<Image
				src={src}
				alt={`Cover Image for ${title}`}
				className="w-full rounded-md border object-cover hover:opacity-90 dark:border-neutral-800"
				fill
				sizes="(max-width: 640px) 100vw, (max-width: 768px) 85vw, (max-width: 1024px) 75vw, 1200px"
				priority={priority}
				quality={80}
				placeholder="blur"
				blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI+wN4B5X7jwAAAABJRU5ErkJggg=="
			/>
		</div>
	);

	return (
		<div className="sm:mx-0">
			{slug ? (
				<Link href={postURL} aria-label={title}>
					{image}
				</Link>
			) : (
				image
			)}
		</div>
	);
};