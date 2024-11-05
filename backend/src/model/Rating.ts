import mongoose from 'mongoose';
import { Category } from './Category';

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  category: {
    type: String,
    ref: 'Category',
    required: true,
    
    validate: {
      validator: async function (value: string) {
        const category = await Category.findOne({ _id: value });
        
        return !!category;
      },
      message: 'Category does not exist',
    }
  },
  month: {
    type: String,
    enum: [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ],
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  link: {
    type: String,
    required: true,
  }
});

export const Rating = mongoose.model('Rating', RatingSchema);