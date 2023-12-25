"use client";

import classNames from "classnames";
import { error } from "console";
import { useRef, useState } from "react";
import { RiUploadCloud2Line } from "react-icons/ri";

export default function DragDropFileInput(props: {
  name: string;
  setValue: (
    name: any,
    value: FileList | null,
    options: {
      shouldValidate: boolean;
      shouldDirty: boolean;
      shouldTouch: boolean;
    }
  ) => void;
  value: FileList | null;
  error?: string;
}) {
  const { setValue, name, value, error } = props;
  const [isDragged, setIsDragged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className={classNames(
          "group/fileInput",
          "dark:bg-action-bg bg-slate-200 w-full rounded-xl flex flex-col items-center overflow-hidden max-h-[360px]",
          isDragged ? "text-primary-text/60" : "",
          error ? "border-2 border-red-500" : ""
        )}
        onClick={() => {
          fileInputRef.current?.click();
        }}
        onDragEnter={() => {
          setIsDragged(true);
        }}
        onDragLeave={() => {
          setIsDragged(false);
        }}
        onDragOver={(e) => {
          setIsDragged(true);
          e.preventDefault();
          e.stopPropagation();
          if (e.dataTransfer.files.length == 1)
            setValue(name, e.dataTransfer.files, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
        }}
      >
        {value?.length == 1 && value[0] ? (
          <img
            src={URL.createObjectURL(value[0])}
            className="h-full w-auto object-cover"
            alt="img to upload"
          />
        ) : (
          <div className="py-20 flex flex-col items-center">
            <RiUploadCloud2Line className=" text-[128px] opacity-60 group-hover/fileInput:text-primary-text/70" />
            <div className="opacity-60 font-bold pt-6">
              Drag your image to upload
            </div>
            <div className="opacity-60 font-light">PNG, GIF, WebP. Max 4MB</div>
          </div>
        )}
        <input
          className="hidden"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) =>
            setValue(
              "image",
              e.target.files && e.target.files.length == 1
                ? e.target.files
                : null,
              { shouldValidate: true, shouldDirty: true, shouldTouch: true }
            )
          }
        />
      </div>
      {error ? <div className="text-red-500 text-sm">{error}</div> : null}
    </>
  );
}
