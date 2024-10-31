import mongoose from 'mongoose';
import { RatingMemberFields } from '../types';

const Schema = mongoose.Schema;

const RatingMemberSchema = new Schema<RatingMemberFields>(
  {
    name: {
      type: String,
      required: [true, 'Имя, это обязательное поле!'],
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      required: [true, 'Изображение, это обязательное поле!'],
    },
    gender: {
      type: String,
      required: [true, 'Пол, это обязательное поле!'],
      enum: ['male', 'female'],
    },
    place: {
      type: Number,
      required: [true, 'Выберите место!'],
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
    },
  },
  { timestamps: true }
);

export const RatingMember = mongoose.model('RatingMember', RatingMemberSchema);
