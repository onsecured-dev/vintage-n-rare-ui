"use client";

import classNames from "classnames";
import { ForwardedRef, forwardRef } from "react";
import Input from "@/components/create/Inputs";
// import nodemailer from 'nodemailer';
import { useForm } from "react-hook-form";

// export const OrderNowModal = forwardRef() => {
export const OrderNowModal = forwardRef(function ForwardModal(
  props: {
    name: string;
    close: () => void;
    // loading: boolean;
    instrumentData: object;
  },
  ref: ForwardedRef<HTMLDialogElement>
) {
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   host: 'smtp.gmail.com',
  //   port: 587,
  //   auth: {
  //     user: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
  //     pass: 'XXXXXXXXXXXXXXXXXXXXXXXXXX'
  //   }
  // });

  const mailOptions = {
    from: "XXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "XXXXXXXXXXXXXXXXXXXXXXXXXX",
    subject: "Vintage and Rare Instruments",
    text: "That was easy!",
    html: "<h1>Vintage and Rare Instruments</h1>",
    // attachments: []
  };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
  const { name } = props;
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Email to: ", getValues().email);
    console.log("Data: \n", props.instrumentData);
    props.close();
  };

  return (
    <dialog id={name} ref={ref} className="modal">
      <div className="modal-box dark:bg-action-bg bg-white ">
        {/* <p className="text-xs text-right justify-end">ESC to close</p> */}
        <p className="text-xl text-center">Order</p>
        <div className="flex flex-col items-center py-12">
          {/* input for email address */}
          {/* div including a span to show json data that will be sent */}
          <div className="items-center justify-center ">
            <p className="text-ms break-all my-4 ">
              Please enter a valid address to send the order details
            </p>
            {/* <p>{JSON.stringify(props.instrumentData)}</p> */}
          </div>
          <form
            className="flex flex-col items-center flex-wrap gap-4 justify-between"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="max-w-2xl my-4">
              <Input
                title="Email"
                type="email"
                {...register("email", { required: true, minLength: 5 })}
                placeholder="e.g. email@domain.com"
              />
              {errors.yourInput && errors.yourInput.type === "required" && (
                <p>This field is required.</p>
              )}
              {errors.yourInput && errors.yourInput.type === "minLength" && (
                <p>Input must be at least 5 characters long.</p>
              )}
            </div>
            <button
              className={classNames(
                "hover:bg-primary-text bg-transparent dark:border-white hover:dark:border-primary-text",
                "hover:text-white text-primary-text dark:text-white",
                "w-full max-w-[225px] text-center rounded-full border-2  font-semibold px-6 py-2 my-2 mx-1 shadow-sm transition-colors duration-300"
              )}
              type="submit"
              // onClick={(e) => {
              //   console.log('Email to: ', getValues().email)
              //   console.log("Data: \n", props.instrumentData);
              //   props.close();
              // }}
              disabled={Object.keys(errors).length > 0}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
});
