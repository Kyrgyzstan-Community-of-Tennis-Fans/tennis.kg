import type { Category } from '@/types/category';
import type { Rating } from '@/types/rating';

export interface Event {
  _id: string;
  category: Category;
  gender: 'male' | 'female';
  link: string;
  rating: Rating;
}

export interface EventMutation {
  rating: string;
  category: string;
  link: string;
}
