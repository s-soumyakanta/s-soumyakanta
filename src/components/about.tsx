import Image from "next/image";

const About = () => {
    return (
        <section id="about" className="w-full py-12 lg:py-24 ">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                    {/* Image Section */}
                    <div className="md:w-1/2 flex justify-center">
                        <div className="max-w-sm overflow-hidden rounded-lg shadow-lg">
                            <Image
                                src="/images/profile.png"
                                width={250}
                                height={250}
                                alt="Picture of S Soumyakanta"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="md:w-1/2 flex flex-col justify-center space-y-4 text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                            About Me
                        </h2>
                        <p className="leading-relaxed">
                            Hello! I&apos;m Soumyakanta, a self-taught full-stack developer with
                            a passion for creating dynamic and responsive web applications. My
                            journey into web development began with experimenting with blog
                            templates, sparking a curiosity about the inner workings of websites.
                            Over time, I have honed my skills in both front-end and back-end
                            development, specializing in React, Next.js, Node.js, and various
                            modern tools and frameworks. I am dedicated to continuous learning
                            and leveraging my technical expertise to deliver robust and scalable
                            solutions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
