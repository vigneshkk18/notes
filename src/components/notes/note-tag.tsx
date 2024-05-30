import { ChangeEventHandler } from "react";
import { Notes } from "../../types/Notes";
import { useNoteTagsModal } from "../../hooks/useNoteTagModal";
import { useNotesStore } from "../../hooks/useNotesStore";

interface INoteTag {
  tag: string | undefined;
  updateNoteData: (key: keyof Notes, value: string) => void;
}

export default function NoteTag({ tag, updateNoteData }: INoteTag) {
  const { openModal: openTagsModal } = useNoteTagsModal();
  const { filterChips } = useNotesStore();

  const onTagChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;
    if (!value) return;

    updateNoteData("tag", value);
  };

  return (
    <>
      <label className="mx-2">
        <span className="font-bold">Tag</span>
        <select
          className="ml-2 p-2 bg-black/5 hover:bg-black/10 rounded-md"
          value={tag || filterChips?.chips?.used?.[0]?.id}
          onChange={onTagChange}
        >
          {filterChips.chips.used.map((chip) => (
            <option key={chip.id} value={chip.id}>
              {chip.text}
            </option>
          ))}
          {filterChips.chips.unused.map((chip) => (
            <option key={chip.id} value={chip.id}>
              {chip.text}
            </option>
          ))}
        </select>
      </label>
      <button
        onClick={openTagsModal}
        className="hover:bg-black/10 border-0 outline-0 border-none outline-none rounded-md p-2 flex items-center gap-2"
      >
        <i className="bx bx-plus font-xl"></i> Add New
      </button>
    </>
  );
}
