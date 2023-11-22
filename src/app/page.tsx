import Link from "next/link"
const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
     <div className="bg-slate-900  flex flex-col  p-5 py-10 rounded-md text-center space-y-10">
     <div className="space-y-2">
      <h1 className="text-xl">S Soumyakanta</h1>
      <p className="text-xs">Website will be live soon!</p>
      </div>

      <div className="space-x-4">
        <button className="p-2 px-4 rounded-md shadow-md bg-slate-800"><a href="https://github.com/s-soumyakanta">GitHub</a></button>
        <button className="p-2 px-4 rounded-md shadow-lg bg-slate-800"><Link href='/blog'>Blog</Link></button>
      </div>
     </div>
    </div>
  )
}

export default page