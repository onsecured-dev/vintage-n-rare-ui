// instrument -> electric-guitar / electric-bass / acoustic-guitar / amps-effects
// id -> nft - id

import LikeButton from "@/components/explore/LikeButton";
import { InstrumentType } from "@/components/explore/PreviewCard";
import UserAvatar from "@/components/items/DetailAvatar";
import MainItemView from "@/components/items/MainItem";
import PageBreadcrumbs from "@/components/layout/PageBreadcrumbs";
import NFTAbi from "@/data/abi/NFTAbi";
import { contractAddressMapping } from "@/data/contracts";
import { previewData } from "@/data/placeholder";
import { InstrumentCategory, categoryDetails } from "@/util/util";
import shortAddress, { slugToName } from "@/utils/w3String";
import classNames from "classnames";
import Image from "next/image";
import { TbGuitarPickFilled } from "react-icons/tb";
import { useContractRead } from "wagmi";

// @todo if 0, redirect a explore page with error message
export default function InstrumentPage({
  params,
}: {
  params: { instrument: InstrumentType; id: string };
}) {
  const { instrument, id } = params;
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="container max-w-7xl px-8">
        <PageBreadcrumbs />
      </section>
      <section className="container max-w-7xl px-8">
        <h1 className="text-4xl font-semibold py-10 whitespace-pre-wrap capitalize">
          {slugToName(instrument as string)} #{id}
        </h1>
      </section>
      <MainItemView instrument={instrument} id={parseInt(id)} />
    </main>
  );
}
