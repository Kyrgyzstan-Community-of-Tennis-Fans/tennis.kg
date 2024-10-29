import express from 'express';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';
import { RatingMember } from '../model/RatingMember';

export const ratingMembersRouter = express.Router();

ratingMembersRouter.get('/', async (_req, res, next) => {
  try {
    const ratingMembers = await RatingMember.find().sort({ place: 1 });

    return res.send(ratingMembers);
  } catch (error) {
    return next(error);
  }
});

ratingMembersRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const { name, gender, place } = req.body;

    const existingEntry = await RatingMember.findOne({ place, gender });

    if (existingEntry) {
      return res.status(400).send(`The place ${place} is already occupied for gender ${gender}.`);
    }

    const existingMember = await RatingMember.findOne({ name });

    if (existingMember) {
      return res.status(400).send({ error: 'Name already exists. Please choose a different name.' });
    }

    const ratingMember = await RatingMember.create({
      name,
      image: req.file ? req.file.filename : null,
      gender,
      place: parseFloat(place),
    });

    return res.send(ratingMember);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

ratingMembersRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const ratingMember = await RatingMember.findById(id);

    if (!ratingMember) {
      return res.status(404).send({ error: 'Rating member not found' });
    }

    await RatingMember.findByIdAndDelete(id);

    return res.send({ message: 'Rating member deleted successfully' });
  } catch (error) {
    next(error);
  }
});
