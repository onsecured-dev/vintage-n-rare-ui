"use client";
import DragDropFileInput from "./DragDropFileInput";
import Input from "./Inputs";

export default function BassForm() {
  return (
    <div className="flex flex-col gap-4">
      <div className="form-control">
        <label className="whitespace-pre-wrap pb-4">
          <span className="font-bold text-xl">Upload Image</span>
          {"\n"}
          <span className="text-sm dark:text-white/70 text-black/70">
            Image must be less than 15 MB in size
          </span>
        </label>
        <DragDropFileInput />
      </div>
      <Input
        title="Model"
        type="text"
        placeholder="Stratocaster, LesPaul, etc.."
      />
      <Input title="Year" type="number" placeholder="1999, 1980, ..." />
      <Input
        title="Brand"
        type="text"
        placeholder="Fender, Gibson, Orange..."
      />
      <div className="flex flex-row items-center gap-4 px-4">
        <button className="bg-primary-text rounded-full flex items-center justify-center w-full max-w-[250px] py-4 transition-all duration-300 hover:bg-gray-700/20 hover:dark:bg-gray-700 hover:text-primary-text hover:dark:text-white text-white font-semibold">
          Mint
        </button>
        <button>Cancel</button>
      </div>
    </div>
  );
}
