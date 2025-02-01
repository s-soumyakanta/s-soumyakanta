"use client"

import * as React from "react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu"
import { ModeToggle } from "./dark-mode-btn"
import Sidebar from "./sidebar"
import { useBoolean } from "@/hooks/useBoolean"

export default function Navbar() {
    const { value: isSidebarOpen, onToggle: toggleSidebar, onFalse: closeSidebar } = useBoolean(false)
    const [scrollingDown, setScrollingDown] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [scrollingTimeout, setScrollingTimeout] =
        useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== "undefined") {
                if (window.scrollY > lastScrollY) {
                    setScrollingDown(true)
                    if (scrollingTimeout) {
                        clearTimeout(scrollingTimeout)
                    }
                    const timeout: NodeJS.Timeout = setTimeout(() => {
                        setScrollingDown(false)
                    }, 300) // Adjust this timeout as needed
                    setScrollingTimeout(timeout)
                } else {
                    setScrollingDown(false)
                }
                setLastScrollY(window.scrollY)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (scrollingTimeout) {
                clearTimeout(scrollingTimeout)
            }
        }
    }, [lastScrollY, scrollingTimeout])

    return (
        <>
            <nav
                className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ${scrollingDown ? "-translate-y-full" : "translate-y-0"
                    } backdrop-blur-md bg-[hsl(var(--background)/0.7)] dark:bg-[hsl(var(--background)/0.7)] border-b border-[hsl(var(--border))]`}
            >
                <div className="container mx-auto px-4 md:px-6 p-2">
                    <div className="flex h-14 items-center">
                        <Link
                            href="/"
                            className="mr-auto flex items-center gap-2 text-lg font-semibold text-[hsl(var(--foreground))]"
                            prefetch={false}
                        >
                            S Soumyakanta
                        </Link>
                        <div className="mx-auto items-center hidden md:block">
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
                            <div>
                                <ModeToggle />
                            </div>
                            <div className="hidden md:block">
                                <Link href="/contact">
                                    <Button>Contact</Button>
                                </Link>
                            </div>
                            <div className="block md:hidden">
                                <Button variant="outline" size="icon" onClick={toggleSidebar}>
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
