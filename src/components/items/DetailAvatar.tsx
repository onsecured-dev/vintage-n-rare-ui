import shortAddress from "@/utils/w3String";
import classNames from "classnames";

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
      <div className="text-white text-sm font-semibold">
        {shortAddress(props.address)}
      </div>
    </div>
  );
}
