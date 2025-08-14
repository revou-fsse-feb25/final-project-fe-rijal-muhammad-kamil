import { Banner1, Banner2 } from "@/container/banner";
import EventCarousel1 from "@/container/event-carousel-1/event-card-container";
import EventCarousel2 from "@/container/event-carousel-2/event-card-container";
import TopEvent from "@/container/top-event";

export default function Main() {
  return (
    <>
      <section id="first" className="flex flex-col gap-12">
        <div id="banner">
          <Banner1 />
        </div>
        <div>
          <div>
            <h2 className="font-(family-name:--font-secondary) font-bold text-3xl text-orange-600 text-center mb-2">Upcoming</h2>
            <h1 className="text-4xl font-bold text-center mb-12">Popular Event</h1>
          </div>
          <div>
            <EventCarousel1 />
          </div>
        </div>
        <div>
          <Banner2 />
        </div>
      </section>

      <section>
        <div className="w-full bg-orange-600 py-6">
        <h2 className="font-(family-name:--font-secondary) font-bold text-3xl text-center mb-6">Top Event</h2>
          <TopEvent/>
        </div>
      </section>

      <section id="event you might like">
        <div>
          <h2 className="font-(family-name:--font-secondary) font-bold text-3xl text-orange-600 text-center mb-2">Recommended for you</h2>
          <h1 className="text-4xl font-bold text-center mb-12">Event You Might Like</h1>
        </div>
        <div>
          <EventCarousel2 />
        </div>
      </section>
    </>
  );
}
