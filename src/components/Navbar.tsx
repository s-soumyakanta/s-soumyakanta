import dynamic from "next/dynamic"
import ContactButton from "./ContactButton"
import ThemeToggle from "./ThemeToggle"



const DynamicHamburger = dynamic(() => import("./Hamberger"),{
    ssr:false,
  })
  
export const Navbar = () => {


    const Links = () => {
        return(
            <ul>
                <li>
                    About
                </li>

                <li>
                    Projects
                </li>

                <li>
                    Services
                </li>

                <li>
                    Blog
                </li>
            </ul>
        )
    }


    const Buttons = () => {
        return (
            <>
            <div className="  flex justify-center items-center">
                <ThemeToggle />
            </div>

            <div className="hidden lg:block">
                <ContactButton />
            </div>

            <div className=" w-8  flex justify-center items-centerlg:hidden ">
                <DynamicHamburger />
            </div>
            </>
        )
    }
    return (
      <nav className="flex justify-between items-center bg-white bg-opacity-60   p-5 shadow-lg sticky top-0 z-30 dark:bg-gray-900 ">
          <div className="text-lg font-bold">
              S Soumyakanta
          </div>
  
          <div>
              <div className="hidden lg:block">
                  <Links />
              </div>
  
              <div className="flex space-x-6 ">
                  <Buttons />
              </div>
          </div>
      </nav>
    )
  }
  