"use client";

import { ReactNode, useEffect } from "react";
import "../../styles/index.css";

export default function BlogLayout({ children }: { children: ReactNode }) {
    useEffect(() => {
        window.adjustIframeSize = (id: string, newHeight: string) => {
            const iframe = document.getElementById(id);
            if (iframe) {
                iframe.style.height = `${parseInt(newHeight, 10)}px`;
            }
        };

        // Cleanup to avoid memory leaks
        return () => {
            delete window.adjustIframeSize;
        };
    }, []);

    return <>{children}</>;
}