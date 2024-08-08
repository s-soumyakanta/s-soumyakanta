"use client";

import React from "react";
import About from "./About";
import Works from "./Works";

import LandingPage from "./LandingPage";
import Skills from "./Skills";
import EmailMe from "./EmailMe";

const Home = () => {
  return (
    <div className="bg-background text-foreground w-full">
      <main className="container w-full">
        <section className="min-h-screen w-full">
          <LandingPage />
        </section>

        <section
          id="about"
          className="min-h-screen flex justify-center items-center"
        >
          <About />
        </section>
        <section className="min-h-screen flex justify-center items-center">
          <Skills />
        </section>
        <section
          id="works"
          className="min-h-screen flex justify-center items-center"
        >
          <Works />
        </section>
        <section className="h-[80vh] flex justify-center items-center">
          <EmailMe />
        </section>
        
        
      </main>
    </div>
  );
};

export default Home;
