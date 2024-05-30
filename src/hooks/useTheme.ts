import { useContext } from "react";
import { ThemeCtx } from "../context/theme-ctx";

export const useTheme = () => useContext(ThemeCtx);
