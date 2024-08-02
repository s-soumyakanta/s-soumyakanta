import Link from "next/link";
import { Button } from "@/components/ui/button";
import About from "./About";
import Works from "./Works";
import Image from "next/image";

const Home = () => {
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <section className="relative h-[90vh] w-full bg-background text-foreground dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center text-center mb-8 md:mb-16">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background text-foreground [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

          <div className="relative z-10 flex flex-col justify-center items-center">
            <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold mb-2 md:mb-4">
              S Soumyakanta
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground mb-4 md:mb-8">
              Full-Stack Developer
            </h2>
            <p className="max-w-sm md:max-w-lg mx-auto text-base sm:text-lg mb-6 md:mb-8">
              Helping businesses build robust and scalable web applications.
            </p>
            <Link href="/contact">
              <Button className="uppercase font-bold">Contact</Button>
            </Link>
          </div>
        </section>

        <section
          id="about"
          className="min-h-screen flex justify-center items-center"
        >
          <About />
        </section>
        <section
          id="works"
          className="min-h-screen flex justify-center items-center"
        >
          <Works />
        </section>
      </main>
    </div>
  );
};

export default Home;
