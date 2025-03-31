import React, { Component, createRef } from 'react';
import Image from 'next/image';
import { resizeImage } from '@/utils/image';
import { DEFAULT_AVATAR } from '../utils/const';
import { twMerge } from 'tailwind-merge';

interface ProgressiveImageProps {
  resize?: { w?: number; h?: number; c?: string };
  src: string;
  alt: string;
  className?: string;
}

class ProgressiveImage extends Component<ProgressiveImageProps> {
  imageRef: React.RefObject<HTMLImageElement | null>;

  constructor(props: ProgressiveImageProps) {
    super(props);
    this.imageRef = createRef<HTMLImageElement>();
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && !('lazySizes' in window) && this.imageRef.current) {
      this.imageRef.current.src = this.imageRef.current.dataset.src || '';
    }
  }

  replaceBadImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (this.props.resize?.c !== 'face') return;
    e.currentTarget.onerror = null;
    e.currentTarget.src = DEFAULT_AVATAR;
  };

  render() {
    const { src, alt, className, resize = {} } = this.props;
    if (!src?.trim()) return null;

    const resizedImage = resizeImage(src, resize);
    const { w = 100, h = 100 } = resize;

    return (
      <Image
        ref={this.imageRef}
        src={resizedImage}
        alt={alt}
        width={w}
        height={h}
        className={twMerge('block w-full', className)}
        onError={this.replaceBadImage}
        priority
        unoptimized
      />
    );
  }
}

export default ProgressiveImage;
export { ProgressiveImage };
