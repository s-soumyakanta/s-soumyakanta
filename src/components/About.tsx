import Image from "next/image";
import Link from "next/link";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const About = () => {
  const aboutMeText = `Hello! I'm Soumyakanta, a self-taught full-stack developer with a passion for creating dynamic and responsive web applications. My journey into web development began with experimenting with blog templates, which ignited my curiosity about the inner workings of websites. Over time, I have honed my skills in both front-end and back-end development, specializing in technologies such as React, Next.js, Node.js, and various other modern tools and frameworks. I am dedicated to continuous learning and leveraging my technical expertise to deliver robust and scalable solutions.`
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
