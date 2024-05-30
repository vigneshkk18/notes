import { useNotesStore } from "../../hooks/useNotesStore";

export default function Search() {
  const { search, updateSearch } = useNotesStore();

  return (
    <div className="flex gap-2 items-center w-full p-2 px-4 rounded-xl border border-lightGray dark:border-lightGrayDark">
      <i className="bx bx-search text-3xl text-gray dark:text-grayDark"></i>
      <input
        value={search}
        type="text"
        onChange={updateSearch}
        placeholder="Search for notes"
        className="flex-grow bg-transparent outline-none border-none placeholder:text-gray dark:placeholder:text-grayDark"
      />
    </div>
  );
}
