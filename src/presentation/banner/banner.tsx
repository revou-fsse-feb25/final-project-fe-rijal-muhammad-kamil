import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { FirstBannerProps, SecondaryBannerProps } from "./interface";

function FirstBanner({ bannerDatas, bannerStyle, bannerSwiper }: FirstBannerProps): React.ReactElement {
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

function SecondaryBanner({ bannerDatas, bannerStyle }: SecondaryBannerProps) {
  return (
    <Link href={bannerDatas.linkHref} className={bannerStyle.linkStyle}>
      <Image src={bannerDatas.imageSrc} alt={bannerDatas.imageAlt} fill className={bannerStyle.imageStyle}></Image>
    </Link>
  );
}

export { FirstBanner, SecondaryBanner };
