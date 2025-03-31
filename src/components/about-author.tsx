"use client";

import PostAuthorInfo from "./post-author-info";
import { useAppContext } from "./contexts/appContext";
import { PostFullFragment } from "../generated/graphql";

// ✅ Define Author type manually
interface Author {
  id: string;
  name: string;
  username: string;
  profilePicture?: string | null;
}

function AboutAuthor() {
  const { post: _post } = useAppContext();
  const post = _post as unknown as PostFullFragment;

  if (!post || !post.author) {
    return <p className="text-gray-400">No author information available</p>;
  }

  const { publication, author } = post;
  const coAuthors = post.coAuthors || [];

  const allAuthors: Author[] = publication?.isTeam
    ? [author, ...coAuthors].filter(Boolean) // ✅ Ensure all authors are defined
    : [author];

  return (
    <div className="mx-auto w-full px-5 md:max-w-screen-md mb-5 mt-10 flex flex-col gap-16">
      <div className="flex-1 px-2">
        <div className="flex flex-col flex-wrap items-start md:flex-nowrap">
          <h3 className="mb-4 w-full  pb-2 text-base font-medium tracking-wider text-white">
            Written by
          </h3>
          <div className="flex w-full flex-col gap-12">
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
