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
      <Input title="Year Made" type="number" placeholder="1999, 1980, ..." />
      <Input
        title="Brand"
        type="text"
        placeholder="Fender, Gibson, Orange..."
      />
      <Input
        title="Finish"
        type="text"
        placeholder="Maple, Rosewood, Ebony..."
      />
      <Input title="Serial Number" type="text" placeholder="1234567890" />
      <Input title="Body Material" type="text" placeholder="Rosewood," />
      <Input title="Finish Material" type="text" placeholder="Sunburnt" />
      <Input
        title="Neck/Fingerboard"
        type="text"
        placeholder="Decals or details"
      />
      <Input title="Neck Profile" type="text" placeholder="" />
      <Input title="Neck Depth" type="text" placeholder="" />
      <Input title="Fingerboard Radius" type="text" placeholder="" />
      <Input title="Brace Pattern" type="text" placeholder="" />
      <Input title="Tuners" type="text" placeholder="" />
      <Input title="Bridge" type="text" placeholder="" />
      <Input title="Electronics" type="text" placeholder="" />
      <Input title="Scale Length" type="text" placeholder="" />
      <Input title="Nut Width" type="text" placeholder="" />
      <Input title="String Spacing at Saddle" type="text" placeholder="" />
      <Input title="Case" type="text" placeholder="" />
      <Input title="Modifications/Repairs" type="text" placeholder="" />
      <div>
        <div className="text-lg font-bold">Handedness</div>
        <div className="flex flex-row items-center gap-x-4">
          <div className="form-control max-w-[200px]">
            <label className="label cursor-pointer">
              <span className="label-text">Left-handed</span>
              <input
                type="radio"
                className="radio checked:bg-primary-text ml-2"
                name="handedness-1"
              />
            </label>
          </div>
          <div className="form-control max-w-[200px]">
            <label className="label">
              <span className="label-text">Right-handed</span>
              <input
                type="radio"
                className="radio checked:bg-primary-text ml-2"
                name="handedness-1"
                defaultChecked
              />
            </label>
          </div>
        </div>
      </div>
      <div className="form-control max-w-fit">
        <label className="label">
          <span className="label-text text-lg text-black dark:text-white">
            Contains Brazilian Rosewood
          </span>
          <input
            type="checkbox"
            className="checkbox ml-4 border-black dark:border-white/70 "
          />
        </label>
      </div>
      <div className="flex flex-row items-center gap-4 px-4">
        <button className="bg-primary-text rounded-full flex items-center justify-center w-full max-w-[250px] py-4 transition-all duration-300 hover:bg-gray-700/20 hover:dark:bg-gray-700 hover:text-primary-text hover:dark:text-white text-white font-semibold">
          Mint
        </button>
        <button>Cancel</button>
      </div>
    </div>
  );
}
