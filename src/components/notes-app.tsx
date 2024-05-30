import Notes from "./notes";
import AddNoteFab from "./add-note-fab";
import SearchFilter from "./search-filter";

export default function NotesApp() {
  return (
    <div className="w-full h-[calc(100vh-72px)] relative grid grid-rows-[max-content_auto]">
      <SearchFilter />
      <Notes />
      <AddNoteFab />
    </div>
  );
}
