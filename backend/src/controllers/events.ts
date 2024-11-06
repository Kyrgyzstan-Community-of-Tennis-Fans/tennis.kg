import type { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Event } from '../model/Event';
import { Rating } from '../model/Rating';

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await Event.create({
      rating: req.body.rating,
      category: req.body.category,
      gender: req.body.gender,
      link: req.body.link,
    });

    await Rating.findByIdAndUpdate(req.body.rating, { $push: { events: event._id } }, { new: true });

    return res.status(201).send(event);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ error: error.errors });
    }

    return next(error);
  }
};
