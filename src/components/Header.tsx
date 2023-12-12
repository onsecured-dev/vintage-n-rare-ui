import Link from "next/link";
import Image from "next/image";
import { ConnectKitButton } from "@/components/wrapper/ConnectKitButton";
import ThemeToggle from "./layout/ThemeToggle";
import MenuNavLink from "./layout/MenuNavLink";
import { IoMenu } from "react-icons/io5";
import DrawerButton from "./layout/DrawerButton";
const logoPath = "/Graphics/Menu Bar LOGO/V_R Logo.png";

const Header = () => {
  return (
    <header className="flex w-full flex-row justify-between pl-8 pr-0 md:pr-8 pt-4 pb-8 self-center max-w-7xl items-center  md:mx-auto md:flex-row">
      <nav className="flex flex-1 flex-grow flex-row items-center  gap-x-8 py-2 md:mx-auto md:flex-row">
        <Link href="/" className="min-w-[150px]">
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
              { href: "/create/amps-effects", name: "Amps & Effects" },
            ]}
          />
        </div>

        <Link
          href="/explore"
          className="hidden md:block w-20 text-center text-lg font-semibold hover:text-blue-600 lg:w-auto "
        >
          Explore
        </Link>
      </nav>

      <nav className="flex  flex-1 flex-grow flex-row items-end justify-end gap-x-4 ">
        <div className="flex-row items-center md:gap-x-8 gap-x-4 flex">
          <div className="hidden md:block">
            <ConnectKitButton />
          </div>
          <ThemeToggle />
          <div className="md:hidden block">
            <DrawerButton />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
