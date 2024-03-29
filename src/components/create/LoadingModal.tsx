"use client";

import classNames from "classnames";
import { ForwardedRef, forwardRef } from "react";
import { BaseError, TransactionReceipt } from "viem";
import { TbWorldCheck } from "react-icons/tb";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";

const LoadingModal = forwardRef(function ForwardModal(
  props: {
    name: string;
    cid: string;
    close: () => void;
    mint?: () => void;
    loading: boolean;
    mintData?: TransactionReceipt;
    errorData?: BaseError;
    refetchMint?: () => void;
    hasError?: boolean;
    retryDBPush?: () => void;
  },
  ref: ForwardedRef<HTMLDialogElement>
) {
  const {
    name,
    cid,
    close,
    mint,
    loading,
    mintData,
    errorData,
    refetchMint,
    hasError,
    retryDBPush,
  } = props;
  const nftId = BigInt(mintData?.logs[0]?.topics[3] || "0x0").toString();
  const path = usePathname();
  const itemCreated = path.replace("/create/", "");
  const itemType = itemCreated === "amp" ? "amps-effects" : itemCreated;
  return (
    <dialog id={name} ref={ref} className="modal">
      <div className="modal-box dark:bg-action-bg bg-white">
        <div className="flex flex-col items-center py-10">
          {hasError ? (
            <>
              <div className="pt-4">
                Something went wrong... please try again later
              </div>
              <button className="btn" onClick={retryDBPush}>
                try again
              </button>
            </>
          ) : cid === "loading" || loading ? (
            <>
              <div className="loading loading-spinner w-[70px] text-primary-text" />
              <div className="pt-4">
                {cid === "loading"
                  ? "Creating metadata, please wait"
                  : mintData
                  ? "Adding Data to Database"
                  : "Minting NFT, please wait"}
              </div>
            </>
          ) : (
            <div>
              {cid == "loading" ? (
                ""
              ) : nftId == "0" ? (
                <TbWorldCheck className="text-green-500 text-7xl" />
              ) : (
                <BsFillPatchCheckFill className="text-green-500 text-7xl" />
              )}
            </div>
          )}
          {cid !== "loading" ? (
            <>
              <div className="pt-4 whitespace-pre-wrap text-center">
                <span>
                  The metadata created and uploaded to IPFS record:{"\n"}
                  <code className="text-xs break-all">
                    {cid.replace("/metadata.json", "")}
                  </code>
                  .
                </span>
                <br />
                <div className="w-full text-center">
                  <a
                    href={`https://salmon-persistent-parrotfish-346.mypinata.cloud/ipfs/${cid}/`}
                    className="btn btn-link text-primary-text text-center"
                    target="_blank"
                    rel="nonreferrer noopener"
                  >
                    IPFS Preview Link
                  </a>
                </div>
              </div>
              {!mintData ? (
                <>
                  {errorData ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-center w-full text-red-500 text-sm pb-2">
                        {errorData.shortMessage}
                      </div>
                      <button
                        className="btn bg-indigo-500 hover:bg-indigo-700 text-white"
                        onClick={refetchMint}
                      >
                        Recheck
                      </button>
                    </div>
                  ) : (
                    <button
                      className={classNames(
                        "bg-primary-text hover:border-primary-text hover:bg-transparent border-primary-text",
                        "text-white hover:text-primary-text dark:hover:text-white",
                        "w-[150px] text-center rounded-xl border-2 font-semibold px-8 py-2 my-2 mx-1 shadow-sm transition-colors duration-300",
                        loading ? "hidden" : ""
                      )}
                      onClick={() => mint?.()}
                    >
                      Mint
                    </button>
                  )}
                </>
              ) : loading ? null : (
                <div className="pt-4 whitespace-pre-wrap">
                  <span>
                    NFT Successfully Minted ID:&nbsp;
                    <code className="text-lg text-primary-text dark:text-white">
                      {nftId}
                    </code>
                    .
                  </span>
                  <br />
                  <div className="w-full text-center">
                    <Link
                      href={`/${itemType}/${nftId}`}
                      className="btn btn-link text-center"
                      target="_blank"
                    >
                      View Item
                    </Link>
                  </div>
                  <br />
                  <div className="w-full text-center">
                    <a
                      href={`https://bscscan.com/tx/${mintData?.transactionHash}/`}
                      className="btn btn-link text-center"
                    >
                      Check Transaction
                    </a>
                  </div>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </dialog>
  );
});

export default LoadingModal;
