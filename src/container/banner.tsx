"use client";
import Banner from "@/presentation/banner/banner";
import { Navigation, Pagination, Autoplay, EffectFade, Mousewheel } from "swiper/modules";
import "swiper/swiper-bundle.css";

const bannerDatas = [
  {
    id: 1,
    linkHref: "/",
    imageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
    imageAlt: "Banner 1",
  },
  {
    id: 2,
    linkHref: "/",
    imageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
    imageAlt: "Banner 2",
  },
  {
    id: 3,
    linkHref: "/",
    imageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
    imageAlt: "Banner 3",
  },
  {
    id: 4,
    linkHref: "/",
    imageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
    imageAlt: "Banner 4",
  },
  {
    id: 5,
    linkHref: "/",
    imageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
    imageAlt: "Banner 5",
  },
  {
    id: 6,
    linkHref: "/",
    imageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
    imageAlt: "Banner 6",
  },
  {
    id: 7,
    linkHref: "/",
    imageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
    imageAlt: "Banner 7",
  },
  {
    id: 8,
    linkHref: "/",
    imageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
    imageAlt: "Banner 8",
  },
  {
    id: 9,
    linkHref: "/",
    imageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
    imageAlt: "Banner 9",
  },
  {
    id: 10,
    linkHref: "/",
    imageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
    imageAlt: "Banner 10",
  },
];

const bannerStyle = {
  swiperStyle: "aspect-[3/1] rounded-2xl",
  imageStyle: "object-cover",
};

const bannerSwiper = {
  modules: [Navigation, Pagination, Autoplay, EffectFade, Mousewheel],
  options: {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 700,
    loop: true,
    effect: "slide",
    pagination: { clickable: true },
    navigation: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 24,
    simulateTouch: true,
    mousewheel: {
      forceToAxis: true,
      sensitivity: 1,
    },
  },
};

const MainBanner = () => {
  return <Banner bannerDatas={bannerDatas} bannerStyle={bannerStyle} bannerSwiper={bannerSwiper} />;
};

export default MainBanner;
