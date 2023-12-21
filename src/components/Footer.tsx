import Link from "next/link";
import Image from "next/image";

import { GrInstagram } from "react-icons/gr";
import { RiMessengerFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import {
  TiSocialYoutubeCircular,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";

import logo from "@/../public/Graphics/mainLogo.png";

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
          <div className="mt-2 flex flex-row justify-center md:justify-start my-4 gap-4  w-full">
            <TiSocialYoutubeCircular size={"1.75em"} />
            <TiSocialTwitter size={"1.75em"} />
            <TiSocialYoutube size={"1.75em"} />
            <SlSocialInstagram size={"1.75em"} />
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
            href="/create/amps-effects"
            className="my-4 block text-center font-light hover:underline md:text-left"
          >
            Amps & Effects
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
        {/* <p className="mt-2 whitespace-pre md:hidden">
          Need support? Don't email us at:
          {"\n"}
          <a href="mailto:support@vintageandrare.com">support@vintageandrare.com</a>
        </p> */}
      </nav>
      <div className="pb-5 mt-2 mb-2 text-center text-sm text-slate-700 dark:text-white/50">
        <p>2023 by Vintage and Rare. All rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
