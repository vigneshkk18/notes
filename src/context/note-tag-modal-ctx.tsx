import {
  MouseEventHandler,
  PropsWithChildren,
  createContext,
  useRef,
} from "react";

import { ModalRef } from "../types/Modal";
import shortUUID from "short-uuid";
import ChipsModal from "../components/chips/chips-modal";
import { useNotesStore } from "../hooks/useNotesStore";

interface INoteTagModalCtx {
  openModal: MouseEventHandler<HTMLElement>;
  closeModal: () => void;
  addNewTag: (tag: string) => () => void;
  removeTag: (id: string) => () => void;
}

export const NoteTagModalCtx = createContext<INoteTagModalCtx>({
  openModal: () => {},
  closeModal: () => {},
  addNewTag: (_tag: string) => () => {},
  removeTag: (_id: string) => () => {},
});

export default function NoteTagsModal({ children }: PropsWithChildren) {
  const { addNewChip, removeNewChip } = useNotesStore();
  const modalRef = useRef<ModalRef>(null);

  const openModal = () => {
    modalRef.current?.open();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const addNewTag = (tag: string) => () => {
    addNewChip({ id: shortUUID.generate(), text: tag });
  };

  const removeTag = (id: string) => () => {
    removeNewChip(id);
  };

  return (
    <NoteTagModalCtx.Provider
      value={{ openModal, closeModal, addNewTag, removeTag }}
    >
      {children}
      <ChipsModal
        addNewTag={addNewTag}
        closeModal={closeModal}
        removeTag={removeTag}
        ref={modalRef}
      />
    </NoteTagModalCtx.Provider>
  );
}
