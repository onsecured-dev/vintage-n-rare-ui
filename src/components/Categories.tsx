"use client";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GiPlainCircle } from "react-icons/gi";

export default function Categories() {
  const [currentView, setCurrentView] = useState(0);
  const [inViewAmount, setInViewAmount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const itemOffset = containerRef.current.scrollWidth / 4;
        const clientWidth = containerRef.current.clientWidth;
        setInViewAmount(
          clientWidth > itemOffset
            ? Math.floor(containerRef.current.clientWidth / itemOffset)
            : 1
        );
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
  }, [setInViewAmount, containerRef]);

  console.log({ inViewAmount, currentView });
  return (
    <div className="container flex flex-col flex-nowrap items-start justify-between pt-4 pb-8">
      <p className="text-3xl font-bold md:ml-12 text-center md:text-left w-full">
        Categories
      </p>
      <div
        className="container flex flex-row flex-nowrap items-center justify-between gap-0 pt-4 pb-8 overflow-x-scroll snap-x snap-mandatory no-scrollbar"
        onScroll={(e) => {
          const currentFullWidth = e.currentTarget.scrollWidth;
          const itemOffset = currentFullWidth / 4;
          console.log({
            currentFullWidth,
            itemOffset,
            scrollLeft: e.currentTarget.scrollLeft,
          });
          setCurrentView(Math.ceil(e.currentTarget.scrollLeft / itemOffset));
        }}
        ref={containerRef}
      >
        <Category
          name="Acoustic Guitar"
          icon="/Graphics/Home Page - 4 Categories/Icons/Bass.png"
          href="/create/acoustic-guitar"
          bg="/background/v01_wave-05.jpg"
        />
        <Category
          name="Electric Bass"
          icon="/Graphics/Home Page - 4 Categories/Icons/Guitar.png"
          href="/create/electric-bass"
          bg="/background/v01_wave-04.jpg"
        />
        <Category
          name="Electric Guitar"
          icon="/Graphics/Home Page - 4 Categories/Icons/Bass.png"
          href="/create/electric-guitar"
          bg="/background/v01_wave-03.jpg"
        />
        <Category
          name="Amps & Effects"
          icon="/Graphics/Home Page - 4 Categories/Icons/Amps.png"
          href="/create/amps-effects"
          bg="/background/v01_wave-06.jpg"
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-4 w-full text-xs">
        <GiPlainCircle
          className={classNames(
            inViewAmount >= 1 && inViewAmount < 4 ? "block" : "hidden",
            currentView == 0
              ? "text-sm dark:text-white text-primary-text"
              : "dark:text-white/50 text-black/50"
          )}
        />
        <GiPlainCircle
          className={classNames(
            inViewAmount >= 1 && inViewAmount < 4 ? "block" : "hidden",
            currentView == 1
              ? "text-sm dark:text-white text-primary-text"
              : "dark:text-white/50 text-black/50"
          )}
        />
        <GiPlainCircle
          className={classNames(
            inViewAmount < 3 ? "block" : "hidden",
            currentView == 2
              ? "text-sm dark:text-white text-primary-text"
              : "dark:text-white/50 text-black/50"
          )}
        />
        <GiPlainCircle
          className={classNames(
            inViewAmount == 1 ? "block" : "hidden",
            currentView >= 3
              ? "text-sm dark:text-white text-primary-text"
              : "dark:text-white/50 text-black/50"
          )}
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
    <div className="px-4 min-w-[calc(100vw-80px)] md:min-w-[320px] flex snap-center">
      <Link
        href={href}
        className={classNames(
          "relative flex-grow group rounded-3xl flex-1 items-center border-2 border-gray-600 h-40 overflow-clip"
        )}
      >
        <Image
          src={bg}
          alt="background image"
          fill
          className="absolute top-0 pointer-events-none w-full object-cover z-10"
        />
        {/* <div className="absolute top-0 left-[calc(50%-60px)] z-10">
          <Image src={icon} alt="Icon" width={602 / 5} height={173 / 5} />
        </div> */}
        <p className="relative font-semibold text-xl text-white text-center transition-all duration-300 text-shadow z-20 group-hover:text-2xl  group-hover:text-white-shadow group-hover:bg-black/50 w-full h-full flex flex-col justify-center">
          {name}
        </p>
      </Link>
    </div>
  );
}
