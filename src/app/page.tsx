import Landing from "@/components/landing";

// The root page is a single, fixed viewport — no scrolling in either axis.
// Scoped to this route: the style element is removed when the page unmounts.
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

const LandingPage = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: VIEWPORT_LOCK }} />
      <Landing />
    </>
  );
};

export default LandingPage;
