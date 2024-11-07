import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    month: {
      type: String,
      enum: [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
      ],
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    events: {
      type: [Schema.Types.ObjectId],
      ref: 'Event',
    },
  },
  { timestamps: true }
);

RatingSchema.index({ month: 1, year: 1 }, { unique: true });

export const Rating = mongoose.model('Rating', RatingSchema);
