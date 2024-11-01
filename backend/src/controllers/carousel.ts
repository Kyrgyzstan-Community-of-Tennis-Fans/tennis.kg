import { Carousel } from '../model/Carousel';
import { Request, Response, NextFunction } from 'express';

export const getCarousel = async (req: Request, res: Response, next: NextFunction) => {
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
    await Carousel.deleteOne({ _id: id });
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

    carouselItem.image = 'images/imgCarousel/' + req.file.filename;
    await carouselItem.save();

    return res.status(200).send({ message: 'Image updated successfully', carouselItem });
  } catch (error) {
    return next(error);
  }
};
