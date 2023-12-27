"use client";

import { trpc } from "@/app/_trpc/client";
import classNames from "classnames";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function SubscribeInput() {
  const [email, setEmail] = useState("");

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isValidEmail = emailRegex.test(email);

  const { mutate: subscribe, status } = trpc.subscribe.useMutation();
  const isSuccess = status === "success";
  const isLoading = status === "pending";
  return (
    <div className="form-control md:h-56 md:w-[30vw] lg:w-auto">
      <label className="whitespace-pre-wrap pb-2 text-center md:text-left">
        <span className="font-bold text-xl">Subscribe</span>
        {"\n"}
        <span className="text-sm dark:text-white/70 text-black/70">
          Subscribe to our newsletter to get the latest news
        </span>
      </label>
      <div className="join">
        <input
          value={email}
          className="join-item input input-bordered rounded-full bg-transparent border-black dark:border-white/50 md:max-w-[150px] lg:max-w-max"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
        <button
          className={classNames(
            "btn bg-primary-text hover:bg-primary-text/70 join-item rounded-r-full text-white",
            "disabled:cursor-not-allowed disabled:bg-primary-text/50 disabled:text-white/70",
            isSuccess ? "disabled:bg-green-500 disabled:text-white" : ""
          )}
          disabled={!isValidEmail || isLoading || isSuccess}
          onClick={() => subscribe({ email })}
        >
          {isSuccess ? (
            <FaCheck />
          ) : isLoading ? (
            <span className="loading loading-spinner text-primary-text" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
      <label className="label">
        <span className="label-text-alt text-red-500">
          {!isValidEmail && email.length > 0
            ? "Enter a valid email address"
            : ""}
        </span>
      </label>
    </div>
  );
}
