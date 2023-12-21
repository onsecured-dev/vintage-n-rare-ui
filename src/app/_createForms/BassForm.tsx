"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import DragDropFileInput from "@/components/create/DragDropFileInput";
import Input from "@/components/create/Inputs";
import {
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { electricBass } from "@/data/contracts";
import NFTAbi from "@/data/abi/NFTAbi";
import { zeroAddress } from "viem";
import LoadingModal from "@/components/create/LoadingModal";
import { useRef } from "react";
import { trpc } from "../_trpc/client";
import classNames from "classnames";
// import nodemailer from 'nodemailer';
import { OrderNowModal } from "@/components/create/OrderNowModal";

type BassFormValues = {
  image: FileList | null;
  instrument: string;
  model: string;
  year: number;
  brand: string;
  serial: string;
  handedness: "left" | "right";
  bodyMaterial: string;
  finish: string;
  finishMaterial: string;
  radius: string;
  weight: string;
  tuners: string;
  scaleLength: string;
  nutWidth: string;
  neckProfile: string;
  neckThickness: string;
  potCodes: string;
  electronics: string;
  pickupImpedance: string;
  neckFingerboard: string;
  case: string;
  mods: string;
};

export default function BassForm() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalOrdRef = useRef<HTMLDialogElement>(null);
  const { register, handleSubmit, setValue, reset, watch, getValues } =
    useForm<BassFormValues>({
      defaultValues: {
        image: null,
        instrument: "Fender Jazzmaster 1965 / Lake Placid Blue",
        model: "Jazzmaster",
        year: 1965,
        brand: "Fender",
        serial: "1234abcd",
        handedness: "right",
        bodyMaterial: "Alder Ash Basswood",
        finish: "Lake Placid Blue",
        finishMaterial: "nitrocellulose lacquer",
        radius: "9.5 in",
        weight: "8.6 lbs",
        tuners: "N/A",
        scaleLength: "64.77 cm",
        nutWidth: "42 mm",
        neckProfile: "Mid '60s 'C'",
        neckThickness: "21.8 mm",
        potCodes: "CTS 1 MOhm",
        electronics: "Pickups VintageStyle '60s Single-Coil Jazzmaster",
        pickupImpedance: "8K Ohms",
        neckFingerboard: "Maple 4 bolt Glass Urethane",
        case: "Not included",
        mods: "Minor paint touchups on headstock",
      },
    });
  const {
    mutate: createBass,
    data: cidData,
    status: metadataStatus,
  } = trpc.createBass.useMutation();

  const onSubmit: SubmitHandler<BassFormValues> = (data) => {
    if (!data.image || data.image.length !== 1) return;
    const baseImg = data.image[0];
    if (!baseImg) return;
    console.log("has file");
    const reader = new FileReader();
    reader.readAsDataURL(baseImg);
    reader.onload = () => {
      const base64 = reader.result?.toString();
      if (!base64) return;
      console.log("file loaded as string");
      createBass({
        image: base64,
        object: {
          ...data,
          fileName: baseImg.name,
          fileType: baseImg.type,
        },
      });
    };
  };

  const { address } = useAccount();
  const { data: nftData } = useContractReads({
    contracts: [
      {
        address: electricBass,
        abi: NFTAbi,
        functionName: "creators",
        args: [address || zeroAddress],
      },
      {
        address: electricBass,
        abi: NFTAbi,
        functionName: "publicFee",
      },
    ],
  });

  const { config } = usePrepareContractWrite({
    address: electricBass,
    abi: NFTAbi,
    functionName: "mint",
    args: [cidData],
    value:
      nftData?.[0]?.result || false ? 0n : BigInt(nftData?.[1]?.result || 0n),
  });
  const { write: mint, data: mintData } = useContractWrite(config);
  const { isLoading: isMinting, data: mintReceipt } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  register("image", {
    required: true,
    validate: {
      lessThan15MB: (fileList) => {
        if (!fileList || fileList.length !== 1) return false;
        return (
          (fileList[0]?.size || 1000000000) / 1024 / 1024 < 10 ||
          "File size must be less than 15MB"
        );
      },
      imageFormat: (fileList) => {
        if (!fileList || fileList.length !== 1) return false;
        // validate that image format is any image format using regex
        return (
          /^image\/(jpeg|png|gif|bmp|svg\+xml)$/i.test(
            fileList[0]?.type || ""
          ) || "File must be an image"
        );
      },
    },
  });
  return (
    <>
      <LoadingModal
        name="bass-form-modal"
        cid={cidData || "loading"}
        close={() => modalRef.current?.close()}
        ref={modalRef}
        loading={isMinting || metadataStatus === "pending"}
        mintData={mintReceipt}
        mint={mint}
      />
      <OrderNowModal
        name="order-now-modal"
        close={() => modalOrdRef.current?.close()}
        ref={modalOrdRef}
        instrumentData={getValues()}
        // loading={isMinting || metadataStatus === "pending"}
      />
      <form
        className="flex flex-row flex-wrap gap-4 justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control md:max-w-[calc((100%/2))] w-full">
          <label className="whitespace-pre-wrap pb-4">
            <span className="font-bold text-xl">Upload Image</span>
            {"\n"}
            <span className="text-sm dark:text-white/70 text-black/70">
              Image must be less than 15 MB in size
            </span>
          </label>
          <DragDropFileInput
            name="image"
            setValue={setValue}
            value={watch("image")}
          />
        </div>
        <div className="md:max-w-[45%] w-full">
          <label className="whitespace-pre-wrap pb-4">
            <span className="font-bold text-xl">Basic Information</span>
            {"\n"}
            <span className="text-sm dark:text-white/70 text-black/70">
              Enter the basic information about your instrument
            </span>
          </label>
          <Input title="Instrument" type="text" {...register("instrument")} />
          <Input title="Model" type="text" {...register("model")} />
          <Input title="Year Made" type="number" {...register("year")} />
          <Input title="Brand" type="text" {...register("brand")} />
          <Input title="Serial Number" type="text" {...register("serial")} />
          <div className="pt-4">
            <div className="text-base">Handedness</div>
            <div className="flex flex-row items-center gap-x-4">
              <div className="form-control max-w-[200px]">
                <label className="label cursor-pointer">
                  <span className="label-text">Left-handed</span>
                  <input
                    type="radio"
                    {...register("handedness")}
                    className="radio checked:bg-primary-text ml-2"
                    name="handedness-1"
                    value="left"
                  />
                </label>
              </div>
              <div className="form-control max-w-[200px]">
                <label className="label">
                  <span className="label-text">Right-handed</span>
                  <input
                    type="radio"
                    {...register("handedness")}
                    className="radio checked:bg-primary-text ml-2"
                    name="handedness-1"
                    value="right"
                    defaultChecked
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="md:max-w-[45%] w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
          <label className="whitespace-pre-wrap pb-4">
            <span className="font-bold text-xl">Body Details</span>
            {"\n"}
            <span className="text-sm dark:text-white/70 text-black/70">
              Details of the finish of your instrument
            </span>
          </label>

          <Input
            title="Body Material"
            type="text"
            {...register("bodyMaterial")}
          />
          <Input title="Finish" type="text" {...register("finish")} />
          <Input
            title="Finish Material"
            type="text"
            {...register("finishMaterial")}
          />
          <Input title="Tuners" type="text" {...register("tuners")} />
          <Input title="Weight" type="text" {...register("weight")} />
          <Input title="Electronics" type="text" {...register("electronics")} />
          <Input
            title="Potentiometer Codes"
            type="text"
            {...register("potCodes")}
          />
          <Input
            title="Pickup Impedance"
            type="text"
            {...register("pickupImpedance")}
          />
        </div>
        <div className="md:max-w-[45%] w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
          <label className="whitespace-pre-wrap pb-4">
            <span className="font-bold text-xl">Neck/Bridge/Tuner Details</span>
            {"\n"}
            <span className="text-sm dark:text-white/70 text-black/70">
              Details of the neck, bridge and tuners of your instrument
            </span>
          </label>
          <Input
            title="Neck/Fingerboard"
            type="text"
            {...register("neckFingerboard")}
          />
          <Input
            title="Neck Profile"
            type="text"
            {...register("neckProfile")}
          />
          <Input
            title="Neck Thickness"
            type="text"
            {...register("neckThickness")}
          />
          <Input
            title="Scale Length"
            type="text"
            {...register("scaleLength")}
          />
          <Input title="Nut Width" type="text" {...register("nutWidth")} />
          <Input title="Radius" type="text" {...register("radius")} />
        </div>

        <div className="w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
          <label className="whitespace-pre-wrap pb-4">
            <span className="font-bold text-xl">Other</span>
            {"\n"}
            <span className="text-sm dark:text-white/70 text-black/70">
              Other important details
            </span>
          </label>
          <Input title="Case" type="text" {...register("case")} />
          <Input
            title="Modifications/Repairs"
            type="text"
            {...register("mods")}
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-4 px-4 w-full">
          <button
            className="bg-primary-text rounded-full flex items-center justify-center w-full max-w-[250px] py-4 transition-all duration-300 hover:bg-gray-700/20 hover:dark:bg-gray-700 hover:text-primary-text hover:dark:text-white text-white font-semibold"
            type="button"
            onClick={(e) => {
              // const values = getValues()
              // console.log('values: ', values)
              modalOrdRef.current?.showModal();

              // reset();
            }}
          >
            Order Now
          </button>
          <button
            className={classNames(
              "disabled:hover:dark:bg-transparent disabled:bg-gray-100 disabled:dark:bg-transparent disabled:dark:border-disabled-text disabled:text-disabled-text/70 disabled:dark:text-disabled-text",
              "hover:dark:bg-gray-700 bg-transparent dark:border-white ",
              "hover:text-white text-primary-text dark:text-white",
              "w-full max-w-[250px] text-center rounded-full border-2  font-semibold py-4  shadow-sm transition-colors duration-300"
            )}
            type="submit"
            disabled={!address}
            onClick={(e) => {
              modalRef.current?.showModal();
            }}
          >
            Create Metadata
          </button>
        </div>
      </form>
    </>
  );
}
