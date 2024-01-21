
 export const Heading = ({name}:{name:string}) => {
  return (
    <h2 className="text-2xl text-lm-heading md:text-3xl lg:text-4xl uppercase font-semibold dark:text-dm-heading">{name}</h2>      
  )
}

export default Heading