import Link from "next/link";

export default function SSNavbar() {
    return (
        <nav className="border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]">
            <div className="container mx-auto p-2 px-4 md:px-6 max-w-8xl">
                <div className="flex h-14 items-center">
                    <Link
                        href="/"
                        className="flex items-center text-lg lg:text-2xl font-semibold text-[hsl(var(--foreground))]"
                        prefetch={false}
                    >
                        S Soumyakanta
                    </Link>
                </div>
            </div>
        </nav>
    );
}
