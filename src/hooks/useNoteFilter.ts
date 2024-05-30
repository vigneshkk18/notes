import {
  ChangeEventHandler,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { Notes } from "../types/Notes";
import { Chip, ChipsState } from "../types/Filters";
import { filterNotes } from "../utils/filters";
import useLocalStorageSync from "./useLocalStorageSync";
import shortUUID from "short-uuid";

const id = shortUUID.generate();
const DefaultFilterChips = JSON.stringify({
  chips: {
    used: [{ id, text: "All" }],
    unused: [],
  },
  selected: id,
});

export default function useNoteFilter(notes: Notes[]) {
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const [search, setSearch] = useState(
    () => JSON.parse(localStorage.getItem("SEARCH") || "null") || ""
  );
  useLocalStorageSync(search, "SEARCH");
  const debouncedSearch = useDeferredValue(search);

  const [filterChips, setFilterChips] = useState<ChipsState>(() => {
    const filterChips = JSON.parse(
      localStorage.getItem("FILTER_CHIPS") || DefaultFilterChips
    );
    return filterChips;
  });
  useLocalStorageSync(filterChips, "FILTER_CHIPS");

  useEffect(() => {
    const { chips, filteredNotes } = filterNotes(
      notes,
      debouncedSearch,
      filterChips
    );
    setFilterChips({ ...filterChips, chips });
    setFilteredNotes(filteredNotes);
  }, [notes, debouncedSearch, filterChips.selected]);

  const updateSearch: ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearch(e.target.value);

  const selectChip = (id: string) => () =>
    setFilterChips({ ...filterChips, selected: id });

  const addNewChip = (chip: Chip) => {
    setFilterChips({
      ...filterChips,
      chips: {
        ...filterChips.chips,
        unused: [...filterChips.chips.unused, chip],
      },
    });
  };

  const removeNewChip = (id: string) => {
    setFilterChips({
      ...filterChips,
      chips: {
        ...filterChips.chips,
        unused: filterChips.chips.unused.filter((chip) => chip.id !== id),
      },
    });
  };

  return {
    filteredNotes,
    search,
    filterChips,
    updateSearch,
    selectChip,
    addNewChip,
    removeNewChip,
  };
}
