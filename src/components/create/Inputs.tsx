"use client";

import {
  ForwardedRef,
  HTMLInputTypeAttribute,
  MutableRefObject,
  forwardRef,
} from "react";

const Input = forwardRef(function MidInput(
  props: {
    title: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    name: string;
  },
  ref: ForwardedRef<HTMLInputElement>
) {
  const { title, type, placeholder, onChange, onBlur, name } = props;
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
});

export default Input;
