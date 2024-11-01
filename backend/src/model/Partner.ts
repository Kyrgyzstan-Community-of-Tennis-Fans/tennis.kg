import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PartnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
