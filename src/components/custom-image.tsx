"use client";

import { ImgHTMLAttributes } from "react";
import Image, { ImageProps } from "next/image";
import { StaticImageData } from "next/image";

type Props = {
  src: string | StaticImageData;
  alt: string;
  originalSrc: string;
} & ImgHTMLAttributes<HTMLImageElement> & ImageProps;

/**
 * CustomImage component:
 * - Uses Next.js Image component for optimization.
 * - Falls back to <img> for GIFs.
 * - Handles external images and static imports.
 */
function CustomImage({ originalSrc, alt, src, ...restProps }: Props) {
  if (!originalSrc) {
    return null;
  }

  const isGif = originalSrc.endsWith(".gif");
  const isExternalImage =
    typeof src === "string" && !src.includes("cdn.hashnode.com");

  // Use <img> for GIFs to avoid Next.js optimization issues.
  if (isGif) {
    return <Image {...restProps} alt={alt || "Image"} src={originalSrc} />;
  }

  return (
    <Image
      {...restProps}
      src={src || originalSrc}
      alt={alt || "Image"}
      width={restProps.width || 500} // Default width
      height={restProps.height || 300} // Default height
      loader={isExternalImage ? undefined : undefined} // Use Next.js default loader
      priority // Improve LCP performance
      unoptimized={isGif} // Prevents Next.js optimization for GIFs
    />
  );
}

export default CustomImage;
