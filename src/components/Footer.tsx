import Link from "next/link";
import Image from "next/image";

import { GrInstagram } from "react-icons/gr";
import { RiMessengerFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { TiSocialYoutubeCircular, TiSocialTwitter, TiSocialYoutube  } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";

const logoPath = '/Graphics/Favicon logo/Asset 1.png'

const Footer = () => {
  return (
    <footer className="mt-12 bg-dark pt-8">
      <nav className="flex w-full flex-col items-center justify-between px-8 pt-4 pb-8 md:mx-auto md:flex-row">
        <div className="pb-4">
          <Link href="/">
            <Image
              src={logoPath}
              alt="Logo"
              width={602 / 5}
              height={173 / 5}
            />
            {/* Vintage and Rare the Musical */}
          </Link>
          <div className="mt-2 flex flex-row justify-between my-4 mx-2">
            
            
            <TiSocialYoutubeCircular style={{marginHorizontal:'6px'}} size={'1.75em'} />
            <TiSocialTwitter style={{marginHorizontal:'6px'}} size={'1.75em'}/>
            <TiSocialYoutube  style={{marginHorizontal:'6px'}} size={'1.75em'}/>
            <SlSocialInstagram style={{marginHorizontal:'6px'}} size={'1.75em'} />
          </div>
        </div>
        <div>
          <p className="text-white-900 my-1 hidden text-center text-lg font-semibold md:block md:text-left">
            Vintage and Rare
          </p>
          
          <Link
            href="https://vintageandrare.com/"
            className="my-4 block text-center font-light hover:underline md:text-left"
            target={"_blank"}
          >
            Acoustic Guitar
          </Link>
          <Link
            href="https://vintageandrare.com/"
            className="my-4 block text-center font-light hover:underline md:text-left"
            target={"_blank"}
          >
            Amps & Effects
          </Link>
          <Link
            href="https://vintageandrare.com/"
            className="my-4 block text-center font-light hover:underline md:text-left"
            target={"_blank"}
          >
            Electric Bass
          </Link>
          <Link
            href="https://vintageandrare.com/"
            className="my-4 block text-center font-light hover:underline md:text-left"
            target={"_blank"}
          >
            Electric Guitar
          </Link>

          {/* <Web3Button label="Connect" icon="hide" /> */}
        </div>
        <div>
          <p className="text-white-900 my-1 text-center text-lg font-semibold md:text-left">
            My account
          </p>
          <Link
            href="https://vintageandrare.com/privacypolicy"
            target={"_blank"}
            className="my-4 block text-center font-light hover:underline md:text-left"
          >
            Profile
          </Link>
          <Link
            href="https://vintageandrare.com/termsandconditions"
            className="my-4 block text-center font-light hover:underline md:text-left"
            target={"_blank"}
          >
            My wallet
          </Link>

          {/* <Web3Button label="Connect" icon="hide" /> */}
        </div>
        <div>
          <p className="text-white-900 my-1 text-center text-lg font-semibold md:text-left">
            Information
          </p>
          <Link
            href="https://vintageandrare.com/privacypolicy"
            target={"_blank"}
            className="my-4 block text-center font-light hover:underline md:text-left"
          >
            Privacy
          </Link>
          <Link
            href="https://vintageandrare.com/termsandconditions"
            className="my-4 block text-center font-light hover:underline md:text-left"
            target={"_blank"}
          >
            Terms and Conditions
          </Link>

          {/* <Web3Button label="Connect" icon="hide" /> */}
        </div>
        <div>
          <p className="text-white-900 my-1 text-center text-lg font-semibold md:text-left">
            Subscribe to us
          </p>
          <p className="mt-2 hidden whitespace-pre md:block">
            
            
            Subscribe to our newsletter to get the latest news
          </p>
          <input className="enabled:hover:border-gray-800 disabled:opacity-75 rounded-full my-2 mx-2 py-2 px-2 text-black block " />

          {/* <Web3Button label="Connect" icon="hide" /> */}
        </div>
        {/* <p className="mt-2 whitespace-pre md:hidden">
          Need support? Don't email us at:
          {"\n"}
          <a href="mailto:support@vintageandrare.com">support@vintageandrare.com</a>
        </p> */}
      </nav>
      <div className="pb-5 text-center text-sm text-slate-700">
        <p>2023 by Vintage and Rare. All rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
