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

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        id="gtm-init"
        strategy="beforeInteractive"
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
      <body
        className={cn(
          "min-h-screen w-full text-foreground font-sans antialiased bg-[hsl(var(--background))]",
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
