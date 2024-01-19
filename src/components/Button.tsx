import Link from "next/link"

type ContactButtonProps = {
  name:string
  link:string
  active:boolean
}

const ContactButton = ({name,link,active}:ContactButtonProps) => {
  return (
    <Link href={link}>
    <button className={`w-24 p-2 md:w-32 md:p-3 font-semibold shadow-xl rounded-lg uppercase  ${active ? 'bg-dm-bg text-dm-heading dark:bg-lm-bg dark:text-lm-heading' :'border border-dm-subheading dark:border-lm-subheading shadow-xl bg-dm-heading dark:bg-lm-subheading '}`}>
      {name}
    </button>
    </Link>
  );
};

export default ContactButton;
