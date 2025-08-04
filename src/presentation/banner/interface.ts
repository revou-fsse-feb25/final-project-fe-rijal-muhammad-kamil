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
  //   dotWrapperStyle?: string;
  //   dotStyle?: string | ((isActive: boolean) => string);
  //   leftArrowStyle?: string;
  //   rightArrowStyle?: string;
}

// Konfigurasi Swiper
export interface BannerSwiper {
  modules?: SwiperModule[];
  options?: SwiperOptions;
}

// Props untuk komponen <Banner />
export interface BannerProps {
  bannerDatas: BannerData[];
  bannerStyle: BannerStyle;
  bannerSwiper: BannerSwiper;
}
