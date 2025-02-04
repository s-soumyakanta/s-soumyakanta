"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

const cardData = [
    {
        title: "The Decor",
        description: "A Bhubaneswar based event decoration start up",
        techStack: ["Next.js", "Resend", "Tailwind CSS"],
        imgUrl: "/images/thedecor.png",
        link: "https://thedecor.in",
    },
    {
        title: "WeatherSnap",
        description: "A real-time weather forecast web application",
        techStack: ["React", "Redux", "chartjs", "leafletjs", "TailwindCSS"],
        imgUrl: "/images/weathersnap.png",
        link: "https://s-soumyakanta.github.io/weather-app/",
    },
    {
        title: "LYF Music",
        description: "A Music distribution company",
        techStack: ["Next.js", "TailwindCSS", "Resend"],
        imgUrl: "/images/lyfmusic.png",
        link: "https://www.lyf-music.com/",
    },
];

export default function Works() {
    return (
        <div id="works" className="min-h-screen flex flex-col justify-center items-center p-4 mt-20">
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">Works</h2>
            <p className="mb-8 text-center text-base md:text-lg">
                Here are some of my recent projects. Click the links to see more details.
            </p>

            {/* Cards Grid */}
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className="
              relative 
              w-full 
              h-auto 
              rounded-xl 
              border 
              border-black/[0.1] 
              dark:border-white/[0.2] 
              bg-gray-50 
              dark:bg-black 
              p-6 
              shadow-sm 
              transition-transform 
              duration-300 
              hover:-translate-y-1 
              hover:shadow-xl
            "
                    >
                        {/* Title */}
                        <h3 className="text-xl font-bold text-neutral-600 dark:text-white">
                            {card.title}
                        </h3>
                        {/* Description */}
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                            {card.description}
                        </p>
                        {/* Image */}
                        <div className="mt-4 w-full">
                            <Image
                                src={card.imgUrl}
                                alt={card.title}
                                width={1000}
                                height={1000}
                                className="
                  h-60 
                  w-full 
                  rounded-xl 
                  object-cover 
                  transition 
                  duration-300 
                  hover:opacity-90
                "
                            />
                        </div>
                        {/* Tech Stack */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {card.techStack.map((tech, techIndex) => (
                                <span
                                    key={techIndex}
                                    className="
                    text-xs 
                    font-semibold 
                    px-3 
                    py-1 
                    rounded-full 
                    border 
                    shadow-sm 
                    transition-transform 
                    hover:scale-105 
                    hover:shadow-md
                  "
                                    style={{
                                        backgroundColor: "var(--secondary)",
                                        color: "var(--secondary-foreground)",
                                        borderColor: "var(--border)",
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {/* Live Link */}
                        <div className="mt-4 flex items-center justify-end">
                            <Link href={card.link} target="__blank" className="inline-flex items-center">
                                <Button className="font-bold text-center bg-white text-black">
                                    Live Link <ExternalLink className="ml-2 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
