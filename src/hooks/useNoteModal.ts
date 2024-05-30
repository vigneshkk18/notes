import { useContext } from "react";
import { NoteModalCtx } from "../context/note-modal-ctx";

export const useNoteModal = () => useContext(NoteModalCtx);
