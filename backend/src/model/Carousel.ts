import mongoose from 'mongoose';
import { CarouselFields } from '../types/carousel';

const Schema = mongoose.Schema;

const CarouselSchema = new Schema<CarouselFields>(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Carousel = mongoose.model('Carousel', CarouselSchema);
