"use client";

import NFTAbi from "@/data/abi/NFTAbi";
import {
  acousticGuitars,
  ampsEffects,
  electricBass,
  electricGuitars,
} from "@/data/contracts";
import classNames from "classnames";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { useContractReads } from "wagmi";
import { useImmer } from "use-immer";

type SearchParams = {
  query: string;
  instrument: string;
};

export default function CardWrapper(props: {
  children: React.ReactNode;
  totalItems: number;
  loadedItems: number;
  onSearch: (vals: SearchParams) => void;
  onSort: (vals: string) => void;
  sortedBy?: string;
}) {
  const { totalItems, loadedItems, onSearch, onSort, sortedBy } = props;
  const [tagSelected, setTagSelected] = useImmer<Array<string>>([]);
  const [searchString, setSearchString] = useState<string>("");

  return (
    <div className="px-8">
      <div className="grid grid-cols-12">
        <div className="hidden md:block col-span-3 pr-4">
          <div className="form-control">
            <label className="label">
              <span className="font-bold text-xl">Search</span>
            </label>
            <div className="relative">
              <IoIosSearch className="absolute right-2 top-[12px] text-2xl pointer-events-none" />
              <input
                type="text"
                placeholder="Search NFT"
                onChange={(e) => setSearchString(e.target.value)}
                value={searchString}
                className="input input-bordered w-full pr-10 bg-transparent dark:bg-inherit border-primary-border placeholder:text-black/60 dark:placeholder:text-white/60"
                onFocus={(e) => e.currentTarget.select()}
              />
            </div>
          </div>
          <div className="collapse collapse-arrow duration-500">
            <input type="checkbox" defaultChecked />
            <div className="collapse-title text-xl">Categories</div>
            <div className="collapse-content">
              <SearchCheckbox
                name="Electric Guitar"
                onChange={() =>
                  setTagSelected((t) => {
                    const index = t.indexOf("electric-guitar");
                    if (index > -1) {
                      t.splice(index, 1);
                      return;
                    }
                    t.push("electric-guitar");
                    return;
                  })
                }
                checked={tagSelected.includes("electric-guitar")}
              />
              <SearchCheckbox
                name="Acoustic Guitar"
                onChange={() =>
                  setTagSelected((t) => {
                    const index = t.indexOf("acoustic-guitar");
                    if (index > -1) {
                      t.splice(index, 1);
                      return;
                    }
                    t.push("acoustic-guitar");
                    return;
                  })
                }
                checked={tagSelected.includes("acoustic-guitar")}
              />
              <SearchCheckbox
                name="Electric Bass"
                onChange={() =>
                  setTagSelected((t) => {
                    const index = t.indexOf("electric-bass");
                    if (index > -1) {
                      t.splice(index, 1);
                      return;
                    }
                    t.push("electric-bass");
                    return;
                  })
                }
                checked={tagSelected.includes("electric-bass")}
              />
              <SearchCheckbox
                name="Amps & Effects"
                onChange={() =>
                  setTagSelected((t) => {
                    const index = t.indexOf("amps-effects");
                    if (index > -1) {
                      t.splice(index, 1);
                      return;
                    }
                    t.push("amps-effects");
                    return;
                  })
                }
                checked={tagSelected.includes("amps-effects")}
              />
            </div>
          </div>
          <hr />
          <div className="flex flex-row items-center justify-center">
            <button
              className="main-btn"
              onClick={() => {
                onSearch({
                  instrument: tagSelected.join(","),
                  query: searchString,
                });
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-evenly gap-4 col-span-12 md:col-span-9 w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-2 sm:pb-8 px-4 w-full gap-1">
            <div>
              Showing 1 - {loadedItems} of {totalItems.toLocaleString()} results
            </div>
            <div>
              <div className="dropdown dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className=" border-primary-border border-[1px] rounded-full  px-4 py-2 flex flex-row items-center justify-between w-60 dark:bg-action-bg capitalize"
                >
                  <div>
                    {sortedBy == "" ? "Sort by " : sortedBy.replace(/-/g, " ")}
                  </div>
                  <BsChevronDown />
                </div>
                <ul
                  tabIndex={0}
                  className="p-2 big-shadow menu dropdown-content dark:bg-base-100 bg-white rounded-box w-52 z-20"
                >
                  <li>
                    <button onClick={() => onSort("")}>Any</button>
                  </li>
                  <li>
                    <div className="w-full py-2 text-disabled-text hover:bg-transparent pointer-events-none">
                      Guitars
                    </div>
                    <button
                      className="ml-4"
                      onClick={() => onSort("acoustic-guitar")}
                    >
                      Acoustics First
                    </button>
                    <button
                      className="ml-4"
                      onClick={() => onSort("electric-guitar")}
                    >
                      Electrics First
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onSort("electric-bass")}>
                      Basses First
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onSort("amps-effects")}>
                      Amps & Effects First
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {props.children}
          <div className="flex flex-row items-center justify-center py-10 w-full">
            <button className="main-secondary-btn border-primary-text dark:border-primary-text rounded-full">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TagSearch(props: {
  name: string;
  onClick: () => void;
  selected: boolean;
}) {
  const { name, onClick, selected } = props;
  return (
    <button
      className={classNames(
        "rounded-full dark:bg-action-bg bg-pending-bg text-disabled-text border-disabled-text border-[1.5px] px-4 py-2 uppercase font-normal tracking-widest",
        "hover:bg-primary-text dark:hover:bg-primary-text hover:border-primary-text hover:text-white transition-colors duration-300",
        selected
          ? "bg-primary-text dark:bg-primary-text text-white border-primary-text"
          : ""
      )}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

function SearchCheckbox(props: {
  name: string;
  checked?: boolean;
  onChange?: () => void;
}) {
  const { name, checked, onChange } = props;
  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start gap-4">
        <input
          type="checkbox"
          className="checkbox checkbox-xs md:checkbox-sm [--chkbg:theme(colors.primary-text)] [--chkfg:white] border-primary-border-dark"
          checked={checked}
          onChange={onChange}
        />
        <span className="label-text dark:text-white text-black text-xs lg:text-base">
          {name}
        </span>
      </label>
    </div>
  );
}
