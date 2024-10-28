import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import { Rank } from '../model/Rank';

export const ranksRouter = express.Router();

ranksRouter.get('/', async (_, res, next) => {
  try {
    const ranks = await Rank.find();

    return res.send(ranks);
  } catch (error) {
    return next(error);
  }
});

ranksRouter.post('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const { name } = req.body;

    const rank = new Rank({
      name,
    });
    await rank.save();

    return res.send(rank);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});
