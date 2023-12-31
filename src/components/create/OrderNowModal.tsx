"use client";

import { ForwardedRef, forwardRef, useState } from "react";

import Link from "next/link";

export const OrderNowModal = forwardRef(function ForwardModal(
  props: {
    name: string;
    close: () => void;
    status: string;
    instrumentData: object;
  },
  ref: ForwardedRef<HTMLDialogElement>
) {
  const { name, status } = props;

  return (
    <dialog id={name} ref={ref} className="modal">
      <div className="modal-box dark:bg-action-bg bg-white ">
        {/* <p className="text-xs text-right justify-end">ESC to close</p> */}
        <div className="flex flex-col items-center justify-center py-12">
          <p className="my-4 text-center">
            {status == "pending" ? (
              <>
                <div className="loading loading-spinner w-[70px] text-primary-text" />
                <br />
                Submitting Info to Vintage & Rare
              </>
            ) : status === "success" ? (
              "Email sent!"
            ) : (
              ""
            )}
          </p>
          {status === "success" ? (
            <>
              <p className="text-center text-sm">
                Team will contact you soon with details to create your
                Certificate
              </p>
              <p className="text-center text-sm">
                In the meantime, check out the other items on the&nbsp;
                <Link href="/explore" className="btn-link text-primary-text">
                  explore page
                </Link>
              </p>
            </>
          ) : null}
        </div>
      </div>
    </dialog>
  );
});
