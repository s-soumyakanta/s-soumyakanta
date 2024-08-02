"use client";

import React from "react";
import About from "./About";
import Works from "./Works";

import LandingPage from "./LandingPage";

const Home = () => {
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <section className="min-h-screen w-full">
          <LandingPage />
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
