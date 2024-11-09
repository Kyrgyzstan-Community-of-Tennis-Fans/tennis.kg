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
    const { name, gender, place, ratingType } = req.body;

    const maxParticipants = getMaxParticipants(ratingType);
    if (maxParticipants === null) {
      return res.status(400).send({ error: 'Неверный тип рейтинга' });
    }

    const participantCount = await RatingMember.countDocuments({ ratingType });
    if (participantCount >= maxParticipants) {
      return res
        .status(400)
        .send({ error: `В данном топе уже максимальное количество участников (${maxParticipants})` });
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
    const { name, ratingType } = req.body;

    const existingMember = await findRatingMemberById(id, res);
    if (!existingMember) return;

    const maxParticipants = getMaxParticipants(ratingType);
    if (maxParticipants === null) {
      return res.status(400).send({ error: 'Неверный тип рейтинга' });
    }

    const participantCount = await RatingMember.countDocuments({ ratingType });
    if (participantCount >= maxParticipants && ratingType !== existingMember.ratingType) {
      return res
        .status(400)
        .send({ error: `В данном топе уже максимальное количество участников (${maxParticipants})` });
    }

    if (name && name !== existingMember.name) {
      const existingName = await RatingMember.findOne({ name });
      if (existingName) {
        return res.status(400).send({ error: 'Данное имя уже занято!' });
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

    const hasAnyMember = await RatingMember.exists({});

    if (!hasAnyMember) {
      return res.status(400).send({ error: 'Добавьте хотя бы одного участника в рейтинг перед изменением категорий' });
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

const findRatingMemberById = async (id: string, res: Response) => {
  const member = await RatingMember.findById(id);
  if (!member) {
    res.status(404).send({ error: 'Rating member not found' });
    return null;
  }
  return member;
};

function getMaxParticipants(ratingType: string): number | null {
  switch (ratingType) {
    case 'mensTop8':
      return 8;
    case 'mensTop3':
    case 'womensTop3':
      return 3;
    default:
      return null;
  }
}
