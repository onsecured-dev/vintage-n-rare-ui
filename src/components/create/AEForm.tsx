"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import DragDropFileInput from "./DragDropFileInput";
import Input from "./Inputs";
import {
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ampsEffects } from "@/data/contracts";
import NFTAbi from "@/data/abi/NFTAbi";
import { BaseError, zeroAddress } from "viem";
import { useRef } from "react";
import LoadingModal from "./LoadingModal";
import { OrderNowModal } from "./OrderNowModal";
import classNames from "classnames";
import { trpc } from "@/app/_trpc/client";
import { AmpEffectClientFormValues } from "@/utils/formTypes";

export default function AmpsEffectForm() {
  const modalOrdRef = useRef<HTMLDialogElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const { data: nftSupply } = useContractRead({
    address: ampsEffects,
    abi: NFTAbi,
    functionName: "totalSupply",
  });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<AmpEffectClientFormValues>({
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
      finish: "",
      wattage: "",
      //USER
      name: "",
      email: "",
      phone: "",
    },
  });
  const {
    mutate: createAmpFx,
    data: cidData,
    status: metadataStatus,
  } = trpc.createAmpFx.useMutation();

  const { mutate: sendMailInfo, status: mailInfoStatus } =
    trpc.sendMail.useMutation();

  const { mutate: pushToDB, isError: pushError } =
    trpc.pushNFTtoDb.useMutation();

  const onSubmit: SubmitHandler<AmpEffectClientFormValues> = (data) => {
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
      createAmpFx({
        image: base64,
        object: {
          ...data,
          year: Number(data.year),
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
        address: ampsEffects,
        abi: NFTAbi,
        functionName: "creators",
        args: [address || zeroAddress],
      },
      {
        address: ampsEffects,
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
    address: ampsEffects,
    abi: NFTAbi,
    functionName: "mint",
    args: [cidData],
    value:
      nftData?.[0]?.result || false ? 0n : BigInt(nftData?.[1]?.result || 0n),
  });
  const { write: mint, data: mintData } = useContractWrite(config);
  const { isLoading: isMinting, data: mintReceipt } = useWaitForTransaction({
    hash: mintData?.hash,
    onSuccess(data) {
      console.log("success");
      const allValues = { ...getValues(), image: null };

      pushToDB({
        nftmetadataCID: cidData,
        nftid: BigInt(data.logs[0].topics[3] || "0x0").toString(),
        nftType: "ampfx",
        nftData: JSON.stringify(allValues),
      });
    },
  });

  register("image", {
    required: true,
    validate: {
      lessThan4MB: (fileList) => {
        if (!fileList || fileList.length !== 1) return false;
        return (
          (fileList[0]?.size || 4000000) / 1024 / 1024 < 4.5 ||
          "File size must be less than 4.5MB"
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
        cid={cidData || "loading"}
        ref={modalRef}
        mint={mint}
        loading={isMinting || metadataStatus === "pending"}
        mintData={mintReceipt}
        close={() => modalRef.current?.close()}
        errorData={mintError as BaseError | undefined}
        refetchMint={tryAgainMint}
        hasError={pushError}
        retryDBPush={() => {
          if (!mintReceipt) return;
          const allValues = { ...getValues(), image: null };

          pushToDB({
            nftmetadataCID: cidData,
            nftid: BigInt(mintReceipt.logs[0].topics[3] || "0x0").toString(),
            nftType: "ampfx",
            nftData: JSON.stringify(allValues),
          });
        }}
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
              Image must be less than 4 MB in size
            </span>
          </label>
          <DragDropFileInput
            name="image"
            setValue={setValue}
            value={watch("image")}
            error={errors.image?.message}
          />
          <div className="dark:text-white/90 text-black/70 flex justify-center flex-row items-center gap-4 py-4">
            <div>Next NFT ID:</div>
            <div className="font-bold">
              #AM {((nftSupply || 0n) + 1n)?.toLocaleString()}
            </div>
          </div>
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
          <Input title="Instrument" type="text" {...register("instrument")} />
          <Input title="Year Made" type="number" {...register("year")} />
          <Input title="Brand" type="text" {...register("brand")} />
          <Input title="Model" type="text" {...register("model")} />
          <div>
            <label className="label">
              <span>Name</span>
            </label>
            <div className=" h-12 flex flex-col justify-center px-4">
              <div className="text-disabled-text">
                {watch("year")} {watch("brand")} {watch("model")}
              </div>
            </div>
          </div>
          <Input title="Serial Number" type="text" {...register("serial")} />
        </div>
        <div className="md:max-w-[45%] w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
          <Input title="Preamp" type="text" {...register("preamp")} />
          <Input title="Power" type="text" {...register("power")} />
          <Input title="Rectifier" type="text" {...register("rectifier")} />
          <Input title="Circuit" type="text" {...register("circuit")} />
          <Input
            title="Transformers"
            type="text"
            {...register("transformer")}
          />
        </div>
        <div className="md:max-w-[45%] w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
          <Input title="Speaker" type="text" {...register("speaker")} />
          <Input
            title="Speaker Codes"
            type="text"
            {...register("speakerCodes")}
          />
          <Input title="Choke" type="text" {...register("choke")} />
          <Input
            title="Reverb/Other"
            type="text"
            {...register("reverbOther")}
          />
          <Input
            title="Modifications/Repairs"
            type="text"
            {...register("mods")}
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-4 px-4 pt-6 w-full">
          <button
            className={classNames(
              "bg-primary-text rounded-full flex items-center justify-center w-full max-w-[250px] py-4 transition-all duration-300 hover:bg-gray-700/20 hover:dark:bg-gray-700 hover:text-primary-text hover:dark:text-white text-white font-semibold",
              "disabled:hover:bg-gray-700/20 disabled:bg-gray-700/20 disabled:hover:dark:bg-gray-700/20"
            )}
            type="button"
            disabled={!isValid || !watch("email") || !watch("name")}
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
                  instrument: "amps",
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
        <div className="w-full text-center whitespace-pre-wrap">
          {watch("email").match(/.+@.+\..+/) ? null : (
            <div className="text-red-500">* Email is required to order</div>
          )}
          {watch("name").length > 3 ? null : (
            <div className="text-red-500">* Name is required to order</div>
          )}
        </div>
      </form>
    </>
  );
}
