import type { Category } from '@/types/categoryTypes';

export interface Event {
  _id: string;
  category: Category;
  gender: string;
  link: string;
}
