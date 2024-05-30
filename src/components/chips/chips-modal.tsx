import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import Chips from "./chips";
import IconButton from "../icon-button";
import { useNotesStore } from "../../hooks/useNotesStore";

interface IChipsModal {
  closeModal: () => void;
  addNewTag: (tag: string) => () => void;
  removeTag: (id: string) => () => void;
}

function ChipsModal(
  { closeModal, addNewTag, removeTag }: IChipsModal,
  ref: any
) {
  const input = useRef<HTMLInputElement>(null);
  const { filterChips } = useNotesStore();
  const [tag, setTag] = useState("");
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modal.current) return;
    modal.current.addEventListener("click", (e) => {
      if (e.target === modal.current) closeModal();
    });
  }, []);

  useImperativeHandle(ref, () => ({
    open: () => {
      modal.current?.showModal();
      input.current?.focus();
    },
    close: () => modal.current?.close(),
  }));

  const onTagAdd = () => {
    if (!tag.trim()) return;
    addNewTag(tag)();
    setTag("");
    input.current?.focus();
  };

  const AvailableUsedChips = filterChips.chips.used.slice(1);

  return (
    <dialog
      ref={modal}
      id="chips-modal"
      className="absolute top-1/2 left-1/2 m-0 -translate-x-1/2 -translate-y-1/2 w-5/6 sm:max-w-md lg:max-w-xl rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center gap-2 m-4">
        <h2 className="text-2xl font-bold">Manage Tags</h2>
        <IconButton className="hover:bg-black/10" onClick={closeModal}>
          <i className="bx bx-x text-xl"></i>
        </IconButton>
      </div>
      <div className="flex w-full rounded-lg p-4">
        <input
          ref={input}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Tag"
          className="bg-black/5 hover:bg-black/10 focus:bg-black/10 p-2 flex-grow rounded-s-lg border-0 ouline-0 outline-none"
        />
        <button
          onClick={onTagAdd}
          className="p-2 flex items-center rounded-e-lg bg-black text-white"
        >
          <i className="bx bx-plus text-xl"></i>
          Add New Tag
        </button>
      </div>
      {AvailableUsedChips.length || filterChips.chips.unused.length ? (
        <>
          <Chips
            chips={AvailableUsedChips}
            canRemove={false}
            onRemove={removeTag}
          />
          <Chips
            chips={filterChips.chips.unused}
            canRemove={true}
            onRemove={removeTag}
          />
        </>
      ) : (
        <p className="m-4 font-bold text-center">No Chips Available</p>
      )}
    </dialog>
  );
}

export default forwardRef(ChipsModal);
