// cover-image.tsx
import Image from 'next/image';
import Link from 'next/link';

type CoverImageProps = {
	title: string;
	src: string;
	slug?: string;
	priority?: boolean;
};

export const CoverImage = ({ title, src, slug, priority = false }: CoverImageProps) => {
	const postURL = `/blog/${slug}`;

	return (
		<div className="relative w-full aspect-[1200/630] overflow-hidden">
			<Link href={postURL}>
				<Image
					src={src}
					alt={`Cover Image for ${title}`}
					fill
					className="rounded-md border object-cover hover:opacity-90 dark:border-neutral-800"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
					priority={priority}
					placeholder="blur" // Use a blur placeholder
					blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhNPQAI8wMIM2XhJwAAAABJRU5ErkJggg==" // Static low-res placeholder
				/>
			</Link>
		</div>
	);
};