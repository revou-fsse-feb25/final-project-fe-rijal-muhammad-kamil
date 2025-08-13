import MainBanner from "@/container/banner";
import EventCarousel1 from "@/container/event-carousel-1/event-card-container";

export default function Main() {
  return (
    <>
      <section id="banner">
        <MainBanner />
      </section>
      <section id="upcoming event">
        <div>
          <h2 className="font-(family-name:--font-secondary) font-bold text-3xl text-orange-600 text-center mb-2">Upcoming</h2>
          <h1 className="text-4xl font-bold text-center mb-10">Popular Events</h1>
        </div>
        <div>
          <EventCarousel1 />
        </div>
      </section>
    </>
  );
}
