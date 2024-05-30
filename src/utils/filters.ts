import { ChipsState } from "../types/Filters";
import { Notes } from "../types/Notes";

const noteSearchFn = (note: Notes, search: string) => {
  if (!search.trim()) return true;
  return note.text.includes(search) || note.title.includes(search);
};

export const filterNotes = (
  notes: Notes[],
  search: string,
  filterChips: ChipsState
) => {
  const isAllSelected = filterChips.chips.used[0].id === filterChips.selected;
  const chipIds = new Set<string>();
  chipIds.add(filterChips.chips.used[0].id);

  const filteredNotes = notes.filter((note) => {
    chipIds.add(note.tag);
    if (!noteSearchFn(note, search)) return false;
    if (isAllSelected) return true;
    return note.tag === filterChips.selected;
  });

  const updatedChips = [
    ...filterChips.chips.used,
    ...filterChips.chips.unused,
  ].reduce(
    (acc, chip) => {
      if (chipIds.has(chip.id)) acc.used.push({ ...chip });
      else acc.unused.push({ ...chip });
      return acc;
    },
    { used: [], unused: [] } as ChipsState["chips"]
  );

  return { filteredNotes, chips: updatedChips };
};
