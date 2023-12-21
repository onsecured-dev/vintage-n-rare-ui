import Image from "next/image";
import Categories from "@/components/Categories";
import thumbnail from "@/../public/Graphics/thumbnail.jpeg";
import classNames from "classnames";
import { type Metadata } from "next";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 md:p-24 md:pb-10 pb-6 ">
      <div className="z-10 max-w-7xl w-full items-start justify-between text-sm flex md:flex-row flex-col">
        <div className=" md:w-6/12 max-h-max items-start">
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Create your Instrument&apos;s Certificate of Ownership
          </p>
          <p className="text-lg my-8">
            Facilitating the creation of Certificates of Ownership for vintage,
            boutique & high-end musical instruments & gear on the Binance Smart
            Chain
          </p>
          <div className="flex xs:flex-row items-center xs:items-start justify-center xs:justify-start my-8 flex-col w-full">
            <Link
              href="/explore"
              className={classNames(
                "bg-primary-text hover:border-white hover:bg-transparent border-primary-text block",
                "text-white hover:text-primary-text dark:hover:text-white",
                "w-[150px] text-center rounded-xl border-2 font-semibold px-8 py-2 my-2 mx-1 shadow-sm transition-colors duration-300"
              )}
            >
              Explore
            </Link>
            <Link
              href="/create"
              className={classNames(
                "hover:bg-primary-text bg-transparent dark:border-white border-primary-text hover:border-primary-text dark:hover:border-primary-text block",
                "hover:text-white text-primary-text dark:text-white",
                "w-[150px] text-center rounded-xl border-2  font-semibold px-8 py-2 my-2 mx-1 shadow-sm transition-colors duration-300"
              )}
            >
              Create
            </Link>
          </div>
        </div>
        <div className="hidden md:block p-4 z-10 dark:bg-transparent border-[1px] dark:border-white bg-gray-400/50 w-5/12 max-h-fit items-end rounded-3xl box-sway">
          <Image src={thumbnail} alt="guitar thumbnail" />
        </div>
        {/* <div className="hidden md:block p-2 z-0 dark:bg-white bg-gray-400/50 max-h-fit py-6 mt-6 px-6 items-end rounded-xl bg-mnote bg-cover minibox-sway"></div> */}
      </div>
      <section className="w-full md:max-w-7xl overflow-hidden">
        <Categories />
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Vintage&Rare NFT",
  description:
    "Create your Instrument's Certificate of Authenticity, powered by Vintage and Rare",
};
