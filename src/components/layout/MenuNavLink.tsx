"use client";

import classNames from "classnames";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function MenuNavLink(props: {
  title: string;
  links: Array<{ href: string; name: string }>;
}) {
  const { title, links } = props;

  return (
    <div className={classNames("dropdown z-50 dropdown-hover")}>
      <button
        className="text-lg font-semibold py-2 px-4 flex flex-row items-center gap-x-2 rounded-md hover:text-blue-600 lg:w-auto transition-colors duration-300"
        tabIndex={0}
      >
        <div>{title}</div>
        <FaChevronDown />
      </button>
      <ul
        className="menu menu-sm dropdown-content dark:bg-action-bg bg-white space-y-2 left-0 rounded-md border-[1px] dark:border-0 border-primary-border p-0"
        tabIndex={0}
      >
        {links.map((link, index) => {
          const isLast = index === links.length - 1;
          return (
            <li
              key={`nav-${title}-${index}`}
              className={classNames(
                "min-w-[200px] border-primary-border mt-0",
                isLast ? "border-0" : "border-b-[1px]"
              )}
            >
              <div className="group/menu flex flex-row items-center w-max py-3 bg-transparent hover:bg-transparent">
                <div className="w-0 group-hover/menu:w-3 h-[2px] transition-all duration-300 bg-primary-text" />
                <Link
                  href={link.href}
                  className="w-max group-hover/menu:text-primary-text text-base hover:bg-transparent"
                >
                  {link.name}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
