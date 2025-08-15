type EventCardApiResponse = {
  id: number;
  image: string;
  imageSrc?: string;
  eventCategory: { name: string; };
  start_date: string;
  start_time: string;
  location: string;
  title: string;
};
