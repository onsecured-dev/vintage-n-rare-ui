"use client";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <button
      className="btn btn-circle btn-primary btn-outline bg-white dark:bg-action-bg border-primary-border dark:border-primary-border-dark border-2"
      onClick={() =>
        currentTheme == "dark" ? setTheme("light") : setTheme("dark")
      }
    >
      {currentTheme == "dark" ? (
        <FaRegMoon size={"1.25em"} />
      ) : (
        <MdOutlineWbSunny size={"1.25em"} />
      )}
    </button>
  );
}
