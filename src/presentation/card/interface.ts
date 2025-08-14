interface CardData {
  id: number;
  cardImageSrc: string;
  cardImageAlt: string;
  cardCategoryLabel: string;
  cardDateLabel: string;
  cardTimeLabel: string;
  cardLocationLabel: string;
  cardTitleLabel: string;
}

interface CardStyle {
  cardContainerStyle?: string;
  cardWrapperStyle?: string;
  cardImageWrapperStyle?: string;
  cardImageStyle?: string;
  cardCategoryWrapperStyle?: string;
  cardCategoryStyle?: string;
  cardDetailWrapperStyle?: string;
  cardDateTimeWrapperStyle?: string;
  cardDateWrapperStyle?: string;
  cardDateStyle?: string;
  cardTimeWrapperStyle?: string;
  cardTimeStyle?: string;
  cardLocationWrapperStyle?: string;
  cardLocationStyle?: string;
  cardTitleStyle?: string;
  linkStyle?: string;
  cardLinkStyle?: string;
}

interface CardDatas {
  id: number;
  cardLinkHref: string;
  cardImageSrc: string;
  cardImageAlt: string;
}

export interface FirstCardProps {
  cardDatas: CardData;
  cardStyle: CardStyle;
}

export interface SecondaryCardProps {
  cardDatas: CardDatas;
  cardStyle: CardStyle;
}
