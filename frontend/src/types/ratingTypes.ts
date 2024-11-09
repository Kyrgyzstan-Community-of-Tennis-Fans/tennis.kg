import { Event } from './eventTypes';

export interface Rating {
  _id: string;
  chapter: 'male' | 'female' | 'mixed';
  year: number;
  month: string;
  events: Event[];
}

export interface RatingMutation {
  year: string;
  month: string;
  chapter: string;
}
