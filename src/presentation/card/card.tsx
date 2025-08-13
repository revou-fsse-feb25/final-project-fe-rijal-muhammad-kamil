import Image from "next/image";
import { CardProps } from "./interface";
import { CalendarDays, Clock3, MapPin, Layers } from "lucide-react";

function Card({ cardDatas, cardStyle }: CardProps) {
  return (
    <div className={cardStyle.cardContainerStyle}>
      <div className={cardStyle.cardWrapperStyle}>
        <div className={cardStyle.cardImageWrapperStyle}>
          <Image src={cardDatas.cardImageSrc} alt={cardDatas.cardImageAlt} fill className={cardStyle.cardImageStyle} />
          <div className={cardStyle.cardCategoryWrapperStyle}>
            <Layers size={16} />
            <span className={cardStyle.cardCategoryStyle}>{cardDatas.cardCategoryLabel}</span>
          </div>
        </div>
        <div className={cardStyle.cardDetailWrapperStyle}>
          <div>
            <div className={cardStyle.cardDateTimeWrapperStyle}>
              <div className={cardStyle.cardDateWrapperStyle}>
                <CalendarDays size={16} color="#f54a00" />
                <span className={cardStyle.cardDateStyle}>{cardDatas.cardDateLabel}</span>
              </div>
              <div className={cardStyle.cardTimeWrapperStyle}>
                <Clock3 size={16} color="#f54a00" />
                <span className={cardStyle.cardTimeStyle}>{cardDatas.cardTimeLabel}</span>
              </div>
            </div>
            <div className={cardStyle.cardLocationWrapperStyle}>
              <MapPin size={16} color="#f54a00" />
              <span className={cardStyle.cardLocationStyle}>{cardDatas.cardLocationLabel}</span>
            </div>
          </div>
          <h4 className={cardStyle.cardTitleStyle}>{cardDatas.cardTitleLabel}</h4>
        </div>
      </div>
    </div>
  );
}

export default Card;
