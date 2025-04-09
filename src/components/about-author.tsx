"use client";

import ProfileImage from "./profile-image";
import { useAppContext } from "./contexts/appContext";
import { PostFullFragment } from "../generated/graphql";

// Define Author type manually
interface Author {
  id: string;
  name: string;
  username: string;
  profilePicture?: string | null;
}

interface PostAuthorInfoProps {
  author: {
    id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
}

// Simple PostAuthorInfo component
const PostAuthorInfo = ({ author }: PostAuthorInfoProps) => (
  <div className="flex items-start gap-4">
    <div className="h-16 w-16 overflow-hidden rounded-full">
      <ProfileImage
        user={author}
        width="64"
        height="64"
      />
    </div>
    <div className="flex flex-col">
      <h4 className="text-lg font-medium text-slate-800 dark:text-white">{author.name}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-300">@{author.username}</p>
    </div>
  </div>
);

function AboutAuthor() {
  const { post: _post } = useAppContext();
  const post = _post as unknown as PostFullFragment;

  if (!post || !post.author) {
    return <p className="text-gray-400">No author information available</p>;
  }

  const { publication, author } = post;
  const coAuthors = post.coAuthors || [];

  const allAuthors: Author[] = publication?.isTeam
    ? [author, ...coAuthors].filter(Boolean) // Ensure all authors are defined
    : [author];

  return (
    <div className="mx-auto w-full px-5 md:max-w-screen-md mb-5 mt-10 flex flex-col gap-8">
      <div className="flex-1 px-2">
        <div className="flex flex-col flex-wrap items-start md:flex-nowrap">
          <h3 className="mb-4 w-full pb-2 text-base font-medium tracking-wider text-slate-900 dark:text-white">
            Written by
          </h3>
          <div className="flex w-full flex-col gap-8">
            {allAuthors.map((_author) => (
              <PostAuthorInfo
                key={_author.id}
                author={{ ..._author, profilePicture: _author.profilePicture || "" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutAuthor;