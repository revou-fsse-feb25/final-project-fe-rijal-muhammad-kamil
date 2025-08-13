import { SwiperOptions } from "swiper/types";
import { SwiperModule } from "swiper/types";

export interface BannerData {
  id: number;
  linkHref: string;
  imageSrc: string;
  imageAlt: string;
}

export interface BannerStyle {
  swiperStyle?: string;
  swiperSlideStyle?: string;
  linkStyle?: string;
  imageStyle?: string;
}

export interface BannerSwiper {
  modules?: SwiperModule[];
  options?: SwiperOptions;
}

export interface BannerProps {
  bannerDatas: BannerData[];
  bannerStyle: BannerStyle;
  bannerSwiper: BannerSwiper;
}
