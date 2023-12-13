"use client";
import { useForm } from "react-hook-form";
import DragDropFileInput from "./DragDropFileInput";
import Input from "./Inputs";

export default function BassForm() {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      model: "",
      year: new Date().getFullYear(),
      brand: "",
      serial: "",
      handedness: "right",
      bodyMaterial: "",
      finish: "",
      finishMaterial: "",
      radius: "",
      weight: "",
      tuners: "",
      scaleLength: "",
      nutWidth: "",
      neckProfile: "",
      neckThickness: "",
      potCodes: "",
      electronics: "",
      pickupImpedance: "",
      neckFingerboard: "",
      case: "",
      mods: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log({ submitData: data });
  };
  return (
    <form
      className="flex flex-row flex-wrap gap-4 justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-control md:max-w-[calc((100%/2))] w-full">
        <label className="whitespace-pre-wrap pb-4">
          <span className="font-bold text-xl">Upload Image</span>
          {"\n"}
          <span className="text-sm dark:text-white/70 text-black/70">
            Image must be less than 15 MB in size
          </span>
        </label>
        <DragDropFileInput name="image" setValue={setValue} />
      </div>
      <div className="md:max-w-[45%] w-full">
        <label className="whitespace-pre-wrap pb-4">
          <span className="font-bold text-xl">Basic Information</span>
          {"\n"}
          <span className="text-sm dark:text-white/70 text-black/70">
            Enter the basic information about your bass
          </span>
        </label>
        <Input
          title="Model"
          type="text"
          {...register("model")}
          placeholder="Stratocaster, LesPaul, etc.."
        />
        <Input
          title="Year Made"
          type="number"
          {...register("year")}
          placeholder="1999, 1980, ..."
        />
        <Input
          title="Brand"
          type="text"
          {...register("brand")}
          placeholder="Fender, Gibson, Orange..."
        />
        <Input
          title="Serial Number"
          type="text"
          {...register("serial")}
          placeholder="#AZ123"
        />
        <div className="pt-4">
          <div className="text-base">Handedness</div>
          <div className="flex flex-row items-center gap-x-4">
            <div className="form-control max-w-[200px]">
              <label className="label cursor-pointer">
                <span className="label-text">Left-handed</span>
                <input
                  type="radio"
                  {...register("handedness")}
                  className="radio checked:bg-primary-text ml-2"
                  name="handedness-1"
                  value="left"
                />
              </label>
            </div>
            <div className="form-control max-w-[200px]">
              <label className="label">
                <span className="label-text">Right-handed</span>
                <input
                  type="radio"
                  {...register("handedness")}
                  className="radio checked:bg-primary-text ml-2"
                  name="handedness-1"
                  value="right"
                  defaultChecked
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="md:max-w-[45%] w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
        <label className="whitespace-pre-wrap pb-4">
          <span className="font-bold text-xl">Body Details</span>
          {"\n"}
          <span className="text-sm dark:text-white/70 text-black/70">
            Details of the finish of your bass
          </span>
        </label>

        <Input
          title="Body Material"
          type="text"
          {...register("bodyMaterial")}
          placeholder="Rosewood,"
        />
        <Input
          title="Finish"
          type="text"
          {...register("finish")}
          placeholder="Maple, Rosewood, Ebony..."
        />
        <Input
          title="Finish Material"
          type="text"
          {...register("finishMaterial")}
          placeholder="Sunburnt"
        />
        <Input
          title="Tuners"
          type="text"
          {...register("tuners")}
          placeholder=""
        />
        <Input
          title="Weight"
          type="text"
          {...register("weight")}
          placeholder=""
        />
        <Input
          title="Electronics"
          type="text"
          {...register("electronics")}
          placeholder=""
        />
        <Input
          title="Radius"
          type="text"
          {...register("radius")}
          placeholder=""
        />
      </div>
      <div className="md:max-w-[45%] w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
        <label className="whitespace-pre-wrap pb-4">
          <span className="font-bold text-xl">Neck/Bridge/Tuner Details</span>
          {"\n"}
          <span className="text-sm dark:text-white/70 text-black/70">
            Details of the neck, bridge and tuners of your bass
          </span>
        </label>
        <Input
          title="Neck/Fingerboard"
          type="text"
          {...register("neckFingerboard")}
          placeholder="Decals or details"
        />
        <Input
          title="Neck Profile"
          type="text"
          {...register("neckProfile")}
          placeholder=""
        />
        <Input
          title="Scale Length"
          type="text"
          {...register("scaleLength")}
          placeholder=""
        />
        <Input
          title="Nut Width"
          type="text"
          {...register("nutWidth")}
          placeholder=""
        />
      </div>

      <div className="w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
        <label className="whitespace-pre-wrap pb-4">
          <span className="font-bold text-xl">Other</span>
          {"\n"}
          <span className="text-sm dark:text-white/70 text-black/70">
            Other important details
          </span>
        </label>
        <Input title="Case" type="text" {...register("case")} placeholder="" />
        <Input
          title="Modifications/Repairs"
          type="text"
          {...register("mods")}
          placeholder="Modifications made or repairs done"
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-4 px-4 w-full">
        <button
          className="bg-primary-text rounded-full flex items-center justify-center w-full max-w-[250px] py-4 transition-all duration-300 hover:bg-gray-700/20 hover:dark:bg-gray-700 hover:text-primary-text hover:dark:text-white text-white font-semibold"
          type="submit"
        >
          Mint
        </button>
        <button type="reset" onClick={() => reset()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
