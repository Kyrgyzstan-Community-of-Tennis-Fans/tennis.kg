import mongoose, { HydratedDocument } from 'mongoose';
import { PartnerFields } from '../types';

const Schema = mongoose.Schema;

const PartnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Partner = mongoose.model('Partner', PartnerSchema);
