import { SecondaryCard } from "@/presentation/card/card";
import { SecondaryCardProps } from "@/presentation/card/interface";

const cardDatasArray: SecondaryCardProps["cardDatas"][] = [
  {
    id: 1,
    cardLinkHref: "/",
    cardImageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
    cardImageAlt: "Banner 1",
  },
  {
    id: 2,
    cardLinkHref: "/event-2",
    cardImageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
    cardImageAlt: "Banner 2",
  },
  {
    id: 3,
    cardLinkHref: "/event-2",
    cardImageSrc: "https://placehold.co/600x400/000000/FFFFFF/png",
    cardImageAlt: "Banner 3",
  },
];

const cardStyle = {
  cardLinkStyle: "w-3xs block aspect-[2/1.5] relative",
  cardImageStyle: "object-cover rounded-2xl",
};

function TopEvent() {
  return (
    <div className=" flex flex-row justify-evenly">
      {cardDatasArray.map((card) => (
        <SecondaryCard key={card.id} cardDatas={card} cardStyle={cardStyle} />
      ))}
    </div>
  );
}

export default TopEvent;
