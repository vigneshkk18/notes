import { useContext } from "react";
import { NoteTagModalCtx } from "../context/note-tag-modal-ctx";

export const useNoteTagsModal = () => useContext(NoteTagModalCtx);
