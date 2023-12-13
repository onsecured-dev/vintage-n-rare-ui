import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="container flex flex-col flex-nowrap items-start justify-between px-8 pt-4 pb-8 max-h-56 ">
      <p className="text-3xl font-bold ml-12">Categories</p>
      <div className="container flex flex-row flex-nowrap items-center justify-between px-8 pt-4 pb-8 h-52 ">
        <Category
          name="Acoustic Guitar"
          icon="/Graphics/Home Page - 4 Categories/Icons/Bass.png"
          href="/create/acoustic-guitar"
          bg="/Graphics/Home Page - 4 Categories/Background/v01_wave-09 copy.jpg"
        />
        <Category
          name="Electric Bass"
          icon="/Graphics/Home Page - 4 Categories/Icons/Guitar.png"
          href="/create/electric-bass"
          bg="/Graphics/Home Page - 4 Categories/Background/v01_wave-10 copy.jpg"
        />
        <Category
          name="Electric Guitar"
          icon="/Graphics/Home Page - 4 Categories/Icons/Bass.png"
          href="/create/electric-guitar"
          bg="/Graphics/Home Page - 4 Categories/Background/v01_wave-14 copy.jpg"
        />
        <Category
          name="Amps & Effects"
          icon="/Graphics/Home Page - 4 Categories/Icons/Amps.png"
          href="/create/amps-effects"
          bg="/Graphics/Home Page - 4 Categories/Background/v01_wave-16.jpg"
        />
      </div>
    </div>
  );
}

function Category(props: {
  name: string;
  icon: string;
  href: string;
  bg: string;
}) {
  const { name, icon, href, bg } = props;
  return (
    <Link
      href={href}
      className={classNames(
        "relative group rounded-3xl flex-1 flex flex-col bg-cover justify-end border-2 border-gray-600 mx-4 h-40 overflow-clip"
      )}
    >
      <Image
        src={bg}
        alt="background image"
        fill
        className="absolute top-0 pointer-events-none"
      />
      <div className="absolute top-0 left-[calc(50%-60px)] z-10">
        <Image src={icon} alt="Icon" width={602 / 5} height={173 / 5} />
      </div>
      <div className="bg-gray-800/20 py-2 group-hover:bg-gray-800/70 group-hover:py-10 transition-all duration-300 z-20">
        <p className="font-semibold text-xl text-white text-center transition-all duration-300">
          {name}
        </p>
      </div>
    </Link>
  );
}
