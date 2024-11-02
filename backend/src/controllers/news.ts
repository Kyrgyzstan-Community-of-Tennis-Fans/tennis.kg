import { NextFunction, Request, Response } from 'express';
import News from '../model/News';
import { Error, Types } from 'mongoose';
import { format } from 'date-fns/format';

export const createNewPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, subtitle, content } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const news = await News.create({
      title,
      subtitle,
      content,
      newsCover: files['newsCover'] && files['newsCover'][0] ? files['newsCover'][0].filename : '',
      images: files['images'] ? files['images'].map((file) => file.filename) : [],
    });

    return res.send(news);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
};

export const getNews = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await News.find().lean();
    const formattedNews = news.map((item) => ({
      ...item,
      createdAt: format(item.createdAt, 'dd.MM.yyyy'),
      updatedAt: format(item.updatedAt, 'dd.MM.yyyy'),
    }));

    return res.send(formattedNews);
  } catch (e) {
    return next(e);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) return res.status(404).send({ error: 'Неправильный тип id!' });

    const newsId = new Types.ObjectId(id);
    const newsById = await News.findById(newsId).lean();

    if (!newsById) return res.status(404).send({ error: 'Новость не найдена!' });

    const formattedNews = {
      ...newsById,
      createdAt: format(newsById.createdAt, 'dd.MM.yyyy'),
      updatedAt: format(newsById.updatedAt, 'dd.MM.yyyy'),
    };

    return res.send(formattedNews);
  } catch (e) {
    return next(e);
  }
};
