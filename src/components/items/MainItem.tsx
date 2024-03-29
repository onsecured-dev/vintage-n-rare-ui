"use client";

import Image from "next/image";
import { contractAddressMapping } from "@/data/contracts";
import { InstrumentCategory, categoryDetails } from "@/util/util";
import classNames from "classnames";
import { useContractRead } from "wagmi";
import { InstrumentType } from "@/components/explore/PreviewCard";
import NFTAbi from "@/data/abi/NFTAbi";
import LikeButton from "@/components/explore/LikeButton";
import { useQuery } from "@tanstack/react-query";
import UserAvatar, { LinkAvatar } from "@/components/items/DetailAvatar";
import { TbGuitarPickFilled } from "react-icons/tb";
import attributesParse, {
  AttributeType,
  attributesToDB,
} from "@/utils/attributesParse";
import { zeroAddress } from "viem";
import { ipfsFetchURL } from "@/utils/pinata";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";

export default function MainItemView(props: {
  instrument: InstrumentType;
  id: number;
}) {
  const { instrument, id } = props;
  const {
    data: nftURI,
    error: uriError,
    isLoading,
  } = useContractRead({
    address: contractAddressMapping[instrument as string as InstrumentType],
    abi: NFTAbi,
    functionName: "tokenURI",
    args: [BigInt(id as unknown as number)],
  });
  const {
    data: owner,
    error: ownerError,
    isLoading: isOwnerLoadingError,
  } = useContractRead({
    address: contractAddressMapping[instrument as string as InstrumentType],
    abi: NFTAbi,
    functionName: "ownerOf",
    args: [BigInt(id as unknown as number)],
  });

  const { data: metadata, status } = useQuery({
    queryKey: ["metadata", id, instrument],
    queryFn: () => {
      if (!nftURI) return;
      const actualCID = ipfsFetchURL(nftURI, "ipfs://");
      return fetch(actualCID).then((res) => res.json());
    },
    enabled: !!nftURI && nftURI !== "ipfs://" && !uriError,
  });

  const {
    data: searchInfo,
    status: searchStatus,
    refetch: getInfo,
  } = trpc.checkSearchTableExistence.useQuery({
    id: id,
    type: instrument,
  });

  const {
    mutate: pushToDB,
    isError: pushError,
    status: pushToDBStatus,
  } = trpc.pushNFTtoDb.useMutation({
    onSuccess: () => {
      getInfo();
    },
  });

  console.log({ metadata, status, searchInfo });
  if (!metadata && status === "pending")
    return (
      <>
        <h3 className="text-3xl font-semibold py-10">
          ...Loading <span className="loading loading-spinner" />
        </h3>
      </>
    );
  if (!metadata && status !== "pending") {
    return (
      <>
        <h3 className="text-base font-semibold py-10 text-center">
          It&apos;s possible that the item you&apos;re looking for doesn&apos;t
          exist.
        </h3>
        <h4 className="">Try again with another ID</h4>
        <Link className="btn btn-link" href="/explore">
          Back to Explore
        </Link>
      </>
    );
  }

  const attributes = attributesParse(metadata.attributes);
  console.log({ metadata, attributes });
  return (
    <>
      <section className="max-w-7xl px-8 h-full w-full">
        <div className="w-full grid grid-cols-12 px-2 h-full">
          <div className="relative md:col-span-5 col-span-12 w-full aspect-[1/1.34] rounded-sm overflow-hidden">
            {status == "success" ? (
              <Image
                src={ipfsFetchURL(metadata.image, "ipfs://")}
                fill
                alt={`item-${instrument}-${id}`}
              />
            ) : (
              <div className="loading loading-spinner text-2xl text-primary-text" />
            )}
          </div>
          <div className="col-span-12 md:col-span-7 pl-0 md:pl-8 pt-8 md:pt-0">
            {(searchInfo?.id || 0) == 0 && searchStatus !== "loading" ? (
              <div className="w-full pb-2 flex flex-row items-center justify-between">
                <div className="py-1 px-2 bg-red-500 text-white rounded-xl w-fit">
                  Hidden In Explorer!
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  disabled={pushToDBStatus === "loading"}
                  onClick={() => {
                    console.log("add again");
                    pushToDB({
                      nftmetadataCID: nftURI,
                      nftid: id.toString(),
                      nftType: instrument,
                      nftData: JSON.stringify(
                        attributesToDB(metadata.attributes)
                      ),
                      dataAsIs: true,
                    });
                  }}
                >
                  {pushToDBStatus === "loading" ? (
                    <span className="loading loading-spinner" />
                  ) : (
                    "Add to Explorer"
                  )}
                </button>
              </div>
            ) : null}
            <div className="flex flex-col-reverse sm:flex-row items-center gap-4">
              <LikeButton instrument={metadata.type} id={metadata.id} />
              <h2 className="text-3xl font-semibold capitalize">
                {metadata.name}
              </h2>
            </div>

            {/* TAB LIST */}
            <div className="flex flex-row items-end pt-8 ">
              <div role="tablist" className="tabs tabs-bordered">
                <button
                  role="tab"
                  className="tab tab-active font-semibold [--fallback-bc:theme(colors.primary-text)] dark:text-white border-primary-text hover:text-primary-text"
                >
                  Details
                </button>
                {/* <button
                  role="tab"
                  className="tab tab-active font-semibold [--fallback-bc:theme(colors.primary-text)] text-white border-primary-text hover:text-primary-text"
                >
                  Bids
                </button>
                <button
                  role="tab"
                  className="tab tab-active font-semibold [--fallback-bc:theme(colors.primary-text)] text-white border-primary-text hover:text-primary-text"
                >
                  History
                </button> */}
              </div>
              <div className="h-2 w-full flex-1 border-b-[2px] border-disabled-text/50" />
            </div>
            {/* Avatars */}
            <div className="py-6 flex flex-col sm:flex-row items-center gap-6">
              <div>
                <label className="label">
                  <span className="label-text">Current Owner</span>
                </label>
                <UserAvatar address={owner || zeroAddress} variant="blue" />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Creator</span>
                </label>
                <UserAvatar address={owner || zeroAddress} variant="red" />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Verification</span>
                </label>
                <LinkAvatar
                  href={`https://${
                    process.env.NODE_ENV === "development" ? "testnet." : ""
                  }bscscan.com/token/${
                    contractAddressMapping[
                      instrument as string as InstrumentType
                    ]
                  }?a=${id}`}
                  name="Chain Verification"
                />
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
              <MainProperty label="Brand" value={attributes.brand} />
              <MainProperty label="Model" value={attributes.model} />
              <MainProperty
                label="Year"
                value={attributes.year || attributes.madeinyear}
              />
              <MainProperty label="Serial" value={attributes.serial || "-"} />
              {instrument != InstrumentCategory.AmpsEffects ? (
                <MainProperty
                  label="Handedness"
                  value={attributes.handedness}
                />
              ) : null}
              <MainProperty label="Finish" value={attributes.finish} />
            </div>
            <div className="flex flex-row items-center border-b-2 border-disabled-text/50 pb-4 gap-4">
              <TbGuitarPickFilled className="text-4xl dark:text-white/70 text-black/70" />
              <h3 className="text-xl">
                <span className="dark:text-gray-400 text-gray-600">
                  Other Details
                </span>
              </h3>
            </div>

            <ul className="grid xl:grid-cols-2 grid-cols-1 gap-x-6">
              <PropertyManager
                instrument={instrument as string}
                data={metadata.attributes}
              />
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function PropertyManager(props: {
  instrument: string;
  data: Array<AttributeType>;
}) {
  const { instrument, data } = props;
  // @todo receive data

  // switch statement with key instrument categories guitar, bass, acoustic, amps-effects
  // InstrumentCategory
  // categoryDetails[InstrumentCategory.Acoustic]
  // return (
  //   <div>
  //     {categoryDetails[InstrumentCategory.Acoustic].map((item:any) => {
  //       return <div>{item.label}</div>
  //     })

  switch (instrument) {
    case InstrumentCategory.Guitar:
      return categoryDetails.Bass.map((item: any, index: number) => {
        // remove spaces and special characters from item
        const spacelessItem = item.replace(/\s/g, "");
        const itemWithoutPunctuationOrSpecialCharacters = spacelessItem.replace(
          /[^\w\s]|_/g,
          ""
        );
        const value = data.find(
          (attr) =>
            attr.trait_type === item ||
            attr.trait_type === itemWithoutPunctuationOrSpecialCharacters
        )?.value;
        return (
          <SecondaryProperty
            label={item}
            value={value ? value : "N/A"}
            key={`inst-${item}-${index}`}
          />
        );
      });
    case InstrumentCategory.Bass:
      return categoryDetails.Bass.map((item: any, index: number) => {
        const value = props.data[index]?.value;
        return (
          <SecondaryProperty
            label={item}
            value={value ? value : "N/A"}
            key={`inst-${item}-${index}`}
          />
        );
      });
    case InstrumentCategory.Acoustic:
      return categoryDetails.Acoustic.map((item: any, index: number) => {
        const value = data[index]?.value;
        return (
          <SecondaryProperty
            label={item}
            value={value || "N/A"}
            key={`inst-${item.name}-${item.name}`}
          />
        );
      });
    case InstrumentCategory.AmpsEffects:
      return categoryDetails.AmpsEffects.map((item: any, index: number) => {
        const value = data[index]?.value;
        return (
          <SecondaryProperty
            label={item}
            value={value || "-"}
            key={`inst-${item.name}-${index}`}
          />
        );
      });
    default:
      return <></>;
  }
}

function MainProperty(props: { label: string; value: string | number }) {
  return (
    <div
      className={classNames(
        "rounded-2xl dark:card-bg bg-white text-center py-4",
        "w-[calc(50%-16px)] lg:w-[calc(33.33%-16px)]",
        "shadow-lg"
      )}
    >
      <div className="label-text text-center w-full pb-2">{props.label}</div>
      <div className="text-sm sm:text-lg font-semibold capitalize">
        {props.value}
      </div>
    </div>
  );
}

function SecondaryProperty(props: { label: string; value: string }) {
  const { label, value } = props;
  return (
    <li className="border-b-2 border-primary-border-dark py-4 pl-4 flex flex-col justify-center">
      <div className="grid grid-cols-9 items-center gap-4">
        <div className="text-sm font-semibold col-span-4">{label}</div>
        <div className="text-sm col-span-5">{value}</div>
      </div>
    </li>
  );
}
