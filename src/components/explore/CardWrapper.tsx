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
import { useContractReads } from "wagmi";

export default function CardWrapper(props: { children: React.ReactNode }) {
  const [tagSelected, setTagSelected] = useState<string>("All");
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
      <div className="flex flex-row items-center gap-4 pb-8 px-4">
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
          name="Amps"
          onClick={() => setTagSelected("Amps")}
          selected={tagSelected === "Amps"}
        />
        <TagSearch
          name="Effects"
          onClick={() => setTagSelected("Effects")}
          selected={tagSelected === "Effects"}
        />
      </div>
      <div className="flex flex-row items-center justify-between pb-8 px-4">
        <div>Showing 1 - 10 of {totalInstruments.toLocaleString()} results</div>
        <div>
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className=" border-primary-border-dark border-[1px] rounded-full  px-4 py-2 flex flex-row items-center justify-between w-60 bg-action-bg capitalize"
            >
              <div>
                {sortedBy == "" ? "Sort by " : sortedBy.replace(/-/g, " ")}
              </div>
              <BsChevronDown />
            </div>
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 z-20"
            >
              <li>
                <div className="w-full py-2 text-disabled-text">Guitars</div>
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
                  Amps First
                </button>
              </li>
              <li>
                <button onClick={() => setSortedBy("effects-first")}>
                  Effects First
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-evenly gap-4 w-full">
        {props.children}
      </div>
      <div className="flex flex-row items-center justify-center py-10">
        <button className="main-secondary-btn border-primary-text dark:border-primary-text rounded-full">
          Load More
        </button>
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
