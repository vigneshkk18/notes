import { useNoteTagsModal } from "../../hooks/useNoteTagModal";
import { useNotesStore } from "../../hooks/useNotesStore";
import { Chip as IChipType } from "../../types/Filters";
import IconButton from "../icon-button";

export default function Chips() {
  const { openModal } = useNoteTagsModal();
  const { filterChips, selectChip } = useNotesStore();

  if (!filterChips.chips.used.length) return null;
  return (
    <div className="flex my-6 gap-4">
      <IconButton
        onClick={openModal}
        className="border border-lightGray dark:border-lightGrayDark rounded-lg"
      >
        <i className="bx bxs-cog text-xl text-gray dark:text-grayDark"></i>
      </IconButton>
      <ul className="flex gap-4 overflow-x-auto relative">
        {filterChips.chips.used.map((chip) => (
          <Chip
            key={chip.id}
            chip={chip}
            selectChip={selectChip}
            selected={filterChips.selected === chip.id}
          />
        ))}
      </ul>
    </div>
  );
}

interface IChip {
  chip: IChipType;
  selectChip: ReturnType<typeof useNotesStore>["selectChip"];
  selected: boolean;
}

function Chip({ chip, selectChip, selected }: IChip) {
  const colorClass = selected
    ? "bg-textPrimary dark:bg-textPrimaryDark text-bgPrimary dark:text-bgPrimaryDark"
    : "text-gray dark:text-grayDark border border-gray dark:border-grayDark";
  return (
    <li
      key={chip.id}
      onClick={selectChip(chip.id)}
      className={`p-1 px-3 rounded-lg cursor-pointer flex items-center text-nowrap ${colorClass}`}
    >
      {chip.text}
    </li>
  );
}
