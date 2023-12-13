"use client";

import { HTMLInputTypeAttribute } from "react";

export default function Input(props: {
  title: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  ref: React.Ref<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  name: string;
}) {
  const { title, type, placeholder, ref, onChange, onBlur, name } = props;
  return (
    <div className="form-control">
      <label className="label">
        <span>{title}</span>
      </label>
      <input
        type={type}
        className="input input-bordered rounded-full bg-transparent"
        placeholder={placeholder}
        onFocus={(e) => e.currentTarget.select()}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      />
    </div>
  );
}
