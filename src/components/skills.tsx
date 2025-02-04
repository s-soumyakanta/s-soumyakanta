import Image from "next/image";

type Skill = {
    name: string;
    src: string;
    alt: string;
    width?: number;
    height?: number;
};

const skills: Skill[] = [
    {
        name: "Tailwind CSS",
        src: "/icons/tailwind.svg",
        alt: "Tailwind CSS",
        width: 60,
        height: 60,
    },
    {
        name: "Node.js",
        src: "/icons/nodejs.svg",
        alt: "Node.js",
        width: 60,
        height: 60,
    },
    {
        name: "TypeScript",
        src: "/icons/typescript.svg",
        alt: "TypeScript",
        width: 60,
        height: 60,
    },
    {
        name: "React",
        src: "/icons/react.svg",
        alt: "React",
        width: 60,
        height: 60,
    },
    {
        name: "MongoDB",
        src: "/icons/mongodb.svg",
        alt: "MongoDB",
        width: 60,
        height: 60,
    },
    {
        name: "Next.js",
        src: "/icons/nextjs.svg",
        alt: "Next.js",
        width: 60,
        height: 60,
    },
    {
        name: "Golang",
        src: "/icons/golang.svg",
        alt: "Golang",
        width: 60,
        height: 60,
    },
    {
        name: "MySQL",
        src: "/icons/mysql.svg",
        alt: "MySQL",
        width: 60,
        height: 60,
    },
];

export default function Skills() {
    return (
        <section className="w-full py-12 lg:py-24">
            <div className="container mx-auto px-4 md:px-6 text-center ">
                <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100 md:text-4xl">
                    Skills
                </h2>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                    Some of the technologies I&apos;ve been working with recently.
                </p>

                {/* Skills Grid */}
                <div
                    className="
            mt-10
            grid 
            grid-cols-2
            gap-8
            sm:grid-cols-3
            md:grid-cols-4
            place-items-center
            max-w-3xl
            flex items-center justify-center mx-auto
          "
                >
                    {skills.map((skill) => (
                        <div
                            key={skill.name}
                            className="
                group 
                flex 
                w-24 
                flex-col 
                items-center
                rounded-lg 
                bg-white 
                p-4 
                shadow-sm
                transition-all 
                duration-300 
                hover:-translate-y-1 
                hover:shadow-md
                dark:bg-white
                dark:bg-opacity-10
              "
                        >
                            <Image
                                src={skill.src}
                                alt={skill.alt}
                                width={skill.width}
                                height={skill.height}
                                className="mx-auto"
                            />
                            <p
                                className="
                  mt-2
                  text-sm 
                  font-medium 
                  text-gray-700
                  transition-colors 
                  group-hover:text-gray-900 
                  dark:text-gray-300 
                  dark:group-hover:text-gray-100
                "
                            >
                                {skill.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
