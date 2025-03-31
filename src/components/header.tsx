"use client";

import { usePathname } from "next/navigation";
import { PublicationNavbarItem } from "../generated/graphql";
import { Container } from "./container";
import { useAppContext } from "./contexts/appContext";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

function hasUrl(
	navbarItem: PublicationNavbarItem
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

export const Header = () => {
	const { publication } = useAppContext();
	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	const pathname = usePathname();

	// Check if we're on the blog page
	const isOnBlogPage = pathname === "/blog";

	return (
		<header
			className={`${isOnBlogPage ? "mt-2" : "mt-20"
				} w-full mx-auto bg-slate-950 py-3 rounded-sm ${isOnBlogPage ? "dark:bg-neutral-900" : "dark:bg-neutral-900"}`}
		>
			<Container className="flex  md:max-w-3xl items-center justify-between px-6">
				<div className="flex-1 overflow-x-auto no-scrollbar pr-4">
					<nav className="flex">
						<ul className="flex flex-row items-center gap-4 text-white whitespace-nowrap">
							{navbarItems.map((item) => (
								<li key={item.url}>
									<a
										href={item.url}
										rel="noopener noreferrer"
										className="block px-4 py-2 rounded-md text-sm font-medium bg-slate-900 border border-slate-700 shadow-sm transition-all hover:bg-white hover:border-slate-600 active:transform active:scale-95 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-white dark:hover:text-black dark:hover:border-neutral-600"
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>

				{!isOnBlogPage && (
					<div className="ml-4 shrink-0">
						<Link
							href="/blog"
							className="flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium bg-white text-black border border-blue-100 shadow-sm transition-all active:transform active:scale-95 whitespace-nowrap"
						>
							<ChevronLeft size={16} />
							<span>Blog</span>
						</Link>
					</div>
				)}
			</Container>
		</header>
	);
};
