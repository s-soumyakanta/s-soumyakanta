import Image from "next/image";
import Button from "./Button";
const LandingPage = () => {
  return (
    <div id="home" className="w-full h-[80vh] flex justify-center items-center">
      <div className=" flex flex-col items-center justify-between gap-2 lg:flex-row-reverse lg:w-full">
        <div className="w-4/5 flex justify-center items-center">
          <Image
            src="/soumya.png"
            width={1060}
            height={509}
            alt="S Soumyakanta"
            priority
            className="w-4/5 bg-gradient-to-b from-slate-100  to-slate-200 dark:from-slate-900 dark:to-slate-950 rounded-full shadow-2xl md:w-3/5 lg:w-auto"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 w-3/5 h-full md:h-3/5 text-center">
          <div>
            <h2 className="text-4xl font-bold md:text-4xl lg:text-5xl">
              S Soumyakanta
            </h2>
          </div>
          <div>
            <p className="text-lg md:text-xl lg:text-2xl">A passionate front-end developer creating digital experiences! </p>
          </div>
          <div className="space-x-4 flex">
           <div>
           <Button name="Let's Chat" active={true} link="/contact"/>
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
