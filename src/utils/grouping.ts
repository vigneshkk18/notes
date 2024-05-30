import { Notes } from "../types/Notes";
import { screens } from "tailwindcss/defaultTheme";

export const groupNotes = (notes: Notes[], columnCount: number) => {
  const columns = new Array<Array<Notes>>();
  let index = 0;
  notes.forEach((note) => {
    if (!columns[index]) columns[index] = [];
    columns[index].push(note);
    index++;
    if (index === columnCount) index = 0;
  });
  return columns;
};

type Screen = "sm" | "md" | "lg" | "xl" | "2xl";
const screenToGroupCount: Record<Screen, number> = {
  sm: 2,
  md: 2,
  lg: 3,
  xl: 3,
  "2xl": 3,
};

const convertPxInStrToNum = (str: string) => Number(str.split("px")[0]);

export const getMaxGroupCount = () => {
  const screenKeys = Object.keys(screenToGroupCount) as unknown as Screen[];
  let maxCount = screenToGroupCount.sm;
  const screenSize = window.innerWidth;
  for (let i = screenKeys.length - 1; i > -1; i--) {
    const screen = screenKeys[i];
    if (screenSize > convertPxInStrToNum((screens as any)[screen])) {
      maxCount = Math.max(screenToGroupCount[screen], maxCount);
    }
  }
  return maxCount;
};
