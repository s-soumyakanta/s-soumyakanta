import Image from 'next/image';
import Link from 'next/link';

type Props = {
	title: string;
	src: string;
	slug?: string;
	priority?: boolean;
	width?: number;
	height?: number;
};

export const CoverImage = ({
	title,
	src,
	slug,
	priority = false,
	width = 1600,
	height = 840,
}: Props) => {
	const postURL = `/blog/${slug}`;

	const image = (
		<div className="relative">
			<Image
				src={src}
				alt={`Cover Image for ${title}`}
				className="w-full rounded-md border object-cover hover:opacity-90 dark:border-neutral-800"
				width={width}
				height={height}
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				placeholder="blur"
				blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI+wN4B5X7jwAAAABJRU5ErkJggg=="
				priority={priority}
				fetchPriority={priority ? 'high' : 'auto'}
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