import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CarouselSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const Carousel = mongoose.model('Carousel',CarouselSchema);