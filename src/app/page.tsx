
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center">
      <div className="min-h-screen w-full relative flex items-center justify-center bg-background">
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 md:mb-4">
            S Soumyakanta
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground mb-4 md:mb-8">
            Full-Stack Developer
          </h2>

          <p className="max-w-xs md:max-w-md mx-auto text-base sm:text-lg mb-6 md:mb-8 text-muted-foreground">
            Helping businesses build robust and scalable web applications.
          </p>

          <Link href="/contact">
            <Button className="uppercase font-bold cursor-pointer">
              Contact
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;