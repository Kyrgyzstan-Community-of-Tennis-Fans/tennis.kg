import { NextFunction, Request, Response } from 'express';
import { RatingMember } from '../model/RatingMember';
import mongoose from 'mongoose';

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
    const { name, gender, place } = req.body;

    const existingEntry = await RatingMember.findOne({ place, gender });
    const genderText = gender === 'male' ? 'мужской' : 'женский';

    if (existingEntry) {
      return res.status(400).send({ error: `Место ${place} уже занято для пола ${genderText}` });
    }

    const existingMember = await RatingMember.findOne({ name });

    if (existingMember) {
      return res.status(400).send({ error: 'Данное имя уже занято!' });
    }

    const ratingMember = await RatingMember.create({
      name,
      image: req.file ? req.file.filename : null,
      gender,
      place: parseFloat(place),
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

    const ratingMember = await RatingMember.findById(id);

    if (!ratingMember) {
      return res.status(404).send({ error: 'Rating member not found' });
    }

    await RatingMember.findByIdAndDelete(id);

    return res.send({ message: 'Rating member deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateRatingMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, place, gender } = req.body;

    const existingMember = await RatingMember.findById(id);

    if (!existingMember) {
      return res.status(404).send({ error: 'Rating member not found' });
    }

    const newPlace = Number(place);
    const genderText = gender === 'male' ? 'мужской' : 'женский';

    if (name && name !== existingMember.name) {
      const existingName = await RatingMember.findOne({ name });
      if (existingName) {
        return res.status(400).send({ error: 'Данное имя уже занято!' });
      }
    }

    if (newPlace && newPlace !== existingMember.place) {
      const existingEntry = await RatingMember.findOne({ place: newPlace, gender });
      if (existingEntry) {
        return res.status(400).send({ error: `Место ${place} уже занято для пола ${genderText}` });
      }
    }

    if (gender !== existingMember.gender) {
      const conflictingEntry = await RatingMember.findOne({ place: existingMember.place, gender });
      if (conflictingEntry) {
        return res.status(400).send({ error: `Место ${existingMember.place} уже занято для пола ${genderText}` });
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
    const { mensRatingCategory, womensRatingCategory } = req.body;

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
        mensRatingCategory: mensRatingCategory,
        womensRatingCategory: womensRatingCategory,
      }
    );

    res.send({ message: 'Категории рейтингов успешно обновлены' });
  } catch (error) {
    next(error);
  }
};
