import { model, Schema } from 'mongoose';
import { NewsFields } from '../types';

const NewsSchema = new Schema<NewsFields>(
  {
    title: {
      type: String,
      required: [true, 'Введите заголовок новости!'],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const News = model('News', NewsSchema);

export default News;
