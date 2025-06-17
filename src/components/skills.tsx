import Image from "next/image";
import Link from "next/link";
import { Award, Code, Database, Server, Palette, Shield, Cloud, BookOpen, ExternalLink } from "lucide-react";

// Base types for flexibility
type SkillCategory = "frontend" | "backend" | "database" | "devops" | "design" | "other";

type BaseSkill = {
    name: string;
    src: string;
    alt: string;
    width?: number;
    height?: number;
    category: SkillCategory;
};

type Certification = {
    name: string;
    issuer: string;
    credentialUrl?: string;
    imageUrl?: string;
    issueDate?: string;
    expiryDate?: string;
};

type Skill = BaseSkill & {
    certifications?: Certification[];
};

type StandaloneCertification = Certification & {
    icon?: string;
    description?: string;
};

// Category configuration
const categoryConfig = {
    frontend: { icon: Code, label: "Frontend", color: "bg-blue-600" },
    backend: { icon: Server, label: "Backend", color: "bg-green-600" },
    database: { icon: Database, label: "Database", color: "bg-purple-600" },
    devops: { icon: Cloud, label: "DevOps", color: "bg-orange-600" },
    design: { icon: Palette, label: "Design", color: "bg-pink-600" },
    other: { icon: Shield, label: "Other", color: "bg-gray-600" },
};

const skills: Skill[] = [
    {
        name: "TypeScript",
        src: "/icons/typescript.svg",
        alt: "TypeScript",
        width: 60,
        height: 60,
        category: "frontend",
        certifications: [
            {
                name: "Learn TypeScript",
                issuer: "Scrimba",
                credentialUrl: "https://scrimba.com/certificate-cert2uNje7fs8fxtZsgns7abfw6WAeKDva1wgMG",
                issueDate: "April 2025",
            },
        ],
    },
    {
        name: "JavaScript",
        src: "/icons/javascript.svg",
        alt: "JavaScript",
        width: 60,
        height: 60,
        category: "frontend",
        certifications: [
            {
                name: "Learn JavaScript",
                issuer: "Scrimba",
                credentialUrl: "https://scrimba.com/certificate-cert2CsEjr6BTCzyYTtbwq2SMPEScCufYUwSyz",
                issueDate: "June 2025",
            },
        ],
    },
    {
        name: "React",
        src: "/icons/react.svg",
        alt: "React",
        width: 60,
        height: 60,
        category: "frontend",
        certifications: [
            {
                name: "Learn React",
                issuer: "Scrimba",
                credentialUrl: "https://scrimba.com/certificate-cert2CsEjr6BTCzyYTtbwq2N8t3U5tzAm6nYxG",
                issueDate: "June 2025",
            },
            {
                name: `What's New In React 19?`,
                issuer: "Scrimba",
                credentialUrl: "https://scrimba.com/certificate-cert2uNje7fs8fxtZsgns7abgBUh3jWWicgMRja",
                issueDate: "March 2025",
            },
        ],
    },
    {
        name: "Next.js",
        src: "/icons/nextjs.svg",
        alt: "Next.js",
        width: 60,
        height: 60,
        category: "frontend",
    },
    {
        name: "Tailwind CSS",
        src: "/icons/tailwind.svg",
        alt: "Tailwind CSS",
        width: 60,
        height: 60,
        category: "frontend",
    },
    {
        name: "Node.js",
        src: "/icons/nodejs.svg",
        alt: "Node.js",
        width: 60,
        height: 60,
        category: "backend",
    },
    {
        name: "MongoDB",
        src: "/icons/mongodb.svg",
        alt: "MongoDB",
        width: 60,
        height: 60,
        category: "database",
    },
    {
        name: "MySQL",
        src: "/icons/mysql.svg",
        alt: "MySQL",
        width: 60,
        height: 60,
        category: "database",
    },
    {
        name: "Golang",
        src: "/icons/golang.svg",
        alt: "Golang",
        width: 60,
        height: 60,
        category: "backend",
    }, {
        name: "CLI",
        src: "/icons/cli.svg", // Placeholder; replace with actual CLI icon path
        alt: "Command Line Interface",
        width: 60,
        height: 60,
        category: "other",
        certifications: [
            {
                name: "Command Line Basics",
                issuer: "Scrimba",
                credentialUrl: "https://scrimba.com/certificate-cert22z7m4z2fLjtQRg7LTXaSQgpFb4Qe1UQ42GQmGiPY8NN",
                issueDate: "May 2025",
            },
        ],
    },
];

// Standalone certifications (not tied to specific skills)
const standaloneCertifications: StandaloneCertification[] = [
    {
        name: "Postman API Fundamentals Student Expert",
        issuer: "Postman",
        credentialUrl: "https://api.badgr.io/public/assertions/heZW4cLtTWKhKW29sqPgAw",
        issueDate: "March 2025",
    },
    {
        name: "Cloud Community Day Bhubaneswar 2025",
        issuer: "GDG & GDG Cloud Bhubaneswar",
        credentialUrl: "https://gdgcloud.codenomix.com//view-cert.php?id=183",
        issueDate: "May 2025"
    },
];

export default function Skills() {
    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<SkillCategory, Skill[]>);

    return (
        <section id="skills" className="min-h-screen flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-6xl">
                {/* Header */}
                <h2 className="mb-2 text-3xl md:text-4xl font-bold tracking-tight text-white text-center">
                    Skills & Certifications
                </h2>
                <p className="mb-8 text-center text-base md:text-lg font-light text-white">
                    A comprehensive overview of my technical expertise and professional certifications.
                </p>

                {/* Skills by Category */}
                <div className="space-y-12 mb-16">
                    {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
                        const config = categoryConfig[category as SkillCategory];
                        const IconComponent = config.icon;

                        return (
                            <div key={category} className="space-y-5">
                                {/* Category Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`${config.color} p-2 rounded-lg`}>
                                        <IconComponent className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white">
                                        {config.label}
                                    </h3>
                                    <div className="flex-1 h-px bg-gray-700 ml-4" />
                                </div>

                                {/* Skills Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categorySkills.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className="relative w-full h-auto rounded-xl border border-gray-700 bg-black p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                                        >
                                            {/* Skill Header */}
                                            <h3 className="text-xl font-bold text-white">
                                                {skill.name}
                                            </h3>
                                            {/* Image */}
                                            <div className="mt-4 w-full h-32 relative">
                                                <Image
                                                    src={skill.src}
                                                    alt={skill.alt}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="rounded-xl object-contain transition duration-300 hover:opacity-90"
                                                    loading="lazy"
                                                    quality={75}
                                                />
                                            </div>
                                            {/* Certifications */}
                                            {skill.certifications && skill.certifications.length > 0 && (
                                                <div className="mt-4 space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <Award className="w-4 h-4 text-yellow-500" />
                                                        <span className="text-sm font-medium text-white">
                                                            Certifications ({skill.certifications.length})
                                                        </span>
                                                    </div>
                                                    {skill.certifications.map((cert, index) => (
                                                        <Link
                                                            key={index}
                                                            href={cert.credentialUrl || '#'}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`block rounded-xl p-3 transition-colors ${cert.credentialUrl ? 'bg-white text-black hover:bg-gray-200 cursor-pointer' : 'bg-black text-white'}`}
                                                        >
                                                            <div className="flex items-start justify-between gap-2">
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-medium truncate">
                                                                        {cert.name}
                                                                    </p>
                                                                    <p className="text-xs">
                                                                        {cert.issuer}
                                                                        {cert.issueDate && ` • ${cert.issueDate}`}
                                                                    </p>
                                                                </div>
                                                                {cert.credentialUrl && (
                                                                    <ExternalLink className="w-3 h-3 text-black flex-shrink-0" />
                                                                )}
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Certifications Section */}
                {standaloneCertifications.length > 0 && (
                    <div className="space-y-5">
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-indigo-600 p-2 rounded-lg">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white">
                                Additional Certifications
                            </h3>
                            <div className="flex-1 h-px bg-gray-700 ml-4" />
                        </div>

                        {/* Certifications Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {standaloneCertifications.map((cert, index) => (
                                <Link
                                    key={index}
                                    href={cert.credentialUrl || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`block rounded-xl p-6 shadow-sm border border-gray-700 transition-all duration-300 ${cert.credentialUrl ? 'bg-white text-black hover:bg-gray-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer' : 'bg-black text-white'}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                                                <Award className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h4 className="font-semibold text-sm leading-tight">
                                                    {cert.name}
                                                </h4>
                                                {cert.credentialUrl && (
                                                    <ExternalLink className="w-4 h-4 text-black flex-shrink-0" />
                                                )}
                                            </div>
                                            <p className="text-xs mb-2">
                                                {cert.issuer}
                                                {cert.issueDate && ` • Issued ${cert.issueDate}`}
                                                {cert.expiryDate && ` • Expires ${cert.expiryDate}`}
                                            </p>
                                            {cert.description && (
                                                <p className="text-xs leading-relaxed">
                                                    {cert.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}