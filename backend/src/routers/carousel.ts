import express from 'express';
import { ImagesCarousel } from '../utils/multer';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import {create, getCarousel, remove, update} from "../controllers/carousel";

export const carousel = express.Router();

carousel.get('/', getCarousel);

carousel.post(
  '/admin-post-image-carousel',
  auth,
  permit('admin'),
  ImagesCarousel.single('image'),
  create
);

carousel.delete('/admin-delete-image-carousel/:id', auth, permit('admin'), remove);

carousel.put(
  '/admin-update-image-carousel/:id',
  auth,
  permit('admin'),
  ImagesCarousel.single('image'),
  update
);
