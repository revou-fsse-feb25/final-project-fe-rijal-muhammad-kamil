import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { BannerProps } from "./interface";

function Banner({ bannerDatas, bannerStyle, bannerSwiper }: BannerProps): React.ReactElement {
  return (
    <Swiper modules={bannerSwiper.modules} {...bannerSwiper.options} className={bannerStyle.swiperStyle}>
      {bannerDatas.map((bannerData) => (
        <SwiperSlide key={bannerData.id} className={bannerStyle.swiperSlideStyle}>
          <Link href={bannerData.linkHref} className={bannerStyle.linkStyle}>
            <Image src={bannerData.imageSrc} alt={bannerData.imageAlt} fill className={bannerStyle.imageStyle} priority />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Banner;
