"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import About from "./About";
import Works from "./Works";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/spotlight";

const LandingPage = () => {
  return (
    <>
        <section className="relative min-h-screen  w-full flex items-center justify-center text-center mb-8 md:mb-16">
      <div className="min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
          <Spotlight
            className="-top-10 left-14 md:left-60 md:-top-20"
            fill="white"
          />
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

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
      </div>
        </section>
    </>
  );
};

export default LandingPage;
