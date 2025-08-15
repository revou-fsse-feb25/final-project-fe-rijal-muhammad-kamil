"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchEvent, HttpError } from "@/service/event-api";
import { useEffect } from "react";
import ErrorPopUp from "@/presentation/pop-up/error-pop-up";
import CardSkeleton from "@/presentation/card/card-skeleton";
import { FirstCard } from "@/presentation/card/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Pagination } from "swiper/modules";

interface EventCardApiResponse {
  event_id: number;
  category_id: number;
  organizer_id: number;
  title: string;
  description: string;
  location: string;
  image_url: string;
  status: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

interface EventCategoryApiResponse {
  category_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface EventPeriodApiResponse {
  period_id: number;
  event_id: number;
  name: string;
  period_sequence: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  status: string;
  created_at: string;
  updated_at: string;
}

const swiper = {
  modules: [Navigation, Pagination, Mousewheel],
  options: {
    speed: 300,
    loop: false,
    effect: "slide",
    pagination: { clickable: true },
    navigation: true,
    centeredSlides: false,
    slidesPerView: "auto" as const,
    spaceBetween: 24,
    simulateTouch: true,
    mousewheel: {
      forceToAxis: true,
      sensitivity: 1,
    },
  },
};

const cardStyle = {
  cardContainerStyle: "w-3xs aspect-[2/2.5] rounded-2xl bg-(--color-surface-1) p-4",
  cardWrapperStyle: "h-full flex flex-col gap-8",
  cardImageWrapperStyle: "w-full aspect-[2/1.5] relative",
  cardImageStyle: "object-cover rounded-2xl",
  cardCategoryWrapperStyle: "flex items-center gap-1 absolute -bottom-4 left-4 rounded-full bg-orange-600 px-4 py-2",
  cardCategoryStyle: "text-xs font-semibold",
  cardDetailWrapperStyle: "h-full flex flex-col gap-4 px-4",
  cardDateTimeWrapperStyle: "flex gap-2 mb-2",
  cardDateWrapperStyle: "flex items-center gap-1",
  cardDateStyle: "text-xs font-semibold text-orange-600",
  cardTimeWrapperStyle: "flex items-center gap-1",
  cardTimeStyle: "text-xs font-semibold text-orange-600",
  cardLocationWrapperStyle: "flex items-center gap-1",
  cardLocationStyle: "text-xs font-semibold text-orange-600",
  cardTitleStyle: "font-bold",
};

function EventCardData() {
  const {
    data: cardDatas = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const events = await fetchEvent<EventCardApiResponse[]>({ endpoint: "events" });
      const categories = await fetchEvent<EventCategoryApiResponse[]>({ endpoint: "eventCategories" });
      const periods = await fetchEvent<EventPeriodApiResponse[]>({ endpoint: "eventPeriods" });

      return events.map((event: EventCardApiResponse) => {
        const category = categories.find((cat) => cat.category_id === event.category_id);
        const period = periods.find((p) => p.event_id === event.event_id);

        return {
          id: event.event_id,
          cardImageSrc: event.image_url,
          cardImageAlt: "image",
          cardCategoryLabel: category?.name || "Unknown",
          cardDateLabel: period?.start_date || "TBD",
          cardTimeLabel: period?.start_time || "TBD",
          cardLocationLabel: event.location,
          cardTitleLabel: event.title,
        };
      });
    },
  });

  useEffect(() => {
    if (isError && error instanceof HttpError) {
      ErrorPopUp({
        title: error.type,
        text: error.message,
        onRetry: () => refetch(),
        isFetching,
      });
    }
  }, [isError, error, refetch, isFetching]);

  return (
    <>
      <Swiper modules={swiper.modules} {...swiper.options} className="w-full h-fit bg-(--background-color)" style={{ paddingBlock: "3rem" }}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <SwiperSlide key={i} style={{ width: "16rem" }}>
                <CardSkeleton />
              </SwiperSlide>
            ))
          : cardDatas.map((cardData) => (
              <SwiperSlide key={cardData.id} style={{ width: "16rem" }}>
                <FirstCard cardDatas={cardData} cardStyle={cardStyle} />
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
}

export default EventCardData;
