"use client";
import { useForm } from "react-hook-form";
import DragDropFileInput from "./DragDropFileInput";
import Input from "./Inputs";

export default function AmpsEffectForm() {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      instrument: "",
      model: "",
      year: new Date().getFullYear(),
      brand: "",
      serial: "",
      mods: "",
      preamp: "",
      power: "",
      rectifier: "",
      circuit: "",
      transformer: "",
      speaker: "",
      speakerCodes: "",
      pt: "",
      ot: "",
      choke: "",
      reverbOther: "",
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
            Enter the basic information about your amp/effect
          </span>
        </label>
        <Input
          title="Instrument"
          type="text"
          {...register("instrument")}
          placeholder="Guitar, bass, etc.."
        />
        <Input
          title="Brand"
          type="text"
          {...register("brand")}
          placeholder="Fender, Gibson, Orange..."
        />
        <Input
          title="Model"
          type="text"
          {...register("model")}
          placeholder="Jazz Bass, Les Paul, ..."
        />
        <Input
          title="Year Made"
          type="number"
          {...register("year")}
          placeholder="1999, 1980, ..."
        />
        <Input
          title="Serial Number"
          type="text"
          {...register("serial")}
          placeholder="#AZ123"
        />
      </div>
      <div className="md:max-w-[45%] w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
        <label className="whitespace-pre-wrap pb-4">
          <span className="font-bold text-xl">Power Details</span>
          {"\n"}
          <span className="text-sm dark:text-white/70 text-black/70">
            Details of the power of your amp/effect
          </span>
        </label>

        <Input
          title="Preamp"
          type="text"
          {...register("preamp")}
          placeholder="...,"
        />
        <Input
          title="Power"
          type="text"
          {...register("power")}
          placeholder="35W, 70W, ..."
        />
        <Input
          title="Rectifier"
          type="text"
          {...register("rectifier")}
          placeholder="..."
        />
        <Input
          title="Circuit"
          type="text"
          {...register("circuit")}
          placeholder=""
        />
        <Input
          title="Transformers"
          type="text"
          {...register("transformer")}
          placeholder=""
        />
      </div>
      <div className="md:max-w-[45%] w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
        <label className="whitespace-pre-wrap pb-4">
          <span className="font-bold text-xl">Speaker Details</span>
          {"\n"}
          <span className="text-sm dark:text-white/70 text-black/70">
            Details of the speakers of your amp
          </span>
        </label>
        <Input
          title="Speaker"
          type="text"
          {...register("speaker")}
          placeholder=""
        />
        <Input
          title="Speaker Codes"
          type="text"
          {...register("speakerCodes")}
          placeholder=""
        />
      </div>

      <div className="w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
        <label className="whitespace-pre-wrap pb-4">
          <span className="font-bold text-xl">Effects Details</span>
          {"\n"}
          <span className="text-sm dark:text-white/70 text-black/70">
            Effects of your amp or effects
          </span>
        </label>
        <Input title="PT" type="text" {...register("pt")} placeholder="" />
        <Input title="OT" type="text" {...register("ot")} placeholder="" />
        <Input
          title="Choke"
          type="text"
          {...register("choke")}
          placeholder=""
        />
        <Input
          title="Reverb/Other"
          type="text"
          {...register("reverbOther")}
          placeholder=""
        />
      </div>
      <div className="w-full border-t-[1px] pt-4 dark:border-white/70 border-slate-500">
        <label className="whitespace-pre-wrap pb-4">
          <span className="font-bold text-xl">Other</span>
          {"\n"}
          <span className="text-sm dark:text-white/70 text-black/70">
            Other informationa about your amp or effects
          </span>
        </label>
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
