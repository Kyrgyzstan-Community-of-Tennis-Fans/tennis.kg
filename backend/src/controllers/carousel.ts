import { Carousel } from '../model/Carousel';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import config from '../../config';
import compressImage from '../utils/compressImage';
import { clearImages } from '../utils/multer';

export const getCarousel = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const photos = await Carousel.find();
    return res.send(photos);
  } catch (error) {
    return next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) return res.status(400).send({ error: 'Image field is required' });

    const imagePath = path.join(config.publicPath, 'images', 'imgCarousel', req.file.filename);
    await compressImage(imagePath);

    const carousel = await Carousel.create({
      image: req.file ? 'images/imgCarousel/' + req.file.filename : null,
    });

    return res.status(201).send(carousel);
  } catch (error) {
    return next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await Carousel.countDocuments();

    if (count <= 2) {
      return res
        .status(400)
        .send({ error: 'Не удается удалить изображение. В карусели должно быть не менее 2 изображений.' });
    }

    const id = req.params.id;
    const carouselImage = await Carousel.findById(id);

    if (!carouselImage) {
      return res.status(404).send({ error: 'Изображение не найдено!' });
    }

    const result = await Carousel.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      clearImages(carouselImage.image);
    }

    return res.status(200).send({ message: 'Image deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!req.file) return res.status(400).send({ error: 'Image field is required' });

    const carouselItem = await Carousel.findById(id);

    if (!carouselItem) return res.status(404).send({ error: 'Image not found' });

    const imagePath = path.join(config.publicPath, 'images', 'imgCarousel', req.file.filename);
    await compressImage(imagePath);

    const oldImagePath = carouselItem.image;

    carouselItem.image = 'images/imgCarousel/' + req.file.filename;
    await carouselItem.save();

    if (carouselItem.image !== oldImagePath) {
      clearImages(oldImagePath);
    }

    return res.status(200).send({ message: 'Image updated successfully', carouselItem });
  } catch (error) {
    return next(error);
  }
};
