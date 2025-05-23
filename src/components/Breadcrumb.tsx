'use client';

import Link from 'next/link';

interface BreadcrumbItem {
    name: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="text-sm text-gray-600 dark:text-neutral-400 my-5" aria-label="Breadcrumb">
            <ol className="list-reset flex flex-wrap space-x-1">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {item.href ? (
                            <Link href={item.href} className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">
                                {item.name}
                            </Link>
                        ) : (
                            <span className="text-gray-800 dark:text-neutral-100 font-medium">{item.name}</span>
                        )}
                        {index < items.length - 1 && (
                            <span className="mx-2 text-gray-400 dark:text-neutral-600">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
