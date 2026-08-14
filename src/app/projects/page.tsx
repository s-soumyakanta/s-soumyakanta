// app/projects/page.tsx
import type { Metadata } from "next";
import SSProjects from "@/components/ss-projects";

const TITLE = "Projects — S Soumyakanta";
const DESCRIPTION =
  "Touch Typing Online — a free typing speed test platform for SSC CGL, SSC CHSL and RRB NTPC aspirants, with a free typing certificate on completion.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://s-soumyakanta.com/projects",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://s-soumyakanta.com/projects",
    type: "website",
    // Add a real 1200x630 image at /public/og-projects.png — it'll pick up here.
    images: ["/og-projects.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Touch Typing Online",
  url: "https://touchtyping.online",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any (Web)",
  description:
    "Free typing speed test platform for Indian government exam aspirants — SSC CGL, SSC CHSL and RRB NTPC — with a free typing certificate on completion.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  author: {
    "@type": "Person",
    name: "S Soumyakanta",
    url: "https://s-soumyakanta.com",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SSProjects />
    </>
  );
}
