import { useContext } from "react";
import { NotesCtx } from "../context/notes-ctx";

export const useNotesStore = () => useContext(NotesCtx);
