"use client";

import EventCardData1 from "./event-card-data";
import EventSearchLocal1 from "./event-search-local/event-search";

function EventCardContainer1() {
  return (
    <div className="flex flex-col">
      <EventSearchLocal1 />
      <EventCardData1 />
    </div>
  );
}

export default EventCardContainer1;
