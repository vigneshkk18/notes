import NoteGroup from "./notes/note-group";
import useAdaptiveNotes from "../hooks/useAdaptiveNotes";

export default function Notes() {
  const groupedNotes = useAdaptiveNotes();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto">
      {groupedNotes.map((notes, index) => (
        <NoteGroup key={index} notes={notes} />
      ))}
    </ul>
  );
}
