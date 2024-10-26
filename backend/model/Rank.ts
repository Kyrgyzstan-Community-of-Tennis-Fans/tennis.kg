import mongoose, { type HydratedDocument } from 'mongoose';
import type { RankFields, UserFields } from '../types';
import { User } from './User';

const Schema = mongoose.Schema;

const RankSchema = new Schema<RankFields>({
  name: {
    type: String,
    required: true,
    unique: true,

    validate: {
      validator: async function (value: string): Promise<boolean> {
        if (!(this as HydratedDocument<RankFields>).isModified('name')) {
          return true;
        }

        const rank = await Rank.findOne({ name: value });
        return !rank;
      },
      message: 'A rank with this name already exists',
    },
  },
});

export const Rank = mongoose.model('Rank', RankSchema);
