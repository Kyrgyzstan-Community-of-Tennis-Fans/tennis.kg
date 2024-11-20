export interface Carousel {
  _id: string;
  image: string | null;
  video?: string | null;
  createdAt: string;
}

export interface CarouselMutation {
  image: string | null;
  video?: string | null;
}
