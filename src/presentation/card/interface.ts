interface CardData {
  cardImageSrc: string;
  cardImageAlt: string;
  cardCategoryLabel: string;
  cardDateLabel: string;
  cardTimeLabel: string;
  cardTitleLabel: string;
  cardLocationLabel: string;
}

interface CardStyle {
  cardContainerStyle?: string;
  cardWrapperStyle?: string;
  cardImageWrapperStyle?: string;
  cardImageStyle?: string;
  cardLocationWrapperStyle?: string;
  cardLocationStyle?: string;
  cardDetailWrapperStyle?: string;
  cardDateTimeWrapperStyle?: string;
  cardDateWrapperStyle?: string;
  cardDateStyle?: string;
  cardTimeWrapperStyle?: string;
  cardTimeStyle?: string;
  cardTitleStyle?: string;
  cardCategoryWrapperStyle?: string;
  cardCategoryStyle?: string;
}

export interface CardProps {
  cardDatas: CardData;
  cardStyle: CardStyle;
}
