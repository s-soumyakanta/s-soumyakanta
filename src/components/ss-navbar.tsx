"use client"

import * as React from "react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { useBoolean } from "@/hooks/useBoolean"
import Sidebar from "./ss-sidebar"
import { ModeToggle } from "./dark-mode-btn"
// import { ModeToggle } from "./dark-mode-btn"  // commented out for brevity

export default function SSNavbar() {
    const { value: isSidebarOpen, onToggle: toggleSidebar, onFalse: closeSidebar } = useBoolean(false)
    const [scrollingDown, setScrollingDown] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [scrollingTimeout, setScrollingTimeout] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setScrollingDown(true)
                if (scrollingTimeout) clearTimeout(scrollingTimeout)
                const timeout: NodeJS.Timeout = setTimeout(() => setScrollingDown(false), 300)
                setScrollingTimeout(timeout)
            } else {
                setScrollingDown(false)
            }
            setLastScrollY(window.scrollY)
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (scrollingTimeout) clearTimeout(scrollingTimeout)
        }
    }, [lastScrollY, scrollingTimeout])

    return (
        <>
            <nav
                className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ${scrollingDown ? "-translate-y-full" : "translate-y-0"
                    } backdrop-blur-md bg-[hsl(var(--background)/0.7)] dark:bg-[hsl(var(--background)/0.7)] 
           border-b border-[hsl(var(--border))]`}
            >
                <div className="container mx-auto p-2 px-4 md:px-6">
                    <div className="flex h-14 items-center">
                        <Link
                            href="/"
                            className="mr-auto flex items-center gap-2 text-lg lg:text-2xl font-semibold text-[hsl(var(--foreground))]"
                            prefetch={false}
                        >
                            S Soumyakanta
                        </Link>
                        <div className="mx-auto hidden md:block">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <Link href="/" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Home
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/#about" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                About
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/#works" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Works
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link href="/blog" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Blog
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                        <nav className="ml-auto flex items-center space-x-4">
                            {/* 
                ModeToggle or other controls would go here.
                <ModeToggle /> 
              */}
                            <div className="hidden md:block">
                                <Link href="/contact">
                                    <Button className="cursor-pointer bg-white text-black">
                                        Contact
                                    </Button>
                                </Link>
                            </div>
                            <div className="block md:hidden">
                                {/* 
                  Use the same ring classes from Sidebar’s close button:
                */}
                                <Button
                                    onClick={toggleSidebar}
                                    size="icon"
                                    className="
                    p-2 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-gray-400 
                    dark:focus:ring-gray-100
                    text-gray-500 
                    dark:text-gray-400 
                    hover:text-gray-700 
                    dark:hover:text-gray-200 
                    transition-colors 
                    duration-200 
                    rounded-lg
                  "
                                >
                                    <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </div>
                        </nav>
                    </div>
                </div>
            </nav>
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        </>
    )
}
