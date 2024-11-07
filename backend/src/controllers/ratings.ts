import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { getMonth } from '../lib/getMonth';
import { Rating } from '../model/Rating';

export const fetchRatings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ratings = await Rating.find()
      .populate({
        path: 'events',
        populate: {
          path: 'category',
        },
      })
      .lean()
      .exec();

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
    });

    return res.status(201).send(rating);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).send({
        error: `Запись в ${getMonth(req.body.month, 'ending').toLowerCase()} ${req.body.year} году уже существует!`,
        code: 409,
      });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ error: error.errors });
    }

    return next(error);
  }
};