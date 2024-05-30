import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Notes } from "../../types/Notes";
import IconButton from "../icon-button";
import NoteTitle from "./note-title";
import NoteText from "./note-text";
import NoteTag from "./note-tag";

interface INoteModal {
  open: boolean;
  note: Notes | null;
  openModal: (note: Notes) => () => void;
  closeModal: () => void;
  updateNoteData: (key: keyof Notes, value: Notes[keyof Notes]) => void;
}

function NoteModal(
  { open, note, closeModal, updateNoteData }: INoteModal,
  ref: any
) {
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modal.current) return;
    modal.current.addEventListener("click", (e) => {
      if (e.target === modal.current) closeModal();
    });
  }, []);

  useImperativeHandle(ref, () => ({
    open: () => modal.current?.showModal(),
    close: () => modal.current?.close(),
  }));

  return (
    <dialog
      ref={modal}
      className="absolute top-1/2 left-1/2 m-0 -translate-x-1/2 -translate-y-1/2 w-5/6 sm:max-w-md lg:max-w-xl rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center gap-2 px-4 pt-4">
        <NoteTitle title={note?.title} updateNoteData={updateNoteData} />
        <IconButton className="hover:bg-black/10" onClick={closeModal}>
          <i className="bx bx-x text-xl"></i>
        </IconButton>
      </div>
      <div className="px-4 py-2 flex">
        <NoteTag tag={note?.tag} updateNoteData={updateNoteData} />
      </div>
      <div className="px-4 pb-2">
        <NoteText
          open={open}
          text={note?.text}
          updateNoteData={updateNoteData}
        />
      </div>
    </dialog>
  );
}

export default forwardRef(NoteModal);
