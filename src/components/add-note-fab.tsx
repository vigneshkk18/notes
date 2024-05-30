import { useNoteModal } from "../hooks/useNoteModal";
import { useNotesStore } from "../hooks/useNotesStore";

export default function AddNoteFab() {
  const { addNote } = useNotesStore();
  const { openModal } = useNoteModal();

  const onAddNote = (event: any) => {
    const note = addNote("<p>Important Note</p>")();
    openModal(note)(event);
  };

  return (
    <button
      onClick={onAddNote}
      className="absolute bottom-4 w-12 h-12 right-0 p-1 rounded-full bg-textPrimary dark:bg-textPrimaryDark"
    >
      <i className="bx bx-plus text-4xl text-primaryDark dark:text-primary"></i>
    </button>
  );
}
