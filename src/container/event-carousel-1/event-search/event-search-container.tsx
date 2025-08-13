import EventCategory from "./event-category";
import EventDate from "./event-date";
import EventLocation from "./event-location";

function EventSearchContainer(): React.ReactElement {
  return (
    <div className="w-3xs lg:w-lg rounded-2xl lg:rounded-full">
      <ul className="flex flex-col lg:flex-row lg:items-center gap-y-4 gap-x-2 text-center">
        <li className="flex-1/2 rounded-2xl bg-(--color-surface-1) p-1">
          <EventCategory />
        </li>
        <li className="flex-1/2 rounded-2xl bg-(--color-surface-1) p-1">
          <EventDate />
        </li>
        <li className="flex-1/2 rounded-2xl bg-(--color-surface-1) p-1">
          <EventLocation />
        </li>
      </ul>
    </div>
  );
}

export default EventSearchContainer;
