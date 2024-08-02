import Image from "next/image";

const About = () => {
  return (
    <div className="w-full py-12 lg:py-24 xl:py-32 flex justify-center items-center">
      <div className="container flex flex-col gap-8 px-4 md:gap-12 md:px-6">
        <div className="flex justify-center">
          <div className="max-w-md rounded-lg overflow-hidden shadow-lg ">
            <Image
              src="/images/profile.png"
              width={250}
              height={250}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className="space-y-3 text-center">
          <h1 className=" font-bold tracking-tighter text-3xl md:text-4xl">
            About Me
          </h1>
          <p className="max-w-md md:max-w-4xl mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Hello there! I&apos;m S Soumyakanta, a self-taught web developer
            whose journey began with a love for blogging and tinkering with
            Blogger templates. My fascination for the digital realm deepened,
            leading me to explore the world of web development. From learning
            the basics of HTML, CSS, and JavaScript to mastering technologies
            like React.js and Next.js, I&apos;ve evolved into a passionate full
            stack web app developer.
          </p>
          <p className="max-w-md md:max-w-4xl mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Feel free to reach out at contact@s-soumyakanta.com! I&apos;m
            excited to connect with fellow web development enthusiasts, share
            insights, and explore new ideas. Let&apos;s create exceptional web
            experiences together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
