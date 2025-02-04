"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";

export default function EmailMe() {
    return (
        <section className="flex justify-center md:mt-40 md:mb-44 mb-40 mt-40">
            <div className="max-w-3xl p-6 shadow-none">
                <div className="text-center">
                    <h2 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Get in Touch
                    </h2>
                    <p className="mb-6 text-base md:text-lg font-normal text-gray-700 dark:text-gray-400">
                        If you have any questions or would like to work together, feel free to reach out!
                    </p>
                    <Link href="mailto:contact@s-soumyakanta.com">
                        <Button className="space-x-1 text-black bg-white ">
                            <Mail width="18px" /> <p className="font-semibold">Send an Email</p>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
