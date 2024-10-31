import {Category} from "../../model/Category";
import {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ranks = await Category
      .find()
      .lean()
      .exec()
    // Старайтесь использовать вот подобные функции.
    // Это нужно чтоб облегчить данные. То есть если вам не нужно как-то изменять то, что вы достаете из базы,
    // то вам вернется просто массив объектов, а не полные монгусовские объекты с функциями и доп ключами.
    // но так делать только если вам не нужно ничего изменять с данными. Для delete или put запросов не сработает

    return res.send(ranks);
  } catch (error) {
    return next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const rank = new Category({ name });
    await rank.save();

    // const rank = await Category.create({ name });
    // Можно еще вот так создавать. Так отрабатывать будет чуть чуть быстрее. Хотя у вас небольшие сущности, так что наверн можно и забить.

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

    // Не забудьте добавить проверку на связанные сущности. Везеде. Если есть, то удаление запрещено (ну или уточните у казазчицы)
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

    const rank = await Category
      .findById(req.params.id)
      .select({ name: 1 })

    // вот в такие моменты тоже почему бы не облегчить объект. Если надо изменить только имя, то нет смысла брать все поля.
    // понятное дело, что у вас категории итак только с одним ключом, но это я так как для примера показал.

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