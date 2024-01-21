import {LandingPage,About,Work} from '../components/index'
const page = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-lm-bg text-lm-subheading dark:bg-dm-bg dark:text-dm-subheading">
        <div className=" w-full">
          <section className="min-h-screen w-full">
            <LandingPage />
            <About />
            <Work />
          </section>
        </div>
      </div>
    </>
  );
};

export default page;
