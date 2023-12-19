"use client";
import { useForm } from "react-hook-form";
import DragDropFileInput from "./DragDropFileInput";
import Input from "./Inputs";
import { useRef } from "react";
import {
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { electricGuitars } from "@/data/contracts";
import NFTAbi from "@/data/abi/NFTAbi";
import { zeroAddress } from "viem";
import LoadingModal from "./LoadingModal";
import classNames from "classnames";
import { OrderNowModal } from "./OrderNowModal";

type ElectricGuitarFormProps = {
  instrument: string;
  image: FileList | null;
  brand: string;
  model: string;
  finish: string;
  handedness: string;
  year: number;
  bodyMaterial: string;
  finishMaterial: string;
  neckFingerboard: string;
  radius: string;
  weight: string;
  tuners: string;
  scaleLength: string;
  nutWidth: string;
  neckProfile: string;
  serial: string;
  neckThickness: string;
  electronics: string;
  potCodes: string;
  pickupImpedance: string;
  bzRosewood: boolean;
  case: string;
  mods: string;
};

export default function ElectricGuitarForm() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalOrdRef = useRef<HTMLDialogElement>(null);

  const { register, handleSubmit, setValue, reset, watch, getValues } =
    useForm<ElectricGuitarFormProps>({
      defaultValues: {
        instrument: "",
        image: null,
        brand: "",
        model: "",
        finish: "",
        handedness: "right",
        year: new Date().getFullYear(),
        bodyMaterial: "",
        finishMaterial: "",
        neckFingerboard: "",
        radius: "",
        weight: "",
        tuners: "",
        scaleLength: "",
        nutWidth: "",
        neckProfile: "",
        serial: "",
        neckThickness: "",
        electronics: "",
        potCodes: "",
        pickupImpedance: "",
        bzRosewood: false,
        case: "",
        mods: "",
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
        address: electricGuitars,
        abi: NFTAbi,
        functionName: "creators",
        args: [address || zeroAddress],
      },
      {
        address: electricGuitars,
        abi: NFTAbi,
        functionName: "publicFee",
      },
    ],
  });

  const { config } = usePrepareContractWrite({
    address: electricGuitars,
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
        name="bass-form-modal"
        cid={bassMetadata}
        close={() => modalRef.current?.close()}
        ref={modalRef}
        loading={isMinting}
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
          <Input
            title="Model"
            type="text"
            {...register("model")}
            placeholder="Stratocaster, LesPaul, etc.."
          />
          <Input
            title="Year Made"
            type="number"
            {...register("year")}
            placeholder="1999, 1980, ..."
          />
          <Input
            title="Brand"
            type="text"
            {...register("brand")}
            placeholder="Fender, Gibson, Orange..."
          />
          <Input
            title="Serial Number"
            type="text"
            {...register("serial")}
            placeholder="#AZ123"
          />
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
            placeholder="Rosewood,"
          />
          <Input
            title="Finish"
            type="text"
            {...register("finish")}
            placeholder="Maple, Rosewood, Ebony..."
          />
          <Input
            title="Finish Material"
            type="text"
            {...register("finishMaterial")}
            placeholder="Sunburnt"
          />
          <Input
            title="Tuners"
            type="text"
            {...register("tuners")}
            placeholder=""
          />
          <Input
            title="Electronics"
            type="text"
            {...register("electronics")}
            placeholder=""
          />
          <Input
            title="Weight"
            type="text"
            {...register("weight")}
            placeholder=""
          />
          <Input
            title="Potentiometer Codes"
            type="text"
            {...register("potCodes")}
            placeholder=""
          />
          <Input
            title="Pickup Impedance"
            type="text"
            {...register("pickupImpedance")}
            placeholder=""
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
            placeholder="Decals or details"
          />
          <Input
            title="Neck Profile"
            type="text"
            {...register("neckProfile")}
            placeholder=""
          />
          <Input
            title="Neck Thickness"
            type="text"
            {...register("neckThickness")}
            placeholder=""
          />
          <Input
            title="Radius"
            type="text"
            {...register("radius")}
            placeholder=""
          />

          <Input
            title="Scale Length"
            type="text"
            {...register("scaleLength")}
            placeholder=""
          />
          <Input
            title="Nut Width"
            type="text"
            {...register("nutWidth")}
            placeholder=""
          />
        </div>

        <div className="w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
          <label className="whitespace-pre-wrap pb-4">
            <span className="font-bold text-xl">Other</span>
            {"\n"}
            <span className="text-sm dark:text-white/70 text-black/70">
              Other important details
            </span>
          </label>
          <div className="form-control max-w-fit">
            <label className="label">
              <span className="label-text text-base text-black dark:text-white">
                Contains Brazilian Rosewood
              </span>
              <input
                type="checkbox"
                {...register("bzRosewood")}
                className="checkbox ml-4 border-black dark:border-white/70 "
              />
            </label>
          </div>
          <Input
            title="Case"
            type="text"
            {...register("case")}
            placeholder=""
          />
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
