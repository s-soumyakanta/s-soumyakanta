import Image from "next/image";
import { Heading } from "./index";

const About = () => {
  // Portfolio v3
  return (
    <div
      id="about"
      className="min-h-screen md:h-auto  flex flex-col justify-center items-center max-w-5xl "
    >
      <div className="flex justify-center items-center flex-col space-y-20 mt-8 md:mt-0">
        <div>
          <Heading name="About" />
          </div>
        <div className="mx-8  filte space-y-8 md:space-y-0 lg:space-y-0 md:grid md:grid-cols-2 md:gap-4 ">
          <div className="md:w-full md:h-full">
          <Image
            src="/about.jpg"
            width={1060}
            height={509}
            alt="3d workstation with laptop"
            priority
            className="rounded-t-lg w-full shadow-2xl lg:rounded-lg md:w-full md:h-full lg:w-auto"
          />
          </div>
          <div className="space-y-4 md:flex md:justify-between md:items-center md:flex-col md:text-base">
            <p>
              Hello there! I&apos;m <span className="text-lm-heading dark:text-dm-heading font-semibold">S Soumyakanta</span>, a self-taught web developer
              whose journey began with a love for blogging and tinkering with
              Blogger templates. My fascination for the digital realm deepened,
              leading me to explore the world of web development. From learning
              the basics of HTML, CSS, and JavaScript to mastering technologies
              like React.js and Next.js, I&apos;ve evolved into a passionate
              front-end developer.
            </p>
            <p>
              Feel free to reach out at{" "}
              <span className="text-lm-heading dark:text-dm-heading font-semibold">
                <a target="_blank" href="mailto:contact@s-soumyakanta.com">contact@s-soumyakanta.com</a>
              </span>
              ! I&apos;m excited to connect with fellow web development
              enthusiasts, share insights, and explore new ideas. Let&apos;s
              create exceptional web experiences together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
