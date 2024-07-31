"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./dark-mode";

export default function Navbar() {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingTimeout, setScrollingTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          setScrollingDown(true);
          if (scrollingTimeout) {
            clearTimeout(scrollingTimeout);
          }
          const timeout: NodeJS.Timeout = setTimeout(() => {
            setScrollingDown(false);
          }, 300); // Adjust this timeout as needed
          setScrollingTimeout(timeout);
        } else {
          setScrollingDown(false);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollingTimeout) {
        clearTimeout(scrollingTimeout);
      }
    };
  }, [lastScrollY, scrollingTimeout]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        scrollingDown ? "-translate-y-full" : "translate-y-0"
      } backdrop-blur-md bg-white/70 dark:bg-slate-950`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-14 items-center">
          <Link
            href="/"
            className="mr-auto flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <span>S Soumyakanta</span>
          </Link>
          <nav className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <Link href="/contact">
              <Button>Contact</Button>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
