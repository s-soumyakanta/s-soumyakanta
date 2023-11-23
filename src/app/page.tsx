import Image from "next/image"
import Link from "next/link"
const page = () => {
  return (
   <>
    <section className="text-gray-400 bg-gray-900 body-font h-screen flex justify-center items-center ">
  <div className="container mx-auto flex px-5  items-center justify-center flex-col ">
    <Image className="lg:w-1/6 md:w-1/6 w-2/6 mb-10 object-cover object-center rounded" alt="S Soumyakanta" src='/s-soumyakanta.jpeg'  width="1060" height="509" />
    <div className="text-center lg:w-2/4 w-full">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">S Soumyakanta</h1>
      <p className="leading-relaxed mb-8">👋 Welcome to my website! I&lsquo;m a front-end developer passionate about creating beautiful and user-friendly web experiences. Currently, my website is under development and will be launching soon. In the meantime, you can enjoy reading my blogs and connect with me on GitHub for any collaboration inquiries.</p>
      <div className="flex justify-center">
        <Link className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" href='/blog'>Blog</Link>
        <Link className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg" href='https://github.com/s-soumyakanta'>GitHub</Link>
      </div>
    </div>
  </div>
</section>
   </>
  )
}

export default page