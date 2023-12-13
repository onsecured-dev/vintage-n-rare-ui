import Link from "next/link";
import Image from "next/image";

import { GrInstagram } from "react-icons/gr";
import { RiMessengerFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { TiSocialYoutubeCircular, TiSocialTwitter, TiSocialYoutube } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";

const logoPath = '/Graphics/Favicon logo/Asset 1.png'

const Footer = () => {
  return (
    <footer className="mt-12 bg-dark pt-8 items-center  ">
      <nav className="flex max-w-screen-2xl items-center justify-between px-8 pt-4 pb-8 md:mx-auto md:flex-row">
        <div className="pb-4 ">
          <Link href="/">
            <Image
              src={logoPath}
              alt="Logo"
              width={602 / 5}
              height={173 / 5}
              className=" invert dark:invert-0"
            />
            {/* Vintage and Rare the Musical */}
          </Link>
          <div className="mt-2 flex flex-row justify-between my-4 mx-2  w-full">


            <TiSocialYoutubeCircular style={{ marginHorizontal: '6px' }} size={'1.75em'} />
            <TiSocialTwitter style={{ marginHorizontal: '6px' }} size={'1.75em'} />
            <TiSocialYoutube style={{ marginHorizontal: '6px' }} size={'1.75em'} />
            <SlSocialInstagram style={{ marginHorizontal: '6px' }} size={'1.75em'} />
          </div>
        </div>
        <div className=" h-56">
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
        <div className=" h-56">
          <p className="text-white-900 my-1 text-center text-lg font-semibold md:text-left">
            Create
          </p>
          {/* <div className="flex flex-row"></div>
          <div className="flex flex-row"></div> */}
          <Link
            href="/create/acoustic-guitar"
            className="my-4 block text-center font-light hover:underline md:text-left"
            target={"_blank"}
          >
            Acoustic Guitar
          </Link>
          <Link
            href="/create/amps-effects"
            className="my-4 block text-center font-light hover:underline md:text-left"
            target={"_blank"}
          >
            Amps & Effects
          </Link>
          <Link
            href="/create/electric-bass"
            className="my-4 block text-center font-light hover:underline md:text-left"
            target={"_blank"}
          >
            Electric Bass
          </Link>
          <Link
            href="/create/electric-guitar"
            className="my-4 block text-center font-light hover:underline md:text-left"
            target={"_blank"}
          >
            Electric Guitar
          </Link>

          {/* <Web3Button label="Connect" icon="hide" /> */}
        </div>
        <div className=" h-56">


          {/* <Web3Button label="Connect" icon="hide" /> */}
        </div>
        <div className=" h-56">


          {/* <Web3Button label="Connect" icon="hide" /> */}
        </div>
        {/* <p className="mt-2 whitespace-pre md:hidden">
          Need support? Don't email us at:
          {"\n"}
          <a href="mailto:support@vintageandrare.com">support@vintageandrare.com</a>
        </p> */}
      </nav>
      <div className="pb-5 mt-2 mb-2 text-center text-sm text-slate-700">
        <p>2023 by Vintage and Rare. All rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
