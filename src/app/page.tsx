import {LandingPage,About,Work} from '../components/index'
const page = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className=" w-full">
          <section className="min-h-screen w-full flex justify-center items-center flex-col">
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
