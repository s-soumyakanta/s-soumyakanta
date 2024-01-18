import dynamic from "next/dynamic";
import Link from "next/link";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

const DynamicHamburger = dynamic(() => import("./Hamburger"), {
  ssr: false,
});

export const NavList = () => {
    return(
        <ul className="flex flex-col space-y-8 w-full justify-center items-center lg:text-lg lg:space-y-0 lg:flex-row lg:space-x-12">
        <li className="hover:font-semibold hover:text-lm-heading dark:hover:text-dm-heading">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:font-semibold hover:text-lm-heading dark:hover:text-dm-heading">
          <Link href="#about">About</Link>
        </li>
        <li className="hover:font-semibold hover:text-lm-heading dark:hover:text-dm-heading">
          <Link href="#work">Work</Link>
        </li>
        <li className="hover:font-semibold hover:text-lm-heading dark:hover:text-dm-heading">
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
    )
}
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-lg lg:px-20 lg:py-5 ">
      <div>
        <p className="font-bold text-xl lg:text-2xl">
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
        <Button name="Contact" active={true} link="/contact" />
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
