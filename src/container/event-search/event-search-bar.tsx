import { Search } from "lucide-react";

function EventSearchBar() {
  return (
    <div className="flex items-center gap-2 py-1.5">
      <Search color="#ff6900" />
      <input type="text" placeholder="Search Here" className="w-full outline-0 placeholder-white" />
    </div>
  );
}

export default EventSearchBar;
