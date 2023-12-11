import Link from "next/link";
import Image from "next/image";
import { ConnectKitButton } from "@/components/wrapper/ConnectKitButton";

import { FaRegUser, FaRegMoon } from "react-icons/fa";
import ThemeToggle from "./layout/ThemeToggle";

const logoPath = "/Graphics/Menu Bar LOGO/V_R Logo.png";

const Header = () => {
  // const [isOpen, setIsOpen] = useState(false)
  const setIsOpen = (val: any) => true;

  return (
    <header className="flex w-full flex-row items-center justify-between px-8 pt-4 pb-8">
      {/* <div className="container "
      ><Image
      src={logoPath}
      alt="Logo"
      width={602 / 3.2}
      height={173 / 3.2}
    />
    
    </div> */}

      {/* <div className="hidden flex-row items-center gap-x-4 md:flex"> */}
      <nav className="flex flex-grow flex-row items-center  gap-x-8">
        <Link href="/">
          <Image
            src={logoPath}
            alt="Logo"
            width={602 / 2.5}
            height={173 / 2.5}
            className=" invert dark:invert-0"
          />
        </Link>

        {/* <div className="hidden flex-row items-center gap-x-8 md:flex">
          
        </div> */}
        <Link
          href="/"
          className="w-12 text-center rounded-md text-lg font-semibold hover:text-blue-600 lg:w-auto"
        >
          Home
        </Link>
        <Link
          href="/acoustic"
          className="w-12 break-words text-center nowrap text-lg font-semibold hover:text-blue-600 lg:w-auto"
        >
          Acoustic Guitar
          {/* <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
    <div className="py-1" role="none">
      
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"  id="menu -item-0">Account settings</a>
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"  id="menu-item-1">Support</a>
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"  id="menu-item-2">License</a>
      
    </div>
  </div> */}
        </Link>

        <Link
          href="/amps"
          className="w-20 text-center text-lg font-semibold hover:text-blue-600 lg:w-auto"
        >
          Amps & Effects
        </Link>
        <Link
          href="https://vintageandrare.com/"
          className="w-18 text-center text-lg font-semibold hover:text-blue-600 lg:w-auto"
          target={"_blank"}
        >
          Electric Bass
        </Link>
        <Link
          href="https://vintageandrare.com/"
          className="w-18 text-center text-lg font-semibold hover:text-blue-600 lg:w-auto"
          target={"_blank"}
        >
          Electric Guitar
        </Link>

        {/* </div> */}
      </nav>

      <nav className="flex flex-grow flex-row items-end justify-end gap-x-4">
        <div className="hidden flex-row items-center gap-x-8 md:flex">
          <div>
            <ConnectKitButton />
          </div>
          {/* <Link
            href="/mint"
            className="w-20 text-center text-lg font-light hover:text-blue-600"
          >
            <button type="button" className="inline-flex w-full h-full justify-center gap-x-1.5 border-2 rounded-full   px-2 py-2 text-sm font-semibold text-white shadow-sm  hover:text-blue-600 bg-gray-800" id="menu-button" aria-expanded="true" aria-haspopup="true">

            <FaRegUser size={'1.25em'}/>
            </button>
          </Link> */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
