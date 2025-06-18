import Image from "next/image";
import Link from "next/link";
import { Briefcase, ExternalLink, Calendar, MapPin } from "lucide-react";

type Experience = {
    company: string;
    logoSrc?: string;
    jobTitle: string;
    employmentType: string;
    startDate: string;
    endDate: string;
    duration: string;
    location: string;
    description: string[];
    techStack: string[];
    certificateUrl?: string;
};

const experiences: Experience[] = [
    {
        company: "Qwegle",
        logoSrc: "/images/qwegle.webp",
        jobTitle: "Software Developer Engineer I",
        employmentType: "Full-time",
        startDate: "Sep 2024",
        endDate: "Feb 2025",
        duration: "6 Months",
        location: "Bhubaneswar, Odisha, India · On-site",
        description: [
            "<strong>Employee Monitoring Software (EMS):</strong>",
            "● Built an Employee Monitoring desktop application using Electron.js framework.",
            "● Implemented performance tracking features including activity logging and productivity metrics.",
            "<strong>Amazon SP API Integration:</strong>",
            "● Developed user authentication backend with Node.js, Express.js, and MongoDB for secure login flows.",
            "● Integrated Amazon SP API into the system and deployed APIs using AWS Lambda functions.",
        ],
        techStack: ["TypeScript", "Amazon S3", "Electron.js", "Node.js", "Express.js", "MongoDB", "AWS Lambda", "Amazon SP API"]
    },
    {
        company: "FIGHTRIGHT Technologies",
        logoSrc: "/images/fr.webp",
        jobTitle: "Full Stack Developer",
        employmentType: "Internship",
        startDate: "Feb 2024",
        endDate: "Sep 2024",
        duration: "8 Months",
        location: "Bhubaneswar, Odisha, India · On-site",
        description: [
            "<strong>Case Management System (CMS):</strong>",
            "● Developed a CMS, focused on Claim & Task Management using Next.js, Express.js, TypeORM, and MySQL.",
            "● Designed an intuitive admin dashboard, boosting task efficiency and operational productivity.",
            "<strong>AI-Powered Chat Application (\"Talk To Data\"):</strong>",
            "● Built an AI-driven chat app for case document interaction using Vercel AI, LlamaIndex, and Pinecone.",
            "● Enhanced data accessibility with document chunking and AI-based retrieval, improving user engagement."
        ],
        techStack: ["TypeScript", "Amazon S3", "Next.js", "Express.js", "TypeORM", "MySQL", "Vercel AI", "LlamaIndex", "Pinecone"]
    },
];

export default function Experience() {
    const CompanyIcon = ({ company }: { company: string }) => (
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white flex items-center justify-center shadow-lg">
            <span className="text-black font-bold text-xs sm:text-sm">{company.charAt(0)}</span>
        </div>
    );

    return (
        <section id="experience" className="min-h-screen py-8 sm:py-16 px-4 my-20">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
                        Work <span className="text-white">Experience</span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base lg:text-lg">Building innovative solutions across different domains</p>
                </div>

                {/* Experience Grid */}
                <div className="space-y-4 sm:space-y-6">
                    {experiences.map((exp, index) => (
                        <div key={index} className="group relative">
                            <div className="bg-black backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-white/10">

                                {/* Header Row - Now Responsive */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        {exp.logoSrc ? (
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl overflow-hidden bg-white/10 p-0.5 sm:p-1 flex-shrink-0">
                                                <Image
                                                    src={exp.logoSrc}
                                                    alt={exp.company}
                                                    width={32}
                                                    height={32}
                                                    className="w-full h-full object-contain rounded-md sm:rounded-lg"
                                                />
                                            </div>
                                        ) : (
                                            <CompanyIcon company={exp.company} />
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white group-hover:text-gray-300 transition-colors leading-tight">
                                                {exp.jobTitle}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-300 font-medium">{exp.company}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right">
                                        <div className="px-2 sm:px-3 py-1 bg-white/20 text-white text-xs sm:text-sm rounded-full mb-0 sm:mb-1">
                                            {exp.employmentType}
                                        </div>
                                        <div className="text-gray-400 text-xs sm:text-sm">{exp.duration}</div>
                                    </div>
                                </div>

                                {/* Meta Info - Responsive Stack */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-4 text-xs sm:text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                        <span className="truncate">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm leading-tight">{exp.location}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-4 text-gray-300 space-y-1 sm:space-y-2">
                                    {exp.description.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="text-xs sm:text-sm leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: item }}
                                        />
                                    ))}
                                </div>

                                {/* Tech Stack & Certificate - Responsive Layout */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">
                                    <div className="flex flex-wrap gap-1 sm:gap-2 flex-1">
                                        {exp.techStack.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="px-2 py-1 bg-gray-800/60 text-gray-300 text-xs rounded-md hover:bg-white/10 hover:text-white transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {exp.certificateUrl && (
                                        <Link href={exp.certificateUrl} target="_blank" rel="noopener noreferrer">
                                            <div className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 bg-white hover:bg-gray-200 text-black text-xs sm:text-sm rounded-lg transition-colors group/btn sm:ml-4">
                                                <span>Certificate</span>
                                                <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}