import { useState } from "react";
import { Notes } from "../types/Notes";
import shortUUID from "short-uuid";
import useNoteFilter from "./useNoteFilter";
import { generateColors } from "../utils/notes";
import useLocalStorageSync from "./useLocalStorageSync";

function constructNote(text: string): Notes {
  const { backgroundColor, textColor } = generateColors();
  return {
    id: shortUUID.generate(),
    text,
    bgColor: backgroundColor,
    textColor: textColor,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tag: "",
    title: "Default Title",
  };
}

export default function useNotes() {
  const [notes, setNotes] = useState<Notes[]>(() => {
    return JSON.parse(localStorage.getItem("NOTES") || "[]");
  });
  useLocalStorageSync(notes, "NOTES");
  const { filteredNotes, ...filterRes } = useNoteFilter(notes);

  const addNote = (text: string) => () => {
    const note = constructNote(text);
    setNotes([...notes, note]);
    return note;
  };

  const updateNote = (updatedNote: Notes) => () => {
    const updatedNotes = notes.map((note) => {
      if (note.id !== updatedNote.id) return note;
      return { ...note, ...updatedNote };
    });

    setNotes(updatedNotes);
  };

  const updateNoteData = (
    id: string,
    key: keyof Notes,
    value: Notes[keyof Notes]
  ) => {
    const updatedNotes = notes.map((note) => {
      if (note.id !== id) return note;
      return { ...note, [key]: value };
    });
    setNotes(updatedNotes);
  };

  return {
    notes: filteredNotes,
    addNote,
    updateNote,
    updateNoteData,
    updateNotes: setNotes,
    ...filterRes,
  };
}
