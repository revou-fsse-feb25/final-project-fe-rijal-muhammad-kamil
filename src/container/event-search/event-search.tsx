"use client";

import EventSearchBar from "./event-search-bar";
import EventLocation from "./event-location";
import EventDate from "./event-date";
import EventCategory from "./event-category";
import EventSearchResults from "./event-search-results";
import { ArrowRight } from "lucide-react";
import { useEventSearch } from "@/hooks/use-event-search";

function EventSearch(): React.ReactElement {
  const { events, loading, error, searchQuery, setSearchQuery, searchEvents } = useEventSearch();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchClick = () => {
    searchEvents();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-xl lg:w-[70vw] 2xl:w-[60vw] rounded-lg lg:rounded-full bg-(--color-surface-1-transparant) backdrop-blur-xl py-4 px-8 lg:p-2 lg:px-4">
        <ul className="flex flex-col lg:flex-row lg:items-center gap-y-4 gap-x-2 text-center">
          <li className="flex-1/2">
            <EventSearchBar onSearch={handleSearch} searchQuery={searchQuery} />
          </li>
          <li className="flex-1/2">
            <EventLocation />
          </li>
          <li className="flex-1/2">
            <EventDate />
          </li>
          <li className="flex-1/2">
            <EventCategory />
          </li>
          <li className="">
            <button 
              onClick={handleSearchClick}
              className="w-full flex justify-center rounded-lg lg:rounded-full bg-orange-600 cursor-pointer p-2 transition-colors duration-150 ease-in hover:bg-orange-500"
            >
              <ArrowRight />
            </button>
          </li>
        </ul>
      </div>
      
      <EventSearchResults 
        events={events}
        loading={loading}
        error={error}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default EventSearch;
