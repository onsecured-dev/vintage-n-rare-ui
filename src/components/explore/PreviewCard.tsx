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
import LikeButton from "./LikeButton";

export type InstrumentType =
  | "electric-guitar"
  | "electric-bass"
  | "amps-effects"
  | "amps"
  | "acoustic-guitar";

const typeId = {
  "electric-guitar": "EG",
  "electric-bass": "EB",
  "amps-effects": "AM",
  amps: "AM",
  "acoustic-guitar": "AG",
};
export default function PreviewCard(props: {
  id: number;
  type: InstrumentType;
  brand: string;
  model: string;
  year: number;
  img: string;
}) {
  const { type, id, brand, model, year, img } = props;
  const { data: instrument } = useContractReads({
    contracts: [
      {
        address: electricBass,
        abi: NFTAbi,
        functionName: "tokenURI",
        args: [BigInt(id)],
      },
      {
        address: electricBass,
        abi: NFTAbi,
        functionName: "ownerOf",
        args: [BigInt(id)],
      },
    ],
  });

  const { data: metadata } = useQuery({
    queryKey: ["metadata", instrument?.[0]?.result || id],
    queryFn: () => {
      const actualCID = instrument?.[0]?.result?.replace("ipfs://", "");
      return fetch(`https://${actualCID}.ipfs.nftstorage.link/`).then((res) =>
        res.json()
      );
    },
    enabled: !!instrument?.[0]?.result,
  });

  return (
    <div
      className={classNames(
        "dark:card-bg bg-white card-shadow border-primary-border dark:border-primary-border-dark rounded-2xl px-4 pt-5 pb-4 border-[1.5px]",
        "max-w-[80vw] sm:max-w-[calc(50%-32px)] xl:max-w-[calc(33.33%-32px)] w-full",
        "hover:translate-y-[-10px] transition-transform duration-300"
      )}
    >
      <div className="text-base font-bold whitespace-nowrap w-full overflow-hidden text-ellipsis">
        {`${year} ${brand} ${model}`}
      </div>
      <div className="w-full px-2 py-3">
        <div className="relative w-full aspect-[1/1.34] ">
          <Image
            src={`/placeholders/${img}.jpeg`}
            fill
            alt={`NFT-${id}-${props.type}`}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 px-2">
        <div className="flex flex-row justify-between items-center py-2 w-full">
          <div
            className={classNames(
              "text-xs font-semibold whitespace-nowrap w-full overflow-hidden text-ellipsis",
              "text-disabled-text dark:text-white/60"
            )}
          >
            <span className="text-white">
              #{typeId[type]} {id}
            </span>
            &nbsp;{metadata?.serial || "A1B2C3D4"}
          </div>
          <LikeButton instrument={type} id={id} />
        </div>
        <Link
          className="main-secondary-btn w-auto rounded-full px-8 text-sm text-disabled-text border-primary-border"
          href={`${props.type}/${id}`}
        >
          <span>View</span>
        </Link>
      </div>
    </div>
  );
}
