import Image from "next/image";

const About = () => {
  return (
    <div
      id="about"
      className="min-h-screen md:h-auto  flex flex-col justify-center items-center "
    >
      <div className="flex justify-center items-center flex-col space-y-8 mt-8 md:mt-0">
        <div>
          <h2 className="text-2xl text-lm-heading md:text-3xl lg:text-4xl uppercase font-semibold dark:text-dm-heading">About</h2>
        </div>
        <div className="px-3 space-y-3 md:space-y-0 lg:space-y-0 md:grid md:grid-cols-2 md:gap-4 md:max-w-5xl">
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