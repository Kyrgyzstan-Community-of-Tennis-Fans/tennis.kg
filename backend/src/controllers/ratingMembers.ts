import { NextFunction, Request, Response } from 'express';
import { RatingMember } from '../model/RatingMember';
import mongoose from 'mongoose';
import { findRatingMemberById, isPlaceAllowed } from '../utils/utils';

export const getRatingMembers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const ratingMembers = await RatingMember.find().sort({ place: 1 });

    return res.send(ratingMembers);
  } catch (error) {
    return next(error);
  }
};

export const createRatingMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, gender, place, ratingType } = req.body;
    const genderText = gender === 'male' ? 'мужского' : 'женского';

    const isAllowed = await isPlaceAllowed(place, gender, ratingType);
    if (!isAllowed) {
      return res.status(400).send({ error: `Место ${place} уже занято для ${genderText} рейтинга данного топа` });
    }

    const existingMember = await RatingMember.findOne({ name });

    if (existingMember) {
      return res.status(400).send({ error: 'Данное имя уже занято!' });
    }

    const ratingMember = await RatingMember.create({
      name,
      image: req.file ? req.file.filename : null,
      gender,
      place,
      ratingType,
    });

    return res.send(ratingMember);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
};

export const deleteRatingMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const existingMember = await findRatingMemberById(id, res);
    if (!existingMember) return;

    await RatingMember.findByIdAndDelete(id);

    return res.send({ message: 'Rating member deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateRatingMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, place, gender, ratingType } = req.body;
    const genderText = gender === 'male' ? 'мужского' : 'женского';
    const newPlace = Number(place);

    const existingMember = await findRatingMemberById(id, res);
    if (!existingMember) return;

    if (name && name !== existingMember.name) {
      const existingName = await RatingMember.findOne({ name });
      if (existingName) {
        return res.status(400).send({ error: 'Данное имя уже занято!' });
      }
    }

    if (newPlace && newPlace !== existingMember.place) {
      const allowed = await isPlaceAllowed(newPlace, gender, ratingType);
      if (!allowed) {
        return res.status(400).send({ error: `Место ${place} уже занято для ${genderText} рейтинга данного топа` });
      }
    }

    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedRatingMember = await RatingMember.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedRatingMember) {
      return res.status(404).send({ error: 'Rating member not found' });
    }

    return res.send({ message: 'Rating member edited successfully', updatedRatingMember });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
};

export const updateRatingMembersCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mensRatingCategoryTop8, mensRatingCategoryTop3, womensRatingCategoryTop3 } = req.body;

    const hasMale = await RatingMember.exists({ gender: 'male' });
    const hasFemale = await RatingMember.exists({ gender: 'female' });

    if (!hasMale || !hasFemale) {
      return res
        .status(400)
        .send({ error: 'Добавьте хотя бы одного мужчину и одну женщину в рейтинг перед изменением категорий' });
    }

    await RatingMember.updateMany(
      {},
      {
        mensRatingCategoryTop8,
        mensRatingCategoryTop3,
        womensRatingCategoryTop3,
      }
    );

    res.send({ message: 'Категории рейтингов успешно обновлены' });
  } catch (error) {
    next(error);
  }
};
