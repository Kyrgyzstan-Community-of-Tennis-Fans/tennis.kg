import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import { Category } from '../model/Category';

export const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const ranks = await Category.find();

    return res.send(ranks);
  } catch (error) {
    return next(error);
  }
});

categoriesRouter.post('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const { name } = req.body;

    const rank = new Category({
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
