import IconButton from "./icon-button";

import { useTheme } from "../hooks/useTheme";

export default function Header() {
  const { theme, setLightTheme, setDarkTheme } = useTheme();

  return (
    <header className="w-full flex items-center justify-center relative">
      <h1 className="text-4xl font-bold tracking-widest">
        <span>THI</span>
        <span className="text-secondary dark:text-secondaryDark">N</span>
        <span>K.</span>
      </h1>
      <div className="absolute top-0 right-0 h-full p-2 px-2 rounded-full flex gap-4 items-center border border-lightGray dark:border-lightGrayDark">
        <IconButton
          onClick={setDarkTheme}
          className={`p-1 py-[2px] rounded-full ${
            theme === "dark" ? "bg-gray" : ""
          }`}
        >
          <i className="bx bxs-moon"></i>
        </IconButton>
        <IconButton
          onClick={setLightTheme}
          className={`p-1 py-[2px] rounded-full ${
            theme === "light" ? "bg-gray" : ""
          }`}
        >
          <i className="bx bxs-sun"></i>
        </IconButton>
      </div>
    </header>
  );
}
