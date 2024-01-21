import Link from "next/link";
import Button from "../components/Button";
import { NavList } from "./Navbar";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <div className="w-full mt-36 min-h-screen flex items-center justify-center bg-gray-950 py-10">
        <div className="md:w-2/3 w-full px-4 text-white flex flex-col">
          <div className="w-full text-7xl font-bold">
            <h1 className="w-full md:w-2/3">
              How can I help you? Feel free to reach out!
            </h1>
          </div>
          <div className="flex mt-8 flex-col md:flex-row md:justify-between">
            <p className="w-full md:w-2/3 text-gray-400">
              Got questions, suggestions, or just want to chat? I&apos;m all
              ears! Whether it&apos;s about React front-end development,
              troubleshooting, or you just want to say hi, feel free to shoot me
              a message. I love hearing from you and am here to help with
              anything you need. Your feedback is valuable, so don&apos;t
              hesitate to drop me a line anytime!{" "}
            </p>
            <div className="w-44 pt-6 md:pt-0">
              <Button name="contact" link="/contact" active={true} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex mt-24 mb-12 flex-row justify-between">
              <div>
                <Link href="/" className="cursor-pointer font-bold text-xl">
                  S Soumyakanta
                </Link>
              </div>

              <div>
                <NavList />
              </div>
            </div>
            <hr className="border-gray-600" />
            <p className="w-full text-center my-12 text-gray-600">
              Copyright © {year} |{" "}
              <a href="https://github.com/s-soumyakanta">S Soumyakanta</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
