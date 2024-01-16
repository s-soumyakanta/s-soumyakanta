"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { NavList } from "./Navbar";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerLineClass = `h-1 w-full my-0.5 rounded-md bg-black transition ease transform duration-300 dark:bg-white`;
  return (
    <>
      <button
        className="flex flex-col h-6 w-6 z-10 justify-center items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`${hamburgerLineClass} ${
            isOpen ? "rotate-45 translate-y-1 opacity-80" : "opacity-90"
          }`}
        />

        <div
          className={`${hamburgerLineClass} ${
            isOpen ? "-rotate-45 -translate-y-1 opacity-80 " : "opacity-90"
          }`}
        />
      </button>
      {isOpen &&
        createPortal(
          <div
            onClick={() => setIsOpen(false)}
            className="absolute top-0 bg-white h-full w-full dark:bg-black "
          >
            <div className="w-3/5 pt-12 bg-slate-300 h-full dark:bg-slate-950 dark:text-white">
              <NavList />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
