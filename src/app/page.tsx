import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/ss-about"), {
  loading: () => <div className="min-h-[300px]"></div>,
});
const Skills = dynamic(() => import("@/components/skills"), {
  loading: () => <div className="min-h-[300px]"></div>,
});
const Works = dynamic(() => import("@/components/works"), {
  loading: () => <div className="min-h-[300px]"></div>,
});
const EmailMe = dynamic(() => import("@/components/email-me"), {
  loading: () => <div className="min-h-[300px]"></div>
});
const Experience = dynamic(() => import("@/components/experience"), {
  loading: () => <div className="min-h-[300px]"></div>
});

const LandingPage = () => {
  return (
    <>
      <section className="min-h-screen w-full flex items-center justify-center bg-[hsl(var(--background))] dark:bg-[hsl(var(--background))]">
        <div className="min-h-screen w-full relative flex items-center justify-center bg-foreground">
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <h1
              className="text-4xl md:text-6xl font-bold mb-2 md:mb-4"
            >
              S Soumyakanta
            </h1>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-400 mb-4 md:mb-8">
              Full-Stack Developer
            </h2>

            <p className="max-w-xs md:max-w-md mx-auto text-base text-gray-300 sm:text-lg mb-6 md:mb-8 text-muted-foreground">
              Helping businesses build robust and scalable web applications.
            </p>

            <div className="flex gap-4">
              <Link href="/contact">
                <Button
                  className="pulse-effect uppercase font-bold bg-white text-black hover:bg-gray-200"
                >
                  Contact
                </Button>
              </Link>

              <Link href="/blog">
                <Button
                  variant="outline"
                  className="pulse-effect uppercase font-bold border-white text-white hover:bg-white/10"
                >
                  Read Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <About />
      <Experience />
      <Skills />
      <Works />
      <EmailMe />
    </>
  );
};

export default LandingPage;