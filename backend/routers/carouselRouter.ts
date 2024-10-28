import express from 'express';
import {Carousel} from '../model/Carousel';
import {imagesUpload} from '../multer';

export const carouselRouter = express.Router();

carouselRouter.get('/',async (req,res,next) => {
  try {

    const photos = await Carousel.find();
    return res.send(photos);

  } catch (error) {
    return next(error);
  }

});

carouselRouter.post('/',imagesUpload.single('image'),async (req,res,next) => {
  try {

    if (!req.file) {
      return res.status(400).send({ error: 'Image field is required' });
    }

    const carousel = await Carousel.create({
      image:req.file ? req.file.filename : null,
    });

    return res.status(201).send(carousel);
  } catch (error) {
    return next(error);
  }
});
