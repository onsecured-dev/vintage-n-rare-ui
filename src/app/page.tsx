import Image from "next/image";
import Categories from "@/components/Categories";
import thumbnail from "@/../public/Graphics/thumbnail.jpeg";
import classNames from "classnames";
import { type Metadata } from "next";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 md:p-24 md:pb-10 pb-6 ">
      <div className="z-10 max-w-7xl w-full items-start justify-between text-sm flex md:flex-row flex-col">
        <div className=" md:w-6/12 max-h-max items-start">
          <p className="text-4xl md:text-6xl font-bold">
            Create your Instrument&apos;s Certificate of Authenticity
          </p>
          <p className="text-lg my-8">
            Our mission is to establish and develop the ultimate
            network/community designed for enthusiasts and retailers of vintage,
            rare and antique musical instruments, as well as an online network
            for dedicated builders of fine instruments.
          </p>
          <div className="flex-row items-start justify-between my-8">
            <button
              className={classNames(
                "bg-primary-text hover:border-white hover:bg-transparent border-primary-text",
                "text-white hover:text-primary-text dark:hover:text-white",
                "w-[150px] text-center rounded-xl border-2 font-semibold px-8 py-2 my-2 mx-1 shadow-sm transition-colors duration-300"
              )}
            >
              Explore now
            </button>
            <button
              className={classNames(
                "hover:bg-primary-text bg-transparent dark:border-white border-primary-text hover:border-primary-text dark:hover:border-primary-text",
                "hover:text-white text-primary-text dark:text-white",
                "w-[150px] text-center rounded-xl border-2  font-semibold px-8 py-2 my-2 mx-1 shadow-sm transition-colors duration-300"
              )}
            >
              Create
            </button>
          </div>
        </div>
        <div className="hidden md:block p-4 z-10 dark:bg-transparent border-[1px] dark:border-white bg-gray-400/50 w-5/12 max-h-fit items-end rounded-3xl box-sway">
          <Image src={thumbnail} alt="guitar thumbnail" />
        </div>
        {/* <div className="hidden md:block p-2 z-0 dark:bg-white bg-gray-400/50 max-h-fit py-6 mt-6 px-6 items-end rounded-xl bg-mnote bg-cover minibox-sway"></div> */}
      </div>
      <Categories />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Vintage&Rare NFT",
  description:
    "Create your Instrument's Certificate of Authenticity, powered by Vintage and Rare",
};
