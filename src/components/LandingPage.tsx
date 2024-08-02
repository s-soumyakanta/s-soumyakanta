"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import About from "./About";
import Works from "./Works";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const GlowingStarsBackgroundCard = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [stars, setStars] = useState(108);
  const [columns, setColumns] = useState(18);

  const [glowingStars, setGlowingStars] = useState<number[]>([]);

  const highlightedStars = useRef<number[]>([]);

  useEffect(() => {
    const updateStarsAndColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setStars(54); 
        setColumns(9); 
      } else {
        setStars(108); 
        setColumns(18); 
      }
    };

    updateStarsAndColumns();
    window.addEventListener("resize", updateStarsAndColumns);

    return () => window.removeEventListener("resize", updateStarsAndColumns);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 3000);

    return () => clearInterval(interval);
  }, [stars]);

  return (
    <div className={cn("relative h-full w-full p-4 rounded-xl bg-background text-foreground", className)}>
      <div
        className="absolute inset-0 w-full h-full p-1 bg-background text-foreground"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `1px`,
        }}
      >
        {[...Array(stars)].map((_, starIdx) => {
          const isGlowing = glowingStars.includes(starIdx);
          const delay = (starIdx % 10) * 0.1;
          const staticDelay = starIdx * 0.01;
          return (
            <div
              key={`matrix-col-${starIdx}}`}
              className="relative flex items-center justify-center bg-background text-foreground"
            >
              <Star isGlowing={isGlowing} delay={delay} />
              <AnimatePresence mode="wait">
                {isGlowing && <Glow delay={delay} />}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <div className="relative z-10 bg-background text-foreground">{children}</div>
    </div>
  );
};

const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className="bg-[#666] h-[1px] w-[1px] rounded-full relative z-20"
    ></motion.div>
  );
};

const Glow = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      className="absolute left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-blue-500 blur-[1px] shadow-2xl shadow-blue-400"
    />
  );
};

const LandingPage = () => {
  return (
    <>
      <GlowingStarsBackgroundCard>
        <section className="relative h-[90vh] w-full bg-background text-foreground dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center text-center mb-8 md:mb-16">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background text-foreground [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

          <div className="relative z-10 flex flex-col justify-center items-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 md:mb-4">
              S Soumyakanta
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground mb-4 md:mb-8">
              Full-Stack Developer
            </h2>
            <p className="max-w-xs md:max-w-md mx-auto text-base sm:text-lg mb-6 md:mb-8">
              Helping businesses build robust and scalable web applications.
            </p>
            <Link href="/contact">
              <Button className="uppercase font-bold z-30">Contact</Button>
            </Link>
          </div>
        </section>
      </GlowingStarsBackgroundCard>
    </>
  );
}

export default LandingPage;
