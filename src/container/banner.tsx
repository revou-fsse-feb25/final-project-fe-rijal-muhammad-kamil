"use client";

import { FirstBanner, SecondaryBanner } from "@/presentation/banner/banner";
import { Navigation, Pagination, Autoplay, EffectFade, Mousewheel } from "swiper/modules";
import "swiper/swiper-bundle.css";

const bannerDatas1 = [
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

const bannerStyle1 = {
  swiperStyle: "w-full aspect-[3.5/1] rounded-2xl",
  linkStyle: "block w-full h-full relative",
  imageStyle: "object-cover",
};

const bannerSwiper = {
  modules: [Navigation, Pagination, Autoplay, EffectFade, Mousewheel],
  options: {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 300,
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

function Banner1() {
  return <FirstBanner bannerDatas={bannerDatas1} bannerStyle={bannerStyle1} bannerSwiper={bannerSwiper} />;
}

const bannerDatas2 = {
  linkHref: "/",
  imageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
  imageAlt: "Banner",
};

function Banner2() {
  const bannerStyle2 = {
    linkStyle: "block w-full aspect-[6/1] relative",
    imageStyle: "object-cover rounded-2xl",
  };
  return <SecondaryBanner bannerDatas={bannerDatas2} bannerStyle={bannerStyle2} />;
}

export { Banner1, Banner2 };
