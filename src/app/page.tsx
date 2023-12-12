import Image from "next/image";
import Header from "@/components/Header";
import Categories from "@/components/Categories";
import thumbnail from "@/../public/Graphics/thumbnail.jpeg";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <div className="z-10 max-w-7xl w-full items-stretch justify-between font-mono text-sm lg:flex columns-2">
        <div className=" w-6/12 max-h-max items-start">
          <p className="text-6xl font-bold">
            Define, Collect and Sell Super Rare NFT
          </p>
          <p className="text-lg my-8">
            Our mission is to establish and develop the ultimate
            network/community designed for enthusiasts and retailers of vintage,
            rare and antique musical instruments, as well as an online network
            for dedicated builders of fine instruments.
          </p>
          <div className="flex-row items-start justify-between my-8">
            <button className="inline-flex bg-blue-800 w-12 text-center text-lg rounded-xl border-4 border-white px-8 py-2 my-2 mx-1 font-semibold text-white shadow-sm  hover:bg-transparent lg:w-auto">
              Explore now
            </button>
            <button className="inline-flex w-12 text-center text-lg rounded-xl  border-4 px-8 py-2 my-2 mx-1 border-white font-semibold text-white shadow-sm  hover:bg-blue-600 lg:w-auto">
              Create
            </button>
          </div>
        </div>
        <div className=" p-4 z-10 dark:bg-white bg-gray-400/50 w-5/12 max-h-fit items-end rounded-xl box-sway">
          <Image src={thumbnail} alt="guitar thumbnail" />
        </div>
        <div className="p-2 z-0 dark:bg-white bg-gray-400/50 max-h-fit py-6 mt-6 px-6 items-end rounded-xl bg-mnote bg-cover minibox-sway">
          {/* <div className='rounded-xl border-8 bg-cool-3 bg-cover'>

          </div> */}
        </div>
      </div>
      <Categories />
    </main>
  );
}
