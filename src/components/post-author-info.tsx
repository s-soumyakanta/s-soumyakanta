import { twJoin } from "tailwind-merge";
import CustomImage from "./custom-image";
import { getBlurHash, resizeImage } from "@/utils/image";
import Link from "next/link";

type Author = {
  name: string;
  profilePicture: string;
  bio?: {
    html: string;
  };
};

type Props = {
  author: Author;
};

function PostAuthorInfo({ author }: Props) {
  return (
    <div className="flex w-full flex-1 flex-col md:flex-row">
      <div className="mb-4 flex w-full flex-1 flex-row md:mb-0 ">
        <div className="mr-4 flex flex-row md:mb-0">
          <Link
            href="/blog"
            className="block h-10 w-10 overflow-hidden rounded-full border dark:border-slate-800 md:h-14 md:w-14"
          >
            <CustomImage
              className="block"
              placeholder="blur"
              originalSrc={author.profilePicture}
              src={resizeImage(author.profilePicture, {
                w: 256,
                h: 256,
                c: "thumb",
              })}
              blurDataURL={getBlurHash(
                resizeImage(author.profilePicture, {
                  w: 256,
                  h: 256,
                  c: "thumb",
                })
              )}
              width={256}
              height={256}
              alt={author.name}
            />
          </Link>
        </div>
        <div
          className={twJoin(
            "flex flex-1 flex-col justify-center md:justify-start",
            !author.bio?.html ? "md:justify-center" : ""
          )}
        >
          <div className="flex flex-row items-center md:mb-1">
            <h1 className="font-sans text-lg font-semibold text-slate-800 dark:text-slate-100">
              <Link href="/blog">{author.name}</Link>
            </h1>
          </div>
          {author.bio?.html && (
            <div className="hidden pr-2 md:block">
              <div
                className="prose text-slate-600 dark:prose-dark dark:text-slate-300"
                dangerouslySetInnerHTML={{ __html: author.bio.html }}
              />
            </div>
          )}
        </div>
      </div>
      {author.bio?.html && (
        <div className="mb-4 block md:hidden">
          <div
            className="prose text-slate-600 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: author.bio.html }}
          />
        </div>
      )}
    </div>
  );
}

export default PostAuthorInfo;
