import mongoose from 'mongoose';
import { RatingMemberFields } from '../../types';

const Schema = mongoose.Schema;

const RatingMemberSchema = new Schema<RatingMemberFields>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    place: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    mensRatingCategory: {
      type: String,
      default: 'Здесь будет мужская категория',
    },
    womensRatingCategory: {
      type: String,
      default: 'Здесь будет женская категорияг',
    },
  },
  { timestamps: true }
);

export const RatingMember = mongoose.model('RatingMember', RatingMemberSchema);
