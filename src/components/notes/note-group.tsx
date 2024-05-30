import { useNoteModal } from "../../hooks/useNoteModal";
import { Notes } from "../../types/Notes";
import NotePreview from "./note-preview";

interface INoteGroup {
  notes: Notes[];
}

export default function NoteGroup({ notes }: INoteGroup) {
  const { openModal } = useNoteModal();

  return (
    <li>
      <ul className="flex flex-col gap-8">
        {notes.map((note) => (
          <li
            onClick={openModal(note)}
            key={note.id}
            style={{ backgroundColor: note.bgColor, color: note.textColor }}
            className="p-4 rounded-2xl bg-green-400 text-black cursor-pointer"
          >
            <h5 className="text-xl font-bold">{note.title}</h5>
            <NotePreview text={note.text} />
          </li>
        ))}
      </ul>
    </li>
  );
}
