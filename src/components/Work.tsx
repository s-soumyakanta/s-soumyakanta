import { randomUUID } from "crypto";
import { Heading, LinkIcon, GithubIcon } from "../components/index";
import Image from "next/image";

type ProjectsObject = {
  id: number;
  name: string;
  description: string;
  url: string;
  links: {
    github?: string;
    live: string;
  };
  image: string;
  tags: string[];
}[];
const Work = () => {
  const projects: ProjectsObject = [
    {
      id: 1,
      name: "WeatherSnap",
      description: "A real time weather forecast web application.",
      links: {
        github: "https://github.com/s-soumyakanta/weather-app",
        live: "https://s-soumyakanta.github.io/weather-app/",
      },
      url: "snap.vercel.com",
      image: "/weathersnap.png",
      tags: ["React","Redux Toolkit", "TailwindCSS"],
    },
    {
      id: 2,
      name: "The Decor",
      description: "A Bhubaneswar based event decoration start up.",
      links: {
        live: "https://thedecor.in",
      },
      url: "thedecor.in",
      image: "/thedecor.png",
      tags: [ "NextJs","Resend", "TailwindCSS"],
    },
    {
      id: 3,
      name: "LYF Music",
      description: "A Music distribution company for",
      links: {
        live: "https://lyf-music.com",
      },
      url: "lyf-music.com",
      image: "/lyfmusic.png",
      tags: ["NextJs","Resend",  "TailwindCSS"],
    },
  ];
  return (
    <div
      id="work"
      className=" h-auto md:min-h-screen space-y-20 mt-20 flex items-center flex-col max-w-7xl"
    >
      <div>
        <Heading name="work" />
      </div>
      <div className=" grid grid-cols-1 space-y-10 md:space-y-0  gap-2 md:gap-6 w-full p-8 md:p-0 md:grid-cols-2 lg:grid-cols-3 ">
        {projects.map(({ id, name, description, links, image, tags, url }) => {
          return (
            <div
              key={id}
              className=" grid grid-rows-6 rounded-lg   border-gray-200 shadow-gray-300 dark:border-gray-800 dark:shadow-slate-900 shadow-lg border-2"
            >
              <div className=" flex flex-col   row-span-2 p-4">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-extrabold">
                      <a href={links.live}>{name}</a>
                    </h3>
                    <h4 className="text-base font-semibold ">
                      <a href={links.live}>{url}</a>
                    </h4>
                  </div>
                  <div className="space-x-6">
                    {
                      links.github ?<GithubIcon link={links.github} />
                      :null
                    }
                    <LinkIcon link={links.live} />
                  </div>
                </div>
                <div>
                  <p>{description}</p>
                </div>
              </div>

              <div className=" row-span-2">
                <Image
                  src={image}
                  width={1060}
                  height={509}
                  alt={name}
                  priority
                />
              </div>

              <div className="flex flex-wrap space-x-2 row-span-2 p-4 justify-start items-center">
                {tags.map((tag) => {
                  return <p className="p-1 px-3 text-sm  dark:border-gray-800 dark:shadow-gray-800 rounded-full border-2" key={tag}>{tag}</p>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Work;
