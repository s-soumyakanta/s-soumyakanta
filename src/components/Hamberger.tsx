"use client"
import { useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import NavLinks from "./NavLinks"


export default function Hamburger() {
    const [isOpen,setIsOpen] = useState(false)
    const hamburgerLineClass = `h-1 w-full my-0.5 rounded-md bg-black transition ease transform duration-300`
  return (
     <>
       <button className="flex flex-col h-full w-full  justify-center items-center"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`${hamburgerLineClass} ${
          isOpen
            ? "rotate-45 translate-y-1 opacity-80"
            : "opacity-90"
        }`}
      />
    
      <div
        className={`${hamburgerLineClass} ${
          isOpen
            ? "-rotate-45 -translate-y-1 opacity-80 "
            : "opacity-90"
        }`}
      />
       </button>
       {
        isOpen && createPortal(
          <div className=" bg-white sticky bottom-0 bg-opacity-30 z-20 backdrop-filter backdrop-blur-sm left-0 w-full h-screen lg:hidden" onClick={() => setIsOpen(false)}>
            <div className="h-full flex items-end">
             <NavLinks />
            </div>
          </div>,document.body
        )
       }
     </>

  )
}