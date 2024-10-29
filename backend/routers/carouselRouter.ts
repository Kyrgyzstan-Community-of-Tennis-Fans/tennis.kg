import express from 'express';
import {Carousel} from '../model/Carousel';
import {ImagesCarousel} from '../multer';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';

export const carouselRouter = express.Router();

carouselRouter.get('/',async (req,res,next) => {
  try {

    const photos = await Carousel.find();
    return res.send(photos);

  } catch (error) {
    return next(error);
  }

});

carouselRouter.post('/admin-post-image-carousel',auth,permit('admin'),ImagesCarousel.single('image'),async (req,res,next) => {
  try {

    if (!req.file) {
      return res.status(400).send({ error: 'Image field is required' });
    }

    const carousel = await Carousel.create({
      image: req.file ? 'images/imgCarousel/' + req.file.filename : null,
    });

    return res.status(201).send(carousel);
  } catch (error) {
    return next(error);
  }
});

carouselRouter.delete('/admin-delete-image-carousel/:id',auth,permit('admin'),async (req,res,next) => {
  try {
    const id = req.params.id;
    await Carousel.deleteOne({ _id: id });
    return res.status(200).send({ message: 'Image deleted successfully' });

  } catch (error) {
    return next(error)
  }
});
