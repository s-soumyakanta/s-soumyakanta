import Image from "next/image";
import Button from "./Button";
const LandingPage = () => {
  return (
    <div id="home" className="w-full h-[80vh] flex justify-center items-center max-w-7xl">
      <div className=" flex flex-col items-center justify-between gap-2 lg:flex-row-reverse lg:w-full ">
        <div className="w-4/5 flex justify-center items-center mt-3  lg:mt-0 lg:w-1/2">
          <Image
            src="/soumya.png"
            width={1060}
            height={509}
            alt="S Soumyakanta"
            priority
            className="w-4/5 bg-gradient-to-b from-slate-100  to-slate-200 dark:from-slate-900 dark:to-slate-950 rounded-full shadow-2xl md:w-3/5 lg:w-3/6"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 w-3/5 h-full md:h-3/5 text-center lg:w-3/5">
          <div>
            <h2 className="text-2xl font-bold md:text-4xl lg:text-5xl">
              S Soumyakanta - Hi Aman👋
            </h2>
          </div>
          <div className="lg:flex lg:justify-center lg:items-center">
            <p className=" md:text-xl lg:text-2xl lg:w-4/5 lg:text-center">A Passionate <span className="font-semibold">Front-End Developer</span> Creating Digital Experiences! </p>
          </div>
          <div className="space-x-4 flex">
           <div>
           <Button name="Contact" active={true} link="/contact"/>
           </div>
           <div>
           <Button name='Blog' active={false} link="/blog" />
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default LandingPage;
