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

export default function CardWrapper(props: { children: React.ReactNode }) {
  const [tagSelected, setTagSelected] = useImmer<Array<string>>([]);
  const [sortedBy, setSortedBy] = useState<string>("");
  const { data: nfts } = useContractReads({
    contracts: [
      {
        address: electricBass,
        abi: NFTAbi,
        functionName: "totalSupply",
      },
      {
        address: electricGuitars,
        abi: NFTAbi,
        functionName: "totalSupply",
      },
      {
        address: acousticGuitars,
        abi: NFTAbi,
        functionName: "totalSupply",
      },
      {
        address: ampsEffects,
        abi: NFTAbi,
        functionName: "totalSupply",
      },
    ],
  });

  const parsedNFTInfo = {
    totalBass: nfts?.[0]?.result || 0n,
    totalElectricGuitar: nfts?.[1]?.result || 0n,
    totalAcousticGuitar: nfts?.[2]?.result || 0n,
    totalAmpsEffects: nfts?.[3]?.result || 0n,
  };
  const totalInstruments = parseInt(
    (
      parsedNFTInfo.totalBass +
      parsedNFTInfo.totalElectricGuitar +
      parsedNFTInfo.totalAcousticGuitar +
      parsedNFTInfo.totalAmpsEffects
    ).toString()
  );
  return (
    <div className="px-8">
      {/* <div className="flex flex-row items-center gap-4 pb-8 px-4">
        <TagSearch
          name="All"
          onClick={() => setTagSelected("All")}
          selected={tagSelected === "All"}
        />
        <TagSearch
          name="Electric Guitar"
          onClick={() => setTagSelected("Electric Guitar")}
          selected={tagSelected === "Electric Guitar"}
        />
        <TagSearch
          name="Electric Bass"
          onClick={() => setTagSelected("Electric Bass")}
          selected={tagSelected === "Electric Bass"}
        />
        <TagSearch
          name="Amps & Effects"
          onClick={() => setTagSelected("Amps & Effects")}
          selected={tagSelected === "Amps & Effects"}
        />
        <TagSearch
          name="Acoustic Guitar"
          onClick={() => setTagSelected("Acoustic Guitar")}
          selected={tagSelected === "Acoustic Guitar"}
        />
      </div> */}
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
                    if (t.includes("Electric Guitar")) {
                      t.filter((e) => e !== "Electric Guitar");
                      return;
                    }
                    t.push("Electric Guitar");
                    return;
                  })
                }
                checked={tagSelected.includes("Electric Guitar")}
              />
              <SearchCheckbox
                name="Acoustic Guitar"
                onChange={() =>
                  setTagSelected((t) => {
                    if (t.includes("Acoustic Guitar")) {
                      t.filter((e) => e !== "Acoustic Guitar");
                      return;
                    }
                    t.push("Acoustic Guitar");
                    return;
                  })
                }
                checked={tagSelected.includes("Acoustic Guitar")}
              />
              <SearchCheckbox
                name="Electric Bass"
                onChange={() =>
                  setTagSelected((t) => {
                    if (t.includes("Electric Bass")) {
                      t.filter((e) => e !== "Electric Bass");
                      return;
                    }
                    t.push("Electric Bass");
                    return;
                  })
                }
                checked={tagSelected.includes("Electric Bass")}
              />
              <SearchCheckbox
                name="Amps & Effects"
                onChange={() =>
                  setTagSelected((t) => {
                    if (t.includes("Amps & Effects")) {
                      t.filter((e) => e !== "Amps & Effects");
                      return;
                    }
                    t.push("Amps & Effects");
                    return;
                  })
                }
                checked={tagSelected.includes("Amps & Effects")}
              />
            </div>
          </div>
          <hr />
        </div>
        <div className="flex flex-row flex-wrap items-center justify-evenly gap-4 col-span-12 md:col-span-9">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-2 sm:pb-8 px-4 w-full gap-1">
            <div>
              Showing 1 - 10 of {totalInstruments.toLocaleString()} results
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
                    <button onClick={() => setSortedBy("")}>Any</button>
                  </li>
                  <li>
                    <div className="w-full py-2 text-disabled-text hover:bg-transparent pointer-events-none">
                      Guitars
                    </div>
                    <button
                      className="ml-4"
                      onClick={() => setSortedBy("acoustic-guitars-first")}
                    >
                      Acoustics First
                    </button>
                    <button
                      className="ml-4"
                      onClick={() => setSortedBy("electric-guitars-first")}
                    >
                      Electrics First
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setSortedBy("basses-first")}>
                      Basses First
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setSortedBy("amps-first")}>
                      Amps & Effects First
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {props.children}
          <div className="flex flex-row items-center justify-center py-10">
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
          className="checkbox checkbox-sm [--chkbg:theme(colors.primary-text)] [--chkfg:white] border-primary-border-dark"
          checked={checked}
          onChange={onChange}
        />
        <span className="label-text dark:text-white text-black text-base">
          {name}
        </span>
      </label>
    </div>
  );
}
