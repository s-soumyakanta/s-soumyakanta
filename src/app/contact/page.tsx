import Contact from "@/components/ss-contact";

// Locked to a single viewport, like the root page. Scoped to this route:
// the style element is removed when the page unmounts.
const VIEWPORT_LOCK = `
  html {
    color-scheme: dark;
    background: #0a0a0a;
  }
  html, body {
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    overscroll-behavior: none;
    background: #0a0a0a;
  }
`;

const Page = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: VIEWPORT_LOCK }} />
      <Contact />
    </>
  );
};

export default Page;
