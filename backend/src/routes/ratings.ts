import express from 'express';
import { createRating, fetchRatings } from '../controllers/ratings';

export const ratingsRouter = express.Router();

ratingsRouter.get('/', fetchRatings);
ratingsRouter.post('/', createRating);