import dynamic from "next/dynamic";
import Link from "next/link";
import ContactButton from "./ContactButton";
import ThemeToggle from "./ThemeToggle";

const DynamicHamburger = dynamic(() => import("./Hamburger"), {
  ssr: false,
});

export const NavList = () => {
    return(
        <ul className="flex flex-col space-y-8 w-full justify-center items-center lg:space-y-0 lg:flex-row lg:space-x-12">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="#about">About</Link>
        </li>
        <li>
          <Link href="#work">Work</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
    )
}
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-lg lg:px-20 lg:py-5 dark:bg-black dark:text-white">
      <div>
        <p>
          <Link href="/">S Soumyakanta</Link>
        </p>
      </div>
      <div className="hidden lg:block">
        <div>
          <NavList />
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="flex space-x-8">
        <ThemeToggle />
        <ContactButton />
        </div>
      </div>
      <div className=" flex items-center justify-center space-x-4 lg:hidden">
        <ThemeToggle />
        <DynamicHamburger />
      </div>
    </nav>
  );
};

export default Navbar;
