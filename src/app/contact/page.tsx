import ContactForm from "@/components/ContactForm";
const page = () => {
  return (
    <>
      <div className="dark:bg-dm-bg flex flex-col  space-y-8 w-full justify-center items-center h-[80vh] ">
        <h2 className="text-lg uppercase dark:text-dm-heading text-lm-heading font-bold">Contact</h2>
        <ContactForm />
      </div>
    </>
  );
};

export default page;
