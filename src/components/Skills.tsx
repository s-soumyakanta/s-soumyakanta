import OrbitingCircles from "@/components/magicui/orbiting-circles";
import Image from 'next/image';

const Skills = () => {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background text-foreground md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        Skills
      </span>

      {/* Inner Circle */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={80}
      >
        <Image src="/icons/tailwind.svg" alt="Tailwind CSS" width={30} height={30} />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <Image src="/icons/nodejs.svg" alt="Nodejs" width={30} height={30} />
      </OrbitingCircles>

      {/* Middle Circle */}
      <OrbitingCircles
        className="size-[40px] border-none bg-transparent"
        radius={140}
        duration={25}
        delay={10}
        reverse
      >
        <Image src="/icons/typescript.svg" alt="Typescript" width={40} height={40} />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[40px] border-none bg-transparent"
        radius={140}
        duration={25}
        delay={20}
        reverse
      >
        <Image src="/icons/react.svg" alt="React" width={40} height={40} />
      </OrbitingCircles>

      {/* Outer Circle */}

      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={200}
        duration={30}
        delay={10}
      >
        <Image src="/icons/mongodb.svg" alt="MongoDB" width={50} height={50} />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none"
        radius={200}
        duration={30}
        delay={20}
      >
        <Image src="/icons/nextjs.svg" alt="Nextjs" width={50} height={50} />
      </OrbitingCircles>
    </div>
  );
};

export default Skills;
