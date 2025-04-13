// app/blog/iframe-resizer.tsx
'use client';

import { useEffect } from 'react';

export default function IframeResizer() {
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

    return null; // This component doesn't render anything
}

// Extend the Window interface to include our custom function
declare global {
    interface Window {
        adjustIframeSize?: (id: string, newHeight: string) => void;
    }
}