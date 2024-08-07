"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
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
    description: "A real time weather forecast web application",
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

const Works = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 mt-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Works</h2>
      <p className="text-base md:text-lg mb-8 text-center">
        Here are some of my recent projects. Click the links to see more
        details.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <CardContainer key={index} className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {card.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
              >
                {card.description}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src={card.imgUrl}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex flex-wrap gap-2 mt-4">
                {card.techStack.map((tech, techIndex) => (
                  <CardItem
                    key={techIndex}
                    translateZ="60"
                    className="text-xs font-semibold px-3 py-1 rounded-full border shadow-sm transition-transform transform hover:scale-105 hover:shadow-md"
                    style={{
                      backgroundColor: "var(--secondary)",
                      color: "var(--secondary-foreground)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {tech}
                  </CardItem>
                ))}
              </div>
              <div className="flex justify-end items-center mt-4">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={card.link}
                  target="__blank"
                >
                  <Button className="font-bold text-center">Live Link <ExternalLink className="w-4 ml-2" /></Button>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default Works;
