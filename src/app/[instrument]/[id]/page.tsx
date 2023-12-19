// instrument -> electric-guitar / electric-bass / acoustic-guitar / amps-effects
// id -> nft - id

import LikeButton from "@/components/explore/LikeButton";
import UserAvatar from "@/components/items/DetailAvatar";
import PageBreadcrumbs from "@/components/layout/PageBreadcrumbs";
import { previewData } from "@/data/placeholder";
import shortAddress, { slugToName } from "@/utils/w3String";
import classNames from "classnames";
import Image from "next/image";
import { TbGuitarPickFilled } from "react-icons/tb";

// @todo if 0, redirect a explore page with error message
export default function InstrumentPage({
  params,
}: {
  params: { instrument: string; id: string };
}) {
  const nftItem = previewData.find(
    (item) => item.type === params.instrument && item.id === parseInt(params.id)
  );
  if (!nftItem)
    return (
      <div className="text-center capitalize text-4xl min-h-screen flex-col items-center justify-center">
        not found
      </div>
    );
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="container max-w-7xl px-8">
        <PageBreadcrumbs />
      </section>
      <section className="container max-w-7xl px-8">
        <h1 className="text-4xl font-semibold py-10 whitespace-pre-wrap capitalize">
          {slugToName(params.instrument)} #{params.id}
        </h1>
      </section>
      <section className="max-w-7xl px-8 h-full w-full">
        <div className="w-full grid grid-cols-12 px-2 h-full">
          <div className="relative md:col-span-5 col-span-12 w-full aspect-[1/1.34] rounded-sm overflow-hidden">
            <Image
              src={`/placeholders/${nftItem.img}.jpeg`}
              fill
              alt={`item-${params.instrument}-${params.id}`}
            />
          </div>
          <div className="col-span-12 md:col-span-7 pl-0 md:pl-8 pt-8 md:pt-0">
            <div className="flex flex-col-reverse sm:flex-row items-center gap-4">
              <LikeButton instrument={nftItem.type} id={nftItem.id} />
              <h2 className="text-3xl font-semibold capitalize">
                {nftItem.brand} {nftItem.model} {nftItem.year}
              </h2>
            </div>
            {/* TAB LIST */}
            <div className="flex flex-row items-end pt-8 ">
              <div role="tablist" className="tabs tabs-bordered">
                <button
                  role="tab"
                  className="tab tab-active [--fallback-bc:theme(colors.primary-text)] text-white border-primary-text"
                >
                  Details
                </button>
              </div>
              <div className="h-2 w-full flex-1 border-b-[2px] border-disabled-text/50" />
            </div>
            {/* Avatars */}
            <div className="py-6 flex flex-col sm:flex-row items-center gap-6">
              <div>
                <label className="label">
                  <span className="label-text">Current Owner</span>
                </label>
                <UserAvatar address="0x1234asbcda3d" variant="blue" />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Creator</span>
                </label>
                <UserAvatar address="0x2fd49be1afee78" variant="red" />
              </div>
            </div>
            <div className="flex flex-row items-center border-b-2 border-disabled-text/50 pb-4 gap-4">
              <TbGuitarPickFilled className="text-4xl dark:text-white/70 text-black/70" />
              <h3 className="text-xl">
                <span className="dark:text-gray-400 text-gray-600">
                  Main Properties
                </span>
              </h3>
            </div>
            <div className="flex flex-row items-center justify-start flex-wrap py-4 gap-6">
              <MainProperty label="Brand" value={nftItem.brand} />
              <MainProperty label="Model" value={nftItem.model} />
              <MainProperty label="Year" value={nftItem.year.toString()} />
              <MainProperty label="Serial" value={nftItem.serial} />
              <MainProperty label="Handedness" value={"Right"} />
              <MainProperty label="Finish" value={"-"} />
            </div>
            <div className="flex flex-row items-center border-b-2 border-disabled-text/50 pb-4 gap-4">
              <TbGuitarPickFilled className="text-4xl dark:text-white/70 text-black/70" />
              <h3 className="text-xl">
                <span className="dark:text-gray-400 text-gray-600">
                  Other Details
                </span>
              </h3>
            </div>
            <ul className="grid grid-cols-2">
              <SecondaryProperty label="Body Type" value="N/A" />
              <SecondaryProperty label="Body Material" value="N/A" />
              <SecondaryProperty label="Finish Material" value="N/A" />
              <SecondaryProperty label="Body Color" value="N/A" />
              <SecondaryProperty label="Neck Material" value="N/A" />
              <SecondaryProperty label="Neck Shape" value="N/A" />
              <SecondaryProperty label="Fingerboard Material" value="N/A" />
              <SecondaryProperty label="Fingerboard Radius" value="N/A" />
              <SecondaryProperty label="Neck Fingerboard" value="N/A" />
              <SecondaryProperty label="Scale Length" value="N/A" />
              <SecondaryProperty label="Nut Width" value="N/A" />
              <SecondaryProperty label="Weight" value="N/A" />
              <SecondaryProperty label="Tuners" value="N/A" />
              {/* <SecondaryProperty label="Neck Profile" value="N/A" />
              <SecondaryProperty label="Neck Thickness" value="N/A" />
              <SecondaryProperty label="Electronics" value="N/A" />
              <SecondaryProperty label="Pot. Opcodes" value="N/A" />
              <SecondaryProperty label="Pickup Impedance" value="N/A" />
              <SecondaryProperty label="Has Brazilian Rosewood" value="N/A" />
              <SecondaryProperty label="Case" value="N/A" />
              <SecondaryProperty label="Modifications or Repairs" value="N/A" /> */}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

function MainProperty(props: { label: string; value: string }) {
  return (
    <div
      className={classNames(
        "rounded-2xl dark:card-bg bg-white text-center py-4",
        "w-[calc(50%-16px)] lg:w-[calc(33.33%-16px)]"
      )}
    >
      <div className="label-text text-center w-full pb-2">{props.label}</div>
      <div className="text-sm sm:text-lg font-semibold">{props.value}</div>
    </div>
  );
}

function SecondaryProperty(props: { label: string; value: string }) {
  const { label, value } = props;
  return (
    <li className="border-b-2 border-primary-border-dark py-4 pl-4">
      <div className="flex flex-row items-center gap-4">
        <div className="text-sm font-semibold w-1/3">{label}</div>
        <div className="text-sm">{value}</div>
        <div className="text-sm font-semibold w-1/3">-</div>
      </div>
    </li>
  );
}
