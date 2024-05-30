import { PropsWithChildren, createContext, useEffect, useState } from "react";
import useLocalStorageSync from "../hooks/useLocalStorageSync";

interface IThemeCtx {
  theme: "dark" | "light";
  setLightTheme: () => void;
  setDarkTheme: () => void;
}

export const ThemeCtx = createContext<IThemeCtx>({
  theme: "light",
  setLightTheme: () => {},
  setDarkTheme: () => {},
});

export default function Theme({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<IThemeCtx["theme"]>(() => {
    let theme = JSON.parse(localStorage.getItem("THEME") || "null");
    if (!theme) {
      theme = window.matchMedia("(prefers-color-scheme: dark)")?.matches
        ? "dark"
        : "light";
    }
    return theme;
  });
  useLocalStorageSync(theme, "THEME");

  useEffect(() => {
    if (theme === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [theme]);

  const setLightTheme = () => setTheme("light");
  const setDarkTheme = () => setTheme("dark");

  return (
    <ThemeCtx.Provider value={{ theme, setLightTheme, setDarkTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}
