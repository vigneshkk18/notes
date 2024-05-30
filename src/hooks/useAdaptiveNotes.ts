import { useEffect, useState } from "react";
import { getMaxGroupCount, groupNotes } from "../utils/grouping";
import { useNotesStore } from "./useNotesStore";

export default function useAdaptiveNotes() {
  const { notes } = useNotesStore();
  const [groupedData, setGroupedData] = useState(() =>
    groupNotes(notes, getMaxGroupCount())
  );

  useEffect(() => {
    setGroupedData(groupNotes(notes, getMaxGroupCount()));

    const abortController = new AbortController();
    window.addEventListener(
      "resize",
      () => {
        setGroupedData(groupNotes(notes, getMaxGroupCount()));
      },
      {
        signal: abortController.signal,
      }
    );

    return () => {
      abortController.abort();
    };
  }, [notes]);

  useEffect(() => {}, []);

  return groupedData;
}
