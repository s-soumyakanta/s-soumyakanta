import Navbar from "@/components/Navbar";
import LandingPage from "@/components/LandingPage";
import Newsletter from "@/components/Newsletter";

const page = () => {
  return (
    <>
      <div className="bg-slate-200 flex flex-col justify-center items-center dark:bg-slate-900 dark:text-white">
        <div className=" w-full">
          <section className="min-h-screen">
            <Navbar />
            <LandingPage />
          </section>
        </div>
      </div>
    </>
  );
};

export default page;
