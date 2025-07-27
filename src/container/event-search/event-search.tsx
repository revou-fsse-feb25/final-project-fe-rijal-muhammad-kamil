import EventSearchBar from "./event-search-bar";
import EventLocation from "./event-location";
import EventDate from "./event-date";
import EventCategory from "./event-category";
import { ArrowRight } from "lucide-react";

function EventSearch(): React.ReactElement {
  return (
    <div className="w-xl lg:w-[70vw] 2xl:w-[60vw] bg-white/5 rounded-lg lg:rounded-full backdrop-blur-xl py-4 px-8 lg:py-2 lg:px-4">
      <ul className="flex flex-col lg:flex-row lg:items-center gap-y-4 gap-x-2 text-center">
        <li className="flex-1/2">
          <EventSearchBar />
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
          <button className="p-2 w-full flex justify-center rounded-lg lg:rounded-full bg-orange-500">
            <ArrowRight />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default EventSearch;
