import { SwiperOptions } from "swiper/types";
import { SwiperModule } from "swiper/types";

interface BannerData {
  id?: number;
  linkHref: string;
  imageSrc: string;
  imageAlt: string;
}

interface BannerStyle {
  swiperStyle?: string;
  swiperSlideStyle?: string;
  linkStyle?: string;
  imageStyle?: string;
}

interface BannerSwiper {
  modules?: SwiperModule[];
  options?: SwiperOptions;
}

export interface FirstBannerProps {
  bannerDatas: BannerData[];
  bannerStyle: BannerStyle;
  bannerSwiper: BannerSwiper;
}

export interface SecondaryBannerProps {
  bannerDatas: BannerData;
  bannerStyle: BannerStyle;
}
