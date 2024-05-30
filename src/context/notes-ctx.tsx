import { ChangeEvent, PropsWithChildren, createContext } from "react";
import useNotes from "../hooks/useNotes";
import { Notes } from "../types/Notes";
import { Chip } from "../types/Filters";

export const NotesCtx = createContext<ReturnType<typeof useNotes>>({
  notes: [],
  search: "",
  filterChips: { chips: { used: [], unused: [] }, selected: "" },
  updateSearch: (_event: ChangeEvent<HTMLInputElement>) => {},
  selectChip: (_id: string) => () => {},
  addNote: (_text: string) => () => {
    return {} as Notes;
  },
  addNewChip: (_chip: Chip) => {},
  removeNewChip: (_id: string) => {},
  updateNote: (_note: Notes) => () => {},
  updateNotes: () => {},
  updateNoteData:
    (_index: string, _key: keyof Notes, _value: Notes[keyof Notes]) => () => {},
});

export default function NotesContext({ children }: PropsWithChildren) {
  return <NotesCtx.Provider value={useNotes()}>{children}</NotesCtx.Provider>;
}
