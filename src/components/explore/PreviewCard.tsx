"use client";

import { electricBass } from "@/data/contracts";
import classNames from "classnames";
import { FaHeart } from "react-icons/fa";
import { useContractReads } from "wagmi";
import NFTAbi from "@/data/abi/NFTAbi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { zeroAddress } from "viem";
import shortAddress from "@/utils/w3String";
import Link from "next/link";

export type InstrumentType =
  | "electric-guitar"
  | "electric-bass"
  | "amps-effets"
  | "acoustic-guitar";
export default function PreviewCard(props: {
  id: number;
  type: InstrumentType;
}) {
  const { data: instrument } = useContractReads({
    contracts: [
      {
        address: electricBass,
        abi: NFTAbi,
        functionName: "tokenURI",
        args: [BigInt(props.id)],
      },
      {
        address: electricBass,
        abi: NFTAbi,
        functionName: "ownerOf",
        args: [BigInt(props.id)],
      },
    ],
  });

  const { data: metadata } = useQuery({
    queryKey: ["metadata", instrument?.[0]?.result || props.id],
    queryFn: () => {
      const actualCID = instrument?.[0]?.result?.replace("ipfs://", "");
      return fetch(`https://${actualCID}.ipfs.nftstorage.link/`).then((res) =>
        res.json()
      );
    },
    enabled: !!instrument?.[0]?.result,
  });

  console.log({ metadata, instrument });

  const parsedMetadata = {
    name: "Fender Jazzmaster 1965", //metadata?.name || "...",
  };

  return (
    <div
      className={classNames(
        "dark:card-bg border-primary-border dark:border-primary-border-dark rounded-2xl px-4 pt-5 pb-4",
        "max-w-[70vw] sm:max-w-[calc(50%-32px)] lg:max-w-[calc(33%-32px)]",
        "hover:translate-y-[-10px] transition-transform duration-300"
      )}
    >
      <div className="flex flex-row justify-between items-center">
        <div
          className="tooltip max-w-[60%] text-left overflow-hidden text-ellipsis"
          data-tip={parsedMetadata.name}
        >
          <div className="tooltip text-xl font-bold whitespace-nowrap w-full overflow-hidden text-ellipsis">
            {parsedMetadata.name}
          </div>
        </div>
        <button
          className={classNames(
            "btn btn-circle border-[1px] border-primary-border text-primary-border text-xl",
            "hover:border-red-600 hover:text-white hover:bg-red-600",
            "bg-transparent transition-colors duration-300"
          )}
        >
          <FaHeart />
        </button>
      </div>
      <div className="w-full px-2 py-3">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
          <Image
            src="/Graphics/thumbnail.jpeg"
            fill
            alt={`NFT-${props.id}-${props.type}`}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div>
          Creator:&nbsp;{shortAddress(instrument?.[1]?.result || zeroAddress)}
        </div>
        <Link
          className="main-secondary-btn w-auto rounded-full px-8 text-sm"
          href={`${props.type}/${props.id}`}
        >
          <span>View</span>
        </Link>
      </div>
    </div>
  );
}
