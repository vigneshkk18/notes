import Chips from "./filters/chips";
import Search from "./filters/search";

export default function SearchFilter() {
  return (
    <section className="w-full my-4">
      <Search />
      <Chips />
    </section>
  );
}
