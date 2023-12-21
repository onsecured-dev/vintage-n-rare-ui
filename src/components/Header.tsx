import Link from "next/link";
import Image from "next/image";
import { ConnectKitButton } from "@/components/wrapper/ConnectKitButton";
import ThemeToggle from "./layout/ThemeToggle";
import MenuNavLink from "./layout/MenuNavLink";
import { IoMenu } from "react-icons/io5";
import DrawerButton from "./layout/DrawerButton";
import logoPath from "@/../public/Graphics/mainLogo.png";

const Header = () => {
  return (
    <header className="flex w-full flex-row justify-between pl-8 pr-0 md:pr-8 pt-4 pb-8 self-center max-w-7xl items-center  md:mx-auto md:flex-row">
      <nav className="flex flex-1 flex-grow flex-row items-center  gap-x-8 py-2 md:mx-auto md:flex-row">
        <Link href="/" className=" flex-col justify-center flex">
          <div className="max-h-16 aspect-[1107/260]">
            <Image
              src={logoPath}
              alt="Logo"
              className=" invert dark:invert-0 max-h-full max-w-full"
            />
          </div>
        </Link>

        <Link
          href="/"
          className="w-12 hidden md:block text-center rounded-md text-lg font-semibold hover:text-blue-600 lg:w-auto"
        >
          Home
        </Link>
        <div className="hidden md:block">
          <MenuNavLink
            title="Create"
            links={[
              { href: "/create/acoustic-guitar", name: "Acoustic Guitars" },
              { href: "/create/electric-bass", name: "Electric Bass" },
              { href: "/create/electric-guitar", name: "Electric Guitar" },
              { href: "/create/amps-effects", name: "Amps" },
            ]}
          />
        </div>

        <Link
          href="/explore"
          className="hidden md:block w-20 text-center text-lg font-semibold hover:text-blue-600 lg:w-auto "
        >
          Explore
        </Link>
        <Link
          href="/about"
          className="hidden md:block w-20 text-center text-lg font-semibold hover:text-blue-600 lg:w-auto "
        >
          About
        </Link>
      </nav>

      <div className="flex lg:flex-1 flex-row items-end justify-end gap-x-4 pl-2 sm:pl-6">
        <div className="flex-row items-center md:gap-x-8 gap-x-4 flex">
          <div className="hidden md:block">
            <ConnectKitButton />
          </div>
          <ThemeToggle />
          <div className="md:hidden block">
            <DrawerButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
