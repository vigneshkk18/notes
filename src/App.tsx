import Header from "./components/header";
import NotesApp from "./components/notes-app";
import NoteModal from "./context/note-modal-ctx";
import NoteTagsModal from "./context/note-tag-modal-ctx";

function App() {
  return (
    <main className="mx-auto max-w-4xl overflow-hidden h-full px-6 py-4 relative">
      <NoteTagsModal>
        <NoteModal>
          <Header />
          <NotesApp />
        </NoteModal>
      </NoteTagsModal>
    </main>
  );
}

export default App;
