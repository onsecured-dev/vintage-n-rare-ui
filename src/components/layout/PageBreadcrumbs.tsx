"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";
import { FaChevronRight } from "react-icons/fa";
import classNames from "classnames";

const invalidPaths = ["create"];

export default function PageBreadcrumbs() {
  const path = usePathname();

  const pathItems = ["Home"].concat(path.split("/"));

  return (
    <div className="flex flex-row items-center gap-6">
      {pathItems.map((item, i) => {
        if (!item) return null;
        const isLast = pathItems.length - 1 == i;
        const notLink = invalidPaths.includes(item);
        console.log({ item, isLast, invalidPaths, notLink });
        return (
          <Fragment key={`breadcrumbs-${i}`}>
            <div className="text-slate-500 dark:text-white/70 text-md">
              {isLast || notLink ? (
                <span
                  className={classNames(
                    "capitalize text-primary-text font-bold",
                    notLink
                      ? "text-slate-500 dark:text-white/70 pointer-events-none"
                      : "text-primary-text"
                  )}
                >
                  {item}
                </span>
              ) : (
                <Link
                  href={i == 0 ? "/" : "/" + item}
                  className="capitalize font-bold hover:underline underline-offset-4 hover:text-primary-text/60"
                >
                  {item}
                </Link>
              )}
            </div>
            {isLast ? null : (
              <div className="text-slate-500 dark:text-white/70 text-md">
                <FaChevronRight />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
