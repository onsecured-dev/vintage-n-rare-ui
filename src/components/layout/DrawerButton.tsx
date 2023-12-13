"use client";
import { useState } from "react";
import classNames from "classnames";
import { IoMenu, IoClose } from "react-icons/io5";
import { ConnectKitButton } from "@/components/wrapper/ConnectKitButton";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export default function DrawerButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <details
      className="dropdown block dropdown-end"
      onClick={() => setIsOpen((p) => !p)}
    >
      <summary
        className={classNames(
          "btn swap swap-rotate btn-circle btn-primary btn-outline bg-white dark:bg-action-bg border-primary-border dark:border-primary-border-dark border-2 mr-8",
          isOpen ? "swap-active" : ""
        )}
      >
        <IoMenu className="swap-off" />
        <IoClose className="swap-on" />
      </summary>
      <ul
        className={classNames(
          "menu dropdown-content w-[calc(100vw)] bg-action-bg z-50 p-0"
        )}
      >
        <li className="py-2 text-center w-full text-lg">
          <Link
            onClick={() => setIsOpen(false)}
            href="/"
            className="w-full block text-center"
          >
            Home
          </Link>
        </li>
        <li className="py-2 text-center w-full text-lg">Create</li>
        <li className="py-2 text-center w-full text-sm bg-primary-text/30">
          <Link
            onClick={() => setIsOpen(false)}
            href="/create/acoustic-guitar"
            className="w-full block text-center"
          >
            Acoustic Guitars
          </Link>
        </li>
        <li className="py-2 text-center w-full text-sm bg-primary-text/30">
          <Link
            onClick={() => setIsOpen(false)}
            href="/create/electric-bass"
            className="w-full block text-center"
          >
            Electric Bass
          </Link>
        </li>
        <li className="py-2 text-center w-full text-sm bg-primary-text/30">
          <Link
            onClick={() => setIsOpen(false)}
            href="/create/electric-guitar"
            className="w-full block text-center"
          >
            Electric Guitars
          </Link>
        </li>
        <li className="py-2 text-center w-full text-sm bg-primary-text/30">
          <Link
            onClick={() => setIsOpen(false)}
            href="/create/amps-effects"
            className="w-full block text-center"
          >
            Amps & Effects
          </Link>
        </li>
        <li className="py-2 text-center w-full text-lg">Explore</li>
        <li className="flex flex-row items-center justify-center py-2">
          <ConnectKitButton />
        </li>
      </ul>
    </details>
  );
}
