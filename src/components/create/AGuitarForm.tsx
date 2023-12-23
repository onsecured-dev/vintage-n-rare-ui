"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import DragDropFileInput from "./DragDropFileInput";
import Input from "./Inputs";
import LoadingModal from "./LoadingModal";
import { useRef } from "react";
import {
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { acousticGuitars } from "@/data/contracts";
import NFTAbi from "@/data/abi/NFTAbi";
import { BaseError, zeroAddress } from "viem";
import { OrderNowModal } from "./OrderNowModal";
import classNames from "classnames";
import { trpc } from "@/app/_trpc/client";
import { AcousticGuitarClientFormValues } from "@/utils/formTypes";

export default function AcousticGuitarForm() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalOrdRef = useRef<HTMLDialogElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<AcousticGuitarClientFormValues>({
    defaultValues: {
      instrument: "",
      model: "",
      image: null,
      year: new Date().getFullYear(),
      brand: "",
      serial: "",
      handedness: "right",
      bodyMaterial: "",
      finish: "",
      finishMaterial: "",
      top: "",
      backSides: "",
      tuners: "",
      bridge: "",
      electronics: "",
      bracePattern: "",
      ssSaddle: "",
      neckFingerboard: "",
      neckProfile: "",
      neckDepth: "",
      fingerboardRadius: "",
      scaleLength: "",
      nutWidth: "",
      case: "",
      mods: "",
      bzRosewood: false,
      //USER
      name: "",
      email: "",
      phone: "",
    },
  });

  const {
    mutate: createAcoustic,
    data: cidData,
    status: metadataStatus,
  } = trpc.createAcoustic.useMutation();
  const { mutate: sendMailInfo, status: mailInfoStatus } =
    trpc.sendMail.useMutation();
  const onSubmit: SubmitHandler<AcousticGuitarClientFormValues> = (data) => {
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
      createAcoustic({
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
        address: acousticGuitars,
        abi: NFTAbi,
        functionName: "creators",
        args: [address || zeroAddress],
      },
      {
        address: acousticGuitars,
        abi: NFTAbi,
        functionName: "publicFee",
      },
    ],
  });

  const {
    config,
    refetch: tryAgainMint,
    error: mintError,
  } = usePrepareContractWrite({
    address: acousticGuitars,
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
        name="acoustic-guitar-form-modal"
        cid={cidData || "loading"}
        close={() => modalRef.current?.close()}
        ref={modalRef}
        loading={isMinting || metadataStatus === "pending"}
        mintData={mintReceipt}
        mint={mint}
        errorData={mintError as BaseError | undefined}
        refetchMint={tryAgainMint}
      />
      <OrderNowModal
        name="order-now-modal"
        close={() => modalOrdRef.current?.close()}
        ref={modalOrdRef}
        instrumentData={getValues()}
        status={mailInfoStatus}
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
          <Input
            title={`Name ${address ? "" : " *"}`}
            type="text"
            {...register("name", { required: !address })}
          />
          <Input
            title={`Email ${address ? "" : " *"}`}
            type="email"
            {...register("email", { required: !address })}
          />
          <Input title="Phone" type="tel" {...register("phone")} />
        </div>
        <div className="md:max-w-[45%] w-full">
          <label className="whitespace-pre-wrap pb-4">
            <span className="font-bold text-xl">Basic Information</span>
          </label>
          <Input title="Year Made" type="number" {...register("year")} />
          <Input title="Brand" type="text" {...register("brand")} />
          <Input title="Model" type="text" {...register("model")} />
          <div>
            <label className="label">
              <span>Instrument</span>
            </label>
            <div className=" h-12 flex flex-col justify-center px-4">
              <div className="text-disabled-text">
                {watch("year")} {watch("brand")} {watch("model")}
              </div>
            </div>
          </div>
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
          <Input title="Bridge" type="text" {...register("bridge")} />
          <Input title="Electronics" type="text" {...register("electronics")} />
          <Input
            title="Brace Pattern"
            type="text"
            {...register("bracePattern")}
          />
          <Input
            title="String Spacing at Saddle"
            type="text"
            {...register("ssSaddle")}
          />
        </div>
        <div className="md:max-w-[45%] w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
          <Input title="Top" type="text" {...register("top")} />
          <Input
            title="Back and Sides"
            type="text"
            {...register("backSides")}
          />
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
          <Input title="Neck Depth" type="text" {...register("neckDepth")} />
          <Input
            title="Fingerboard Radius"
            type="text"
            {...register("fingerboardRadius")}
          />

          <Input
            title="Scale Length"
            type="text"
            {...register("scaleLength")}
          />
          <Input title="Nut Width" type="text" {...register("nutWidth")} />
        </div>

        <div className="w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
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
          <div className="grid grid-cols-7 w-full">
            <div className="md:col-span-3 col-span-7">
              <Input title="Case" type="text" {...register("case")} />
            </div>
            <div className="md:col-span-3 md:col-start-5 col-start-1 col-span-7">
              <Input
                title="Modifications/Repairs"
                type="text"
                {...register("mods")}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-4 px-4 pt-6 w-full">
          <button
            className={classNames(
              "bg-primary-text rounded-full flex items-center justify-center w-full max-w-[250px] py-4 transition-all duration-300 hover:bg-gray-700/20 hover:dark:bg-gray-700 hover:text-primary-text hover:dark:text-white text-white font-semibold",
              "disabled:hover:bg-gray-700/20 disabled:bg-gray-700/20 disabled:hover:dark:bg-gray-700/20"
            )}
            type="button"
            disabled={!isValid}
            onClick={() => {
              modalOrdRef.current?.showModal();
              const image = getValues().image?.[0];
              if (!image) return;
              const reader = new FileReader();
              reader.readAsDataURL(image);
              reader.onload = () => {
                const base64 = reader.result?.toString();
                if (!base64) return;
                sendMailInfo({
                  email: getValues().email,
                  name: getValues().name,
                  phone: getValues().phone,
                  data: getValues(),
                  attachment: base64,
                });
              };
            }}
          >
            Order Now
          </button>
          {!!address && (
            <button
              className={classNames(
                "disabled:hover:dark:bg-transparent disabled:bg-gray-100 disabled:dark:bg-transparent disabled:dark:border-disabled-text disabled:text-disabled-text/70 disabled:dark:text-disabled-text",
                "hover:dark:bg-gray-700 bg-transparent dark:border-white ",
                "hover:text-white text-primary-text dark:text-white",
                "w-full max-w-[250px] text-center rounded-full border-2  font-semibold py-4  shadow-sm transition-colors duration-300"
              )}
              type="submit"
              disabled={!address || !isValid}
              onClick={(e) => {
                modalRef.current?.showModal();
              }}
            >
              Create Metadata
            </button>
          )}
        </div>
      </form>
    </>
  );
}
