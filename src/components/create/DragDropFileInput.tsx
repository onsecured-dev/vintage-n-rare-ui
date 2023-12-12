"use client";

import { useRef, useState } from "react";
import { RiUploadCloud2Line } from "react-icons/ri";

export default function DragDropFileInput() {
  const [isDragged, setIsDragged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={
        "dark:bg-action-bg bg-slate-200 w-full rounded-xl flex flex-col items-center py-6 " +
        (isDragged ? "text-primary-text/60" : "")
      }
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
      }}
    >
      <RiUploadCloud2Line className=" text-[128px] opacity-60" />
      <div className="opacity-60 font-bold pt-6">Drag your image to upload</div>
      <div className="opacity-60 font-light">PNG, GIF, WebP. Max 15MB</div>
      <input
        className="hidden"
        type="file"
        accept="image/*"
        ref={fileInputRef}
      />
    </div>
  );
}
