import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Rating } from '../model/Rating';

export const fetchRatings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ratings = await Rating.find().populate('category', 'name').lean().exec();

    return res.send(ratings);
  } catch (error) {
    return next(error);
  }
};

export const createRating = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rating = await Rating.create({
      category: req.body.category,
      month: req.body.month,
      year: req.body.year,
      gender: req.body.gender,
      link: req.body.link,
    });

    return res.status(201).send(rating);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ error: error.errors });
    }
    return next(error);
  }
};
