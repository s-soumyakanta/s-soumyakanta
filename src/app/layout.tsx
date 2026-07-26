import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans, JetBrains_Mono as FontMono } from "next/font/google";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleTagManager } from "@next/third-parties/google";

// Configure font with display: swap for better loading performance
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Add display swap for better font loading
  preload: true,   // Ensure font preloading
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "S Soumyakanta | Full Stack Developer",
  description: "Soumya (S Soumyakanta) - Versatile full stack developer specializing in React, Next.js, Node.js, and Golang from Bhubaneswar, India. Creating responsive web applications with modern technologies.",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: "Soumya, S Soumyakanta, full stack developer, React developer, Next.js, Node.js, Golang, Go programming, web development, Bhubaneswar, frontend developer, backend developer",
  // Add viewport metadata to help with responsive design
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(fontSans.variable, fontMono.variable)}
    >
      <head>
        <meta name="theme-color" content="#000000" />
        {/* Add preconnect hints for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Add content size dimensions to prevent layout shift */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --min-height-body: 100vh;
            }
            body {
              min-height: var(--min-height-body);
            }
          `
        }} />
      </head>
      <body
        className={cn(
          "min-h-screen w-full text-foreground font-sans antialiased bg-[hsl(var(--background))]",
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark" // Monochrome matte surface only — there is no light variant
          enableSystem={false}
          disableTransitionOnChange // Add this to prevent flicker during theme transitions
        >
          {children}
        </ThemeProvider>
        <GoogleTagManager gtmId="GTM-NRMNQ5M5" />
      </body>
    </html>
  );
}
