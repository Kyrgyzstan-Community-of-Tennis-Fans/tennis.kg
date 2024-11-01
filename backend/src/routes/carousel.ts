import express from 'express';
import { ImagesCarousel } from '../utils/multer';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import { create, getCarousel, remove, update } from '../controllers/carousel';

export const carouselRouter = express.Router();

carouselRouter.get('/', getCarousel);

carouselRouter.post('/admin-post-image-carousel', auth, permit('admin'), ImagesCarousel.single('image'), create);

carouselRouter.delete('/admin-delete-image-carousel/:id', auth, permit('admin'), remove);

carouselRouter.put('/admin-update-image-carousel/:id', auth, permit('admin'), ImagesCarousel.single('image'), update);
