import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/ss-navbar";
import Footer from "@/components/ss-footer";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

// Configure font with display: swap for better loading performance
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Add display swap for better font loading
  preload: true,   // Ensure font preloading
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
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
      <head>
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
            /* Reserve space for navbar and footer */
            main {
              min-height: calc(var(--min-height-body) - 160px);
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
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GTM-NRMNQ5M5');
            `,
          }}
        />
        <GoogleTagManager gtmId="GTM-NRMNQ5M5" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange // Add this to prevent flicker during theme transitions
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}