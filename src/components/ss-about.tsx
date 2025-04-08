import Image from "next/image";

export default function SSAbout() {
    return (
        <section
            id="about"
            className="w-full py-12 lg:py-24"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                    {/* Image Section */}
                    <div className="flex justify-center">
                        <div className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 md:max-w-sm">
                            <Image
                                src="/images/profile.webp"
                                width={400}
                                height={400}
                                alt="Picture of S Soumyakanta"
                                className="object-cover w-full h-full"
                                priority
                            />
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="flex flex-col space-y-5 text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white md:text-4xl">
                            About Me
                        </h2>
                        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                            Hello! I&apos;m <span className="font-semibold">Soumyakanta</span>,
                            a self-taught full-stack developer with a passion for creating
                            dynamic and responsive web applications. My journey into web
                            development began with experimenting on blog templates, which
                            sparked curiosity about how websites function behind the scenes.
                        </p>
                        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                            Over time, I&apos;ve honed my skills in both front-end and back-end
                            development, specializing in technologies such as{" "}
                            <span className="font-semibold">React, Next.js, Node.js</span>, and
                            various modern tools and frameworks. I&apos;m dedicated to
                            continuous learning and leveraging my technical expertise to
                            deliver robust and scalable solutions for clients and personal
                            projects alike.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
