import express from 'express';
import { Partner } from '../model/Partner';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';

export const partnersRouter = express.Router();

partnersRouter.get('/', async (_, res, next) => {
  try {
    const partners = await Partner.find();

    return res.send(partners);
  } catch (error) {
    return next(error);
  }
});

partnersRouter.post('/', auth, permit('admin'), imagesUpload.single('image'), async (req, res, next) => {
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

partnersRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
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

partnersRouter.put('/:id', auth, permit('admin'), imagesUpload.single('image'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, url } = req.body;

    const partner = await Partner.findById(id);
    if (!partner) return res.status(404).send({ error: 'Not found' });

    const partnerData = {
      name: name || partner.name,
      url: url || partner.url,
      image: req.file?.filename || req.body.image
    };

    const updatedPartner = await Partner.findByIdAndUpdate(id, partnerData, { new: true, runValidators: true });

    if (!updatedPartner) return res.status(404).send({ error: 'Partner not found or failed to update' });

    return res.send(updatedPartner);
  } catch (e) {
    next(e);
  }
});

partnersRouter.get('/:id', async (req, res, next) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (!partner) {
      return res.status(404).send({ message: 'Partner not found' });
    }

    return res.send(partner);
  } catch (error) {
    return next(error);
  }
});
