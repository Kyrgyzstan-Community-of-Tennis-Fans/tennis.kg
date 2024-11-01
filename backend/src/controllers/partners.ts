import {Partner} from "../model/Partner";
import {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";

export const getPartners = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const partners = await Partner.find();

    return res.send(partners);
  } catch (error) {
    return next(error);
  }
};

export const createNewPartner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const partner = await Partner.create({
      name: req.body.name,
      url: req.body.url,
      image: req.file ? req.file.filename : null,
    });

    return res.send(partner);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) return res.status(400).send(error);
    return next(error);
  }
};

export const removePartner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: _id } = req.params;

    const partner = await Partner.findOne({ _id });
    if (!partner) return res.status(404).send({ error: 'Not found' });

    await Partner.deleteOne({ _id });
    return res.status(204).send({ message: 'Partner removed successfully' });
  } catch (error) {
    return next(error);
  }
}