import express from 'express';
import { Partner } from '../model/Partner';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';

export const partnersRouter = express.Router();

partnersRouter.get('/', async (req, res, next) => {
  try {
    const partners = await Partner.find();

    return res.send(partners);
  } catch (error) {
    return next(error);
  }
});

partnersRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const partner = await Partner.create({
      name: req.body.name,
      url: req.body.url,
      image: req.file ? req.file.filename : null,
    });

    return res.send(partner);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

partnersRouter.delete('/:id', async (req, res, next) => {
  try {
    const partner = await Partner.findOne({ _id: req.params.id });
    if (!partner) {
      return res.status(404).send({ error: 'Not found' });
    }
    await Partner.deleteOne({ _id: req.params.id });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});
