import type { Category } from '@/types/categoryTypes';
import type { Rating } from '@/types/ratingTypes';

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
  gender: 'male' | 'female';
  link: string;
}
