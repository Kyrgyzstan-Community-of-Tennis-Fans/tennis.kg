import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Category } from '../model/Category';

export const getCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const ranks = await Category.find().lean().exec();

    return res.send(ranks);
  } catch (error) {
    return next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const rank = await Category.create({ name });
    await rank.save();

    return res.send(rank);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) return res.status(400).send(error);

    return next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rank = await Category.findById(req.params.id);

    if (!rank) return res.status(404).send({ message: 'Category not found' });

    await rank.deleteOne();

    return res.send({ message: 'Category deleted' });
  } catch (error) {
    return next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const isExist = await Category.findOne({ name });

    if (isExist) return res.status(400).send({ message: 'Category already exists' });

    const rank = await Category.findById(req.params.id).select({ name: 1 });

    if (!rank) return res.status(404).send({ message: 'Category not found' });

    rank.name = name;
    await rank.save();

    return res.send(rank);
  } catch (error) {
    return next(error);
  }
};

export const getOneCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rank = await Category.findById(req.params.id);
    if (!rank) return res.status(404).send({ message: 'Category not found' });

    return res.send(rank);
  } catch (error) {
    return next(error);
  }
};
