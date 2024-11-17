import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RewardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Reward = mongoose.model('Reward', RewardSchema);
