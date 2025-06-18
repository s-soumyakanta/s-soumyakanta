"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Cross2Icon } from "@radix-ui/react-icons";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SSSidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname();
    const links = [
        { href: "/", label: "Home" },
        { href: "/#about", label: "About" },
        { href: "/#works", label: "Works" },
        { href: "/resume", label: "Resume" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ];

    const handleLinkClick = (href: string) => {
        onClose();
        if (href.startsWith("/#")) {
            const id = href.split("#")[1];
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity md:hidden"
                    onClick={onClose}
                />
            )}
            <div
                className={`fixed md:hidden top-0 left-0 z-50 h-full w-4/5 max-w-xs transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:static md:w-72 bg-[hsl(var(--background))] dark:bg-[hsl(var(--background))]`}
            >
                <div className="flex flex-col overflow-y-auto px-3 py-4 h-full">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6 md:hidden">
                            <h2 className="text-xl font-bold text-[hsl(var(--foreground))] dark:text-white">
                                S Soumyakanta
                            </h2>
                            <button
                                onClick={onClose}
                                className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-100 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 rounded-full"
                                type="button"
                                aria-label="Close menu"
                            >
                                <Cross2Icon style={{ color: "white" }} />
                            </button>
                        </div>
                        <nav className="space-y-4">
                            {links.map((link) => {
                                const isActive =
                                    pathname === link.href || (pathname === "/" && link.href === "/");
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => handleLinkClick(link.href)}
                                        className={`flex items-center justify-center h-14 px-4 py-3 text-base font-medium text-center transition-colors duration-200 cursor-pointer ${isActive
                                            ? "text-[hsl(var(--primary))]"
                                            : "text-[hsl(var(--foreground))]"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SSSidebar;