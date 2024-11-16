import mongoose from 'mongoose';
import { TournamentFields } from '../../types';

const Schema = mongoose.Schema;

const TournamentSchema = new Schema<TournamentFields>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    participants: {
      type: Number,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    rank: {
      type: String,
      required: true,
      enum: ['male', 'female', 'mixed'],
    },
    regulationsDoc: {
      type: String,
    },
    resultsLink: {
      type: String,
      required: true,
    },
    registrationLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Tournament = mongoose.model('Tournament', TournamentSchema);