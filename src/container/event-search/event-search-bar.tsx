"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface EventSearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

function EventSearchBar({ onSearch, searchQuery }: EventSearchBarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center gap-2 py-[7px]">
      <Search color="#f54a00" />
      <input 
        type="text" 
        placeholder="Search Here" 
        className="w-full outline-0 placeholder-white" 
        value={localQuery}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default EventSearchBar;
