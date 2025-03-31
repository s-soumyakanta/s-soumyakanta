"use client";

import { ReactNode, useEffect } from "react";
import "../../styles/index.css"; // Adjust the path if needed

export default function BlogLayout({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Global function for adjusting iframe height
        (window as unknown as { adjustIframeSize?: (id: string, newHeight: string) => void }).adjustIframeSize =
            (id: string, newHeight: string) => {
                const iframe = document.getElementById(id);
                if (iframe) {
                    iframe.style.height = `${parseInt(newHeight, 10)}px`; // ✅ Fixed radix issue
                }
            };
    }, []);

    return <>{children}</>;
}
