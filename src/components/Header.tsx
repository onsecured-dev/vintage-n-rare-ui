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
    <header className="flex flex-row self-center max-w-7xl items-center  md:mx-auto md:flex-row">
      {/* <div className="flex flex-row flex-nowrap justify-between px-8 pt-4 pb-8">

      </div> */}
      {/* max-w-screen-2xl */}

      {/* <div className="container "
      ><Image
      src={logoPath}
      alt="Logo"
      width={602 / 3.2}
      height={173 / 3.2}
    />
    
    </div> */}

      {/* <div className="hidden flex-row items-center gap-x-4 md:flex"> */}
      <nav className="flex  flex-1 flex-grow flex-row items-center gap-x-8 py-2  md:mx-auto md:flex-row">
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
        {/* <p

          className="w-12 break-words text-center nowrap text-lg font-bold hover:text-blue-600 lg:w-auto"
        >
          Create
          <div className="hidden float-right right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 hover:block focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
            <div className="py-1" role="none">

              <Link href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" id="menu -item-0">Account settings</Link>
              <Link href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" id="menu-item-1">Support</Link>
              <Link href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray" role="menuitem" id="menu-item-2">License</Link>

            </div>
          </div>
        </p> */}
        <div className="group relative w-20 inline-block z-50">
          <button className="text-lg font-semibold py-2 px-4 w-20  rounded-md hover:text-blue-600 lg:w-auto">
            Create
          </button>
          <div className="hidden group-hover:block absolute z-10 bg-gray-800 p-2 mt-4 space-y-2 left-0 rounded-md">
            <Link href="#" className="w-max block px-4 py-2 text-white hover:bg-blue-950 border-b-2 border-gray-600">Acoustic Guitars</Link>
            <Link href="#" className="block px-4 py-2 text-white hover:bg-blue-950 border-b-2 border-gray-600">Electric Bass</Link>
            <Link href="#" className="block px-4 py-2 text-white hover:bg-blue-950 border-b-2 border-gray-600">Electric Guitar</Link>
            <Link href="#" className="block px-4 py-2 text-white hover:bg-blue-950 border-b-2 border-gray-600">Amps & Effects</Link>

          </div>
        </div>


        <Link
          href="/amps"
          className="w-20 text-center text-lg font-semibold hover:text-blue-600 lg:w-auto "
        >
          Explore
        </Link>





        {/* </div> */}
      </nav>

      <nav className="flex  flex-1 flex-grow flex-row items-end justify-end gap-x-4 ">
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
