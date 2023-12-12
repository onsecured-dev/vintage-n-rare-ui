"use client";

import { HTMLInputTypeAttribute } from "react";

export default function Input(props: {
  title: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
}) {
  const { title, type, placeholder } = props;
  return (
    <div className="form-control">
      <label className="label">
        <span>{title}</span>
      </label>
      <input
        type={type}
        className="input input-bordered rounded-full"
        placeholder={placeholder}
      />
    </div>
  );
}
