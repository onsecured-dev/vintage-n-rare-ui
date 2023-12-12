import Link from "next/link";
import Image from "next/image";
import { ConnectKitButton } from "@/components/wrapper/ConnectKitButton";
import ThemeToggle from "./layout/ThemeToggle";
import MenuNavLink from "./layout/MenuNavLink";

const logoPath = "/Graphics/Menu Bar LOGO/V_R Logo.png";

const Header = () => {
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
        <MenuNavLink
          title="Create"
          links={[
            { href: "/create/acoustic-guitar", name: "Acoustic Guitars" },
            { href: "/create/electric-bass", name: "Electric Bass" },
            { href: "/create/electric-guitar", name: "Electric Guitar" },
            { href: "/create/amps-effects", name: "Amps & Effects" },
          ]}
        />

        <Link
          href="/explore"
          className="w-20 text-center text-lg font-semibold hover:text-blue-600 lg:w-auto "
        >
          Explore
        </Link>
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
