import mongoose, { HydratedDocument } from 'mongoose';
import { PartnerFields } from '../types';

const Schema = mongoose.Schema;

const PartnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (value: string): Promise<boolean> {
          if (!(this as unknown as HydratedDocument<PartnerFields>).isModified('name')) {
            return true;
          }
          const partner = await Partner.findOne({ name: value });
          return !partner;
        },
        message: 'Такой партнер уже есть',
      },
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
