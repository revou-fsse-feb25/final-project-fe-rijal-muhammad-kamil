import MainBanner from "@/container/banner";
import EventCarousel1 from "@/container/event-carousel-1/event-card-container";
import EventCarousel2 from "@/container/event-carousel-2/event-card-container";

export default function Main() {
  return (
    <>
      <section id="first">
        <section id="banner">
          <MainBanner />
        </section>
        <section id="popular event">
          <div>
            <h2 className="font-(family-name:--font-secondary) font-bold text-3xl text-orange-600 text-center mb-2">Upcoming</h2>
            <h1 className="text-4xl font-bold text-center mb-10">Popular Events</h1>
          </div>
          <div>
            <EventCarousel1 />
          </div>
        </section>
        <section id="">

        </section>
      </section>

      <section id="event you might like">
        <div>
          <h2 className="font-(family-name:--font-secondary) font-bold text-3xl text-orange-600 text-center mb-2">Recommended for you</h2>
          <h1 className="text-4xl font-bold text-center mb-10">Event You Might Like</h1>
        </div>
        <div>
          <EventCarousel2 />
        </div>
      </section>
    </>
  );
}
