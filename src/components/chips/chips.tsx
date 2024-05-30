import IconButton from "../icon-button";

import { Chip } from "../../types/Filters";

interface IChips {
  chips: Chip[];
  canRemove: boolean;
  onRemove: (id: string) => () => void;
}

export default function Chips({ chips, canRemove, onRemove }: IChips) {
  return (
    <ul className="m-4 flex gap-4 flex-wrap max-h-64 overflow-y-auto">
      {chips.map((chip) => (
        <li
          className={`rounded inline-flex items-center bg-black text-bgPrimary`}
          key={chip.id}
        >
          <span className="p-1 px-3">{chip.text}</span>
          {canRemove && (
            <IconButton
              onClick={onRemove(chip.id)}
              className="!bg-red-500 rounded-none rounded-e"
            >
              <i className="bx bxs-trash text-white"></i>
            </IconButton>
          )}
        </li>
      ))}
    </ul>
  );
}
