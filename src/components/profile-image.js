
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { resizeImage } from '@/utils/image';
import { DEFAULT_AVATAR } from '../utils/const';
import Link from 'next/link';


const ProfileImage = ({
  user,
  width = '70',
  height = '70',
  className = '',
  hoverDisabled = false
}) => {
  if (!user || user.isDeactivated) {
    return null;
  }

  const widthNum = parseInt(width);
  const heightNum = parseInt(height);
  const imageSrc = user.profilePicture
    ? resizeImage(user.profilePicture, { w: widthNum, h: heightNum, c: 'face' })
    : DEFAULT_AVATAR;

  return (
    <Link
      href="/blog"
      className={`relative block h-full w-full ${hoverDisabled ? '' : 'hover:opacity-90'}`}
    >
      <Image
        className={twMerge(className, `relative z-20 block w-full rounded-full`)}
        src={imageSrc}
        width={widthNum}
        height={heightNum}
        alt={user.name ? `${user.name}'s photo` : 'Profile photo'}
        sizes={`${Math.max(widthNum, heightNum)}px`}
        quality={80}
      />
    </Link>
  );
};

export default ProfileImage;