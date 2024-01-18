const About = () => {
  return (
    <div
      id="about"
      className="min-h-screen flex flex-col justify-center items-center"
    >
      <div className="flex justify-center items-center flex-col">
        <div>
          <h2>About</h2>
        </div>
        <div>
          <div>imgae</div>
          <div>
            <p>
              Hello there! I&apos;m S. Soumyakanta, a self-taught web developer
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
                contact@s-soumyakanta.com
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
