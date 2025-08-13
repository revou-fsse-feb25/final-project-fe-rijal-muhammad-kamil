import EventCategoryLocal1 from "./event-category";
import EventDateLocal1 from "./event-date";
import EventLocationLocal1 from "./event-location";

function EventSearchLocal1(): React.ReactElement {
  return (
    <div className="w-3xs lg:w-lg rounded-2xl lg:rounded-full">
      <ul className="flex flex-col lg:flex-row lg:items-center gap-y-4 gap-x-2 text-center">
        <li className="flex-1/2 rounded-2xl bg-(--color-surface-1) p-1">
          <EventCategoryLocal1 />
        </li>
        <li className="flex-1/2 rounded-2xl bg-(--color-surface-1) p-1">
          <EventDateLocal1 />
        </li>
        <li className="flex-1/2 rounded-2xl bg-(--color-surface-1) p-1">
          <EventLocationLocal1 />
        </li>
      </ul>
    </div>
  );
}

export default EventSearchLocal1;
