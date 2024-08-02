import Image from "next/image";
import Link from "next/link";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const About = () => {
  const aboutMeText = `Hello there! I'm S Soumyakanta, a self-taught web developer
            whose journey began with a love for blogging and tinkering with
            Blogger templates. My fascination for the digital realm deepened,
            leading me to explore the world of web development. From learning
            the basics of HTML, CSS, and JavaScript to mastering technologies
            like React.js and Next.js, I've evolved into a passionate full
            stack web app developer.`;
  return (
    <div className="w-full py-12 lg:py-24 xl:py-32 flex justify-center items-center">
      <div className="container flex flex-col gap-8 px-4 md:gap-12 md:px-6">
        <div className="flex justify-center">
          <div className="max-w-md rounded-lg overflow-hidden shadow-lg ">
            <Image
              src="/images/profile.png"
              width={250}
              height={250}
              alt="Picture of S Soumyakanta"
            />
          </div>
        </div>
        <div className="space-y-3 text-center">
          <h2 className=" font-bold tracking-tighter text-3xl md:text-4xl">
            About Me
          </h2>
          <div className="w-full">
          <TextGenerateEffect words={aboutMeText} className="text-center" />
        
          </div>
          </div>
      </div>
    </div>
  );
};

export default About;
