import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaYoutube, FaXTwitter } from "react-icons/fa6";

// import { trpc } from "../app/_trpc/client";

import logo from "@/../public/Graphics/mainLogo.png";

// const {
//   mutate: subscribe,
//   data: cidData,
//   status: metadataStatus,
// } = trpc.subscribe.useMutation();

const Footer = () => {
  return (
    <footer className="bg-dark pt-8 items-center  ">
      <nav className="flex flex-col max-w-screen-2xl items-center md:items-start justify-between px-8 pt-4 pb-8 md:mx-auto md:flex-row">
        <div className="pb-4 flex flex-col items-center md:items-start">
          <Link
            href="/"
            className="max-w-[220px] md:max-w-[150px] lg:max-w-[250px] pb-2"
          >
            <Image src={logo} alt="Logo" className=" invert dark:invert-0" />
          </Link>
          <div className="text-xs dark:text-white/60 text-center md:text-left whitespace-pre-wrap">
            Integrating Web3 technology into{"\n"}Web2 businesses
          </div>
          <div className="mt-2 flex flex-row justify-center md:justify-start my-4 gap-1  w-full">
            <a
              href="http://twitter.com/vintageandrare"
              target="_blank"
              rel="noopener nonreferrer"
              className="hover:bg-primary-text rounded-full p-2"
            >
              <FaXTwitter size={"1.75em"} />
            </a>
            <a
              href="https://www.youtube.com/user/VintageandRare"
              target="_blank"
              rel="noopener nonreferrer"
              className="hover:bg-primary-text rounded-full p-2"
            >
              <FaYoutube size={"1.75em"} />
            </a>
            <a
              href="https://www.facebook.com/pages/VintageandRarecom/138943436124974?v=app_163976936970571&ref=ts"
              target="_blank"
              rel="noopener nonreferrer"
              className="hover:bg-primary-text rounded-full p-2"
            >
              <FaFacebook size={"1.75em"} />
            </a>
          </div>
        </div>
        <div className=" md:h-56">
          <p className="text-white-900 my-1 hidden text-center text-lg font-semibold md:block md:text-left">
            Vintage and Rare
          </p>

          <Link
            href="/"
            className="my-4 block text-center font-light hover:underline md:text-left"
            target={"_blank"}
          >
            Home
          </Link>
          <Link
            href="/explore"
            className="my-4 block text-center font-light hover:underline md:text-left"
          >
            Explore
          </Link>
          <Link
            href="/about"
            className="my-4 block text-center font-light hover:underline md:text-left"
          >
            About
          </Link>
        </div>
        <div className=" md:h-56">
          <p className="text-white-900 my-1 text-center text-lg font-semibold md:text-left">
            Create
          </p>
          {/* <div className="flex flex-row"></div>
          <div className="flex flex-row"></div> */}
          <Link
            href="/create/acoustic-guitar"
            className="my-4 block text-center font-light hover:underline md:text-left"
          >
            Acoustic Guitar
          </Link>
          <Link
            href="/create/amps"
            className="my-4 block text-center font-light hover:underline md:text-left"
          >
            Amps
          </Link>
          <Link
            href="/create/electric-bass"
            className="my-4 block text-center font-light hover:underline md:text-left"
          >
            Electric Bass
          </Link>
          <Link
            href="/create/electric-guitar"
            className="my-4 block text-center font-light hover:underline md:text-left"
          >
            Electric Guitar
          </Link>

          {/* <Web3Button label="Connect" icon="hide" /> */}
        </div>
        {/* <div className="h-0 md:h-56"></div> */}
        <div className="form-control md:h-56 md:w-[30vw] lg:w-auto">
          <label className="whitespace-pre-wrap pb-2 text-center md:text-left">
            <span className="font-bold text-xl">Subscribe</span>
            {"\n"}
            <span className="text-sm dark:text-white/70 text-black/70">
              Subscribe to our newsletter to get the latest news
            </span>
          </label>
          <div className="join">
            <input
              className="join-item input input-bordered rounded-full bg-transparent border-black dark:border-white/50 md:max-w-[150px] lg:max-w-max"
              type="email"
            />
            <button className="btn bg-primary-text hover:bg-primary-text/70 join-item rounded-r-full text-white">
              Submit
            </button>
          </div>
        </div>
        
      </nav>
      <div className="pb-5 mt-2 mb-2 text-center text-sm text-slate-700 dark:text-white/50">
        <a
          href="https://securedonblockchain.com"
          target="_blank"
          className="hover:text-primary-text font-mono"
        >
          Powered by: Secured On Blockchain.
        </a>
        <p>2023 by Vintage and Rare. All rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
