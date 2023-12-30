"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import classNames from "classnames";
import { IoMenu, IoClose } from "react-icons/io5";
import { ConnectKitButton } from "@/components/wrapper/ConnectKitButton";
import Link from "next/link";

export default function DrawerButton() {
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const handleProperClose = useCallback(() => {
    detailsRef.current?.removeAttribute("open");
    setIsOpen(false);
  }, [setIsOpen, detailsRef]);
  return (
    <details className="dropdown block dropdown-end" ref={detailsRef}>
      <summary
        className={classNames(
          "btn swap swap-rotate btn-circle btn-primary btn-outline bg-white dark:bg-action-bg border-primary-border dark:border-primary-border-dark border-2 mr-8",
          isOpen ? "swap-active" : ""
        )}
        onClick={() => {
          setIsOpen((p) => !p);
        }}
      >
        <IoMenu className="swap-off" />
        <IoClose className="swap-on" />
      </summary>
      <ul
        className={classNames(
          "menu dropdown-content w-[calc(100vw)] dark:bg-action-bg bg-gray-100 drop-shadow-md z-50 p-0"
        )}
      >
        <li
          className="py-2 text-center w-full text-lg"
          onClick={handleProperClose}
        >
          <Link href="/" className="w-full block text-center">
            Home
          </Link>
        </li>
        <li className="py-2 text-center w-full text-lg">Create</li>
        <li
          className="py-2 text-center w-full text-sm bg-primary-text/30"
          onClick={handleProperClose}
        >
          <Link
            onClick={() => detailsRef.current?.removeAttribute("open")}
            href="/create/acoustic-guitar"
            className="w-full block text-center"
          >
            Acoustic Guitars
          </Link>
        </li>
        <li
          className="py-2 text-center w-full text-sm bg-primary-text/30"
          onClick={handleProperClose}
        >
          <Link
            onClick={() => detailsRef.current?.removeAttribute("open")}
            href="/create/electric-bass"
            className="w-full block text-center"
          >
            Electric Bass
          </Link>
        </li>
        <li
          className="py-2 text-center w-full text-sm bg-primary-text/30"
          onClick={handleProperClose}
        >
          <Link
            onClick={() => detailsRef.current?.removeAttribute("open")}
            href="/create/electric-guitar"
            className="w-full block text-center"
          >
            Electric Guitars
          </Link>
        </li>
        <li
          className="py-2 text-center w-full text-sm bg-primary-text/30"
          onClick={handleProperClose}
        >
          <Link
            onClick={() => detailsRef.current?.removeAttribute("open")}
            href="/create/amps"
            className="w-full block text-center"
          >
            Amps
          </Link>
        </li>
        <li
          className="py-2 text-center w-full text-lg"
          onClick={handleProperClose}
        >
          <Link
            onClick={() => detailsRef.current?.removeAttribute("open")}
            href="/explore"
            className="w-full block text-center"
          >
            Explore
          </Link>
        </li>
        <li
          className="py-2 text-center w-full text-lg"
          onClick={handleProperClose}
        >
          <Link
            onClick={() => detailsRef.current?.removeAttribute("open")}
            href="/about"
            className="w-full block text-center"
          >
            About
          </Link>
        </li>
        <li
          className="flex flex-row items-center justify-center py-2"
          onClick={handleProperClose}
        >
          <ConnectKitButton />
        </li>
      </ul>
    </details>
  );
}
