import {
  MouseEventHandler,
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import NoteModalEl from "../components/notes/note-modal";

import { Notes } from "../types/Notes";
import { ModalRef } from "../types/Modal";
import { useNotesStore } from "../hooks/useNotesStore";

interface INoteModalCtx {
  modal: INoteModalState;
  openModal: (note: Notes) => MouseEventHandler<HTMLLIElement>;
  closeModal: () => void;
  updateNoteData: (key: keyof Notes, value: Notes[keyof Notes]) => void;
}

type INoteModalState =
  | {
      open: true;
      note: Notes;
    }
  | {
      open: false;
      note: null;
    };

export const NoteModalCtx = createContext<INoteModalCtx>({
  modal: { open: false, note: null },
  openModal: (_note: Notes) => () => {},
  closeModal: () => {},
  updateNoteData: (_key: keyof Notes, _value: Notes[keyof Notes]) => {},
});

export default function NoteModal({ children }: PropsWithChildren) {
  const { updateNote } = useNotesStore();
  const [modal, setModal] = useState<INoteModalState>({
    open: false,
    note: null,
  });
  const modalRef = useRef<ModalRef>(null);

  useEffect(() => {
    if (!modal.note) return;
    let timer = setTimeout(() => {
      updateNote(modal.note)();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [modal.note]);

  const openModal = (note: Notes) => () => {
    modalRef.current?.open();
    setModal({
      open: true,
      note,
    });
  };

  const updateNoteData = (key: keyof Notes, value: Notes[keyof Notes]) => {
    if (!modal.open) return;

    setModal((prev: any) => ({
      ...prev,
      note: { ...modal.note, [key]: value },
    }));
  };

  const closeModal = () => {
    modalRef.current?.close();
    setModal({ open: false, note: null });
  };

  return (
    <NoteModalCtx.Provider
      value={{ modal, openModal, closeModal, updateNoteData }}
    >
      {children}
      <NoteModalEl
        ref={modalRef}
        open={modal.open}
        note={modal.note}
        openModal={openModal}
        closeModal={closeModal}
        updateNoteData={updateNoteData}
      />
    </NoteModalCtx.Provider>
  );
}
