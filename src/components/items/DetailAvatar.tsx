import shortAddress from "@/utils/w3String";
import classNames from "classnames";
import { MdVerified } from "react-icons/md";

export default function UserAvatar(props: {
  address: string;
  variant: "red" | "blue";
}) {
  return (
    <div className="flex flex-row items-center gap-4">
      <div
        className={classNames(
          "w-10 h-10 bg-gradient-to-br rounded-full",
          props.variant === "blue"
            ? "from-green-700 to-blue-700"
            : "from-red-700 to-yellow-400"
        )}
      />
      <div className="dark:text-white text-slate-700 text-sm font-semibold">
        {shortAddress(props.address)}
      </div>
    </div>
  );
}
export function LinkAvatar(props: { name: string; href: string }) {
  return (
    <a href={props.href} target="_blank" rel="noopener nonreferrer">
      <div className="flex flex-row items-center gap-4 group">
        <MdVerified className=" text-[40px] text-green-500 group-hover:text-green-200 transition-colors duration-300" />
        <div className="dark:text-white text-slate-700 text-sm font-semibold underline underline-offset-2 group-hover:text-primary-text">
          {props.name}
        </div>
      </div>
    </a>
  );
}
