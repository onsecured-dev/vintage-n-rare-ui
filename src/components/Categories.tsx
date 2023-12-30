"use client";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GiPlainCircle } from "react-icons/gi";

export default function Categories(props: { isList?: boolean }) {
  const { isList } = props;
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

  return (
    <div className="flex flex-col flex-nowrap items-start justify-between pt-4 pb-8 w-full">
      <p
        className={classNames(
          "text-3xl font-bold  text-center md:text-left w-full",
          isList ? "" : "md:ml-12"
        )}
      >
        Categories
      </p>
      <div
        className={classNames(
          "flex flex-row items-center pt-4 pb-8 overflow-x-scroll snap-x snap-mandatory no-scrollbar container",
          isList
            ? "w-full flex-wrap gap-4 justify-center md:justify-evenly"
            : "flex-nowrap justify-between gap-0"
        )}
        onScroll={(e) => {
          const currentFullWidth = e.currentTarget.scrollWidth;
          const itemOffset = currentFullWidth / 4;
          setCurrentView(Math.ceil(e.currentTarget.scrollLeft / itemOffset));
        }}
        ref={containerRef}
      >
        <Category
          name="Acoustic Guitar"
          href="/create/acoustic-guitar"
          bg="/Graphics/Home Page - 4 Categories/Background/v01_wave-28.jpg"
        />
        <Category
          name="Electric Bass"
          href="/create/electric-bass"
          bg="/Graphics/Home Page - 4 Categories/Background/v01_wave-29.jpg"
        />
        <Category
          name="Electric Guitar"
          href="/create/electric-guitar"
          bg="/Graphics/Home Page - 4 Categories/Background/v01_wave-30.jpg"
        />
        <Category
          name="Amps"
          href="/create/amps"
          bg="/Graphics/Home Page - 4 Categories/Background/v01_wave-28.jpg"
        />
      </div>
      <div
        className={classNames(
          "flex flex-row items-center justify-center gap-4 w-full text-xs",
          isList ? "hidden" : ""
        )}
      >
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
  icon?: string;
  href: string;
  bg: string;
}) {
  const { name, icon, href, bg } = props;
  return (
    <div className="px-4 min-w-[calc(100vw-80px)] md:min-w-[320px] flex snap-center">
      <Link
        href={href}
        className={classNames(
          "relative flex-grow group rounded-3xl flex-1 my-2 items-center border-2 border-gray-600 h-40 overflow-clip bg-transparent "
        )}
      >
        {/* <Image
          src={bg}
          alt="background image"
          fill
          className="absolute top-0 pointer-events-none w-full object-cover z-10"
        /> */}
        {/* <div className="absolute top-0 left-[calc(50%-60px)] z-10">
          <Image src={icon} alt="Icon" width={602 / 5} height={173 / 5} />
        </div> */}
        <p
          className={classNames(
            "relative font-semibold text-xl dark:text-white text-center transition-all duration-300 z-20 w-full h-full flex flex-col justify-center",
            "group-hover:text-2xl  group-hover:text-white-shadow group-hover:dark:bg-black/50 group-hover:bg-slate-200"
          )}
        >
          {name}
        </p>
      </Link>
    </div>
  );
}
