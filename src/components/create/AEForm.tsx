"use client";
import { useForm } from "react-hook-form";
import DragDropFileInput from "./DragDropFileInput";
import Input from "./Inputs";
import {
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ampsEffects, electricBass } from "@/data/contracts";
import NFTAbi from "@/data/abi/NFTAbi";
import { zeroAddress } from "viem";
import { useRef } from "react";
import LoadingModal from "./LoadingModal";
import { OrderNowModal } from "./OrderNowModal";
import classNames from "classnames";

type AmpEffectFormValues = {
  instrument: string;
  image: FileList | null;
  model: string;
  year: number;
  brand: string;
  serial: string;
  mods: string;
  preamp: string;
  power: string;
  rectifier: string;
  circuit: string;
  transformer: string;
  speaker: string;
  speakerCodes: string;
  pt: string;
  ot: string;
  choke: string;
  reverbOther: string;
};

export default function AmpsEffectForm() {
  const modalOrdRef = useRef<HTMLDialogElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const { register, handleSubmit, setValue, reset, watch, getValues } =
    useForm<AmpEffectFormValues>({
      defaultValues: {
        instrument: "",
        image: null,
        model: "",
        year: new Date().getFullYear(),
        brand: "",
        serial: "",
        mods: "",
        preamp: "",
        power: "",
        rectifier: "",
        circuit: "",
        transformer: "",
        speaker: "",
        speakerCodes: "",
        pt: "",
        ot: "",
        choke: "",
        reverbOther: "",
      },
    });
  const onSubmit = (data: any) => {
    console.log({ submitData: data });
  };

  const { data: bassMetadata } = {
    data:
      // "loading"
      "bafkreih2byiyq2tibwxsxdiiw5edau4w2gfpy2jhcpj6f2ora5dk4mhygy",
  }; // get actual CID here

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
    address: ampsEffects,
    abi: NFTAbi,
    functionName: "mint",
    args: [bassMetadata],
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
        name="amp-effect-loading-modal"
        cid={bassMetadata}
        ref={modalRef}
        mint={mint}
        loading={isMinting}
        mintData={mintReceipt}
        close={() => modalRef.current?.close()}
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
              Enter the basic information about your amp/effect
            </span>
          </label>
          <Input
            title="Instrument"
            type="text"
            {...register("instrument")}
            placeholder="Guitar, bass, etc.."
          />
          <Input
            title="Brand"
            type="text"
            {...register("brand")}
            placeholder="Fender, Gibson, Orange..."
          />
          <Input
            title="Model"
            type="text"
            {...register("model")}
            placeholder="Jazz Bass, Les Paul, ..."
          />
          <Input
            title="Year Made"
            type="number"
            {...register("year")}
            placeholder="1999, 1980, ..."
          />
          <Input
            title="Serial Number"
            type="text"
            {...register("serial")}
            placeholder="#AZ123"
          />
        </div>
        <div className="md:max-w-[45%] w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
          <label className="whitespace-pre-wrap pb-4">
            <span className="font-bold text-xl">Power Details</span>
            {"\n"}
            <span className="text-sm dark:text-white/70 text-black/70">
              Details of the power of your amp/effect
            </span>
          </label>

          <Input
            title="Preamp"
            type="text"
            {...register("preamp")}
            placeholder="...,"
          />
          <Input
            title="Power"
            type="text"
            {...register("power")}
            placeholder="35W, 70W, ..."
          />
          <Input
            title="Rectifier"
            type="text"
            {...register("rectifier")}
            placeholder="..."
          />
          <Input
            title="Circuit"
            type="text"
            {...register("circuit")}
            placeholder=""
          />
          <Input
            title="Transformers"
            type="text"
            {...register("transformer")}
            placeholder=""
          />
        </div>
        <div className="md:max-w-[45%] w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
          <label className="whitespace-pre-wrap pb-4">
            <span className="font-bold text-xl">Speaker Details</span>
            {"\n"}
            <span className="text-sm dark:text-white/70 text-black/70">
              Details of the speakers of your amp
            </span>
          </label>
          <Input
            title="Speaker"
            type="text"
            {...register("speaker")}
            placeholder=""
          />
          <Input
            title="Speaker Codes"
            type="text"
            {...register("speakerCodes")}
            placeholder=""
          />
        </div>

        <div className="w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
          <label className="whitespace-pre-wrap pb-4">
            <span className="font-bold text-xl">Effects Details</span>
            {"\n"}
            <span className="text-sm dark:text-white/70 text-black/70">
              Effects of your amp or effects
            </span>
          </label>
          <Input title="PT" type="text" {...register("pt")} placeholder="" />
          <Input title="OT" type="text" {...register("ot")} placeholder="" />
          <Input
            title="Choke"
            type="text"
            {...register("choke")}
            placeholder=""
          />
          <Input
            title="Reverb/Other"
            type="text"
            {...register("reverbOther")}
            placeholder=""
          />
        </div>
        <div className="w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
          <label className="whitespace-pre-wrap pb-4">
            <span className="font-bold text-xl">Other</span>
            {"\n"}
            <span className="text-sm dark:text-white/70 text-black/70">
              Other informationa about your amp or effects
            </span>
          </label>
          <Input
            title="Modifications/Repairs"
            type="text"
            {...register("mods")}
            placeholder="Modifications made or repairs done"
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
