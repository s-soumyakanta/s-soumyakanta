"use client";

import { ReactNode, useEffect } from "react";
import "../../styles/index.css";

export default function BlogLayout({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Define the adjustIframeSize function on the window object
        if (typeof window !== 'undefined') {
            window.adjustIframeSize = (id: string, newHeight: string) => {
                const iframe = document.getElementById(id);
                if (iframe) {
                    iframe.style.height = `${parseInt(newHeight, 10)}px`;
                }
            };
        }

        // Cleanup to avoid memory leaks
        return () => {
            if (typeof window !== 'undefined' && window.adjustIframeSize) {
                delete window.adjustIframeSize;
            }
        };
    }, []);

    return <>{children}</>;
}

// Extend the Window interface to include our custom function
declare global {
    interface Window {
        adjustIframeSize?: (id: string, newHeight: string) => void;
    }
}