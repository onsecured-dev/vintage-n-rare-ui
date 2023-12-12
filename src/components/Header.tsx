import Link from "next/link";
import Image from "next/image";
import { ConnectKitButton } from "@/components/wrapper/ConnectKitButton";
import ThemeToggle from "./layout/ThemeToggle";

const logoPath = "/Graphics/Menu Bar LOGO/V_R Logo.png";

const Header = () => {
  // const [isOpen, setIsOpen] = useState(false)
  const setIsOpen = (val: any) => true;

  return (
    <header className="flex w-full flex-row justify-between px-8 pt-4 pb-8 self-center max-w-7xl items-center  md:mx-auto md:flex-row">
      <nav className="flex flex-1 flex-grow flex-row items-center  gap-x-8 py-2 md:mx-auto md:flex-row">
        <Link href="/">
          <Image
            src={logoPath}
            alt="Logo"
            width={602 / 2.5}
            height={173 / 2.5}
            className=" invert dark:invert-0"
          />
        </Link>

        <Link
          href="/"
          className="w-12 text-center rounded-md text-lg font-semibold hover:text-blue-600 lg:w-auto"
        >
          Home
        </Link>
        <div className="group relative w-20 inline-block z-50">
          <button className="text-lg font-semibold py-2 px-4 w-20  rounded-md hover:text-blue-600 lg:w-auto">
            Create
          </button>
          <div className="hidden group-hover:block absolute z-10 bg-gray-800 p-2 mt-4 space-y-2 left-0 rounded-md">
            <Link
              href="#"
              className="w-max block px-4 py-2 text-white hover:bg-blue-950 border-b-2 border-gray-600"
            >
              Acoustic Guitars
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 text-white hover:bg-blue-950 border-b-2 border-gray-600"
            >
              Electric Bass
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 text-white hover:bg-blue-950 border-b-2 border-gray-600"
            >
              Electric Guitar
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 text-white hover:bg-blue-950 border-b-2 border-gray-600"
            >
              Amps & Effects
            </Link>
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
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
