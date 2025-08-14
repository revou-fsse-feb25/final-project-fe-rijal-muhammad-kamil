"use client";

import EventCardData from "./event-card-data";
import EventSearchContainer from "./event-search/event-search-container";

function EventCarousel1() {
  return (
    <div className="flex flex-col">
      <EventSearchContainer />
      <EventCardData />
    </div>
  );
}

export default EventCarousel1;
