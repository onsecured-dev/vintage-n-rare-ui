"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";
import { FaChevronRight } from "react-icons/fa";
import classNames from "classnames";

const invalidPaths: Array<string> = [];
const explorePaths: Array<string> = [
  "acoustic-guitar",
  "electric-guitar",
  "electric-bass",
  "amps-effects",
];

export default function PageBreadcrumbs() {
  const path = usePathname();

  const pathItems = ["Home"].concat(path.split("/"));

  return (
    <div className="flex flex-row items-center gap-2 sm:gap-4 md:gap-6">
      {pathItems.map((item, i) => {
        if (!item) return null;
        const isLast = pathItems.length - 1 == i;
        const notLink = invalidPaths.includes(item);
        const isExplore = explorePaths.includes(item);
        return (
          <Fragment key={`breadcrumbs-${i}`}>
            <div className="text-slate-500 dark:text-white/70 text-md">
              {isLast || notLink ? (
                <span
                  className={classNames(
                    "capitalize text-sm md:text-base text-primary-text font-bold pointer-events-none",
                    notLink
                      ? "text-slate-500 dark:text-white/70 "
                      : "text-primary-text"
                  )}
                >
                  {item.replace(/-/g, " ")}
                </span>
              ) : (
                <Link
                  href={
                    i == 0
                      ? "/"
                      : isExplore
                      ? "/explore?instruments=" + item
                      : "/" + item
                  }
                  className="capitalize text-sm md:text-base font-bold hover:underline underline-offset-4 hover:text-primary-text/60"
                >
                  {item.replace(/-/g, " ")}
                </Link>
              )}
            </div>
            {isLast ? null : (
              <div className="text-slate-500 dark:text-white/70 text-xs md:text-md">
                <FaChevronRight />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
