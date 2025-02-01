import React from 'react';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGithub,
    faLinkedin,
    faXTwitter,
    faYoutube
} from '@fortawesome/free-brands-svg-icons';
import CurrentYear from "./cureent-year";

export default function Footer() {
    return (
        <footer className="bg-[hsl(var(--background))] dark:bg-[hsl(var(--background))] mt-4 rounded-lg shadow border-t border-[hsl(var(--border))]">
            <div className="container mx-auto p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))]">
                                S Soumyakanta
                            </span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-[hsl(var(--foreground))] uppercase dark:text-[hsl(var(--foreground))]">
                                Links
                            </h2>
                            <ul className="text-sm text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))] font-normal">
                                <li className="mb-4">
                                    <Link href="/#about" className="hover:underline">
                                        About
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/#works" className="hover:underline">
                                        Works
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/blog" className="hover:underline">
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-[hsl(var(--foreground))] uppercase dark:text-[hsl(var(--foreground))]">
                                Let&apos;s Connect
                            </h2>
                            <ul className="text-sm text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))] font-normal">
                                <li className="mb-4">
                                    <a
                                        href="https://github.com/s-soumyakanta"
                                        className="hover:underline flex items-center gap-2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                                        Github
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="https://www.linkedin.com/in/s-soumyakanta"
                                        className="hover:underline flex items-center gap-2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
                                        Linkedin
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="https://twitter.com/s_soumyakanta"
                                        className="hover:underline flex items-center gap-2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FontAwesomeIcon icon={faXTwitter} className="w-4 h-4" />
                                        X
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="https://youtube.com/@s-soumyakanta"
                                        className="hover:underline flex items-center gap-2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FontAwesomeIcon icon={faYoutube} className="w-4 h-4" />
                                        YouTube
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 flex items-center">
                        &copy; <CurrentYear /> S Soumyakanta - All rights reserved.
                    </span>
                    <div className="flex mt-4 sm:mt-0 sm:justify-center">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                            Made with love in Odisha, India.
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}