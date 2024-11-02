import { NextFunction, Request, Response } from 'express';
import { News } from '../model/News';
import { Error, Types } from 'mongoose';
import { format } from 'date-fns/format';
import { isValid, parseISO } from 'date-fns';

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

export const getNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dateFormat = 'dd.MM.yyyy';
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 12;
    const startIndex = (page - 1) * limit;
    const dateFilter: { createdAt?: { $gte: Date; $lte: Date } } = {};

    if (req.query.startDate && req.query.endDate) {
      const startDate = parseISO(req.query.startDate as string);
      const endDate = parseISO(req.query.endDate as string);

      if (isValid(startDate) && isValid(endDate)) {
        dateFilter.createdAt = { $gte: startDate, $lte: endDate };
      }
    }

    const news = await News.find(dateFilter).sort({ createdAt: -1 }).skip(startIndex).limit(limit).lean();

    const formattedNews = news.map((item) => ({
      ...item,
      createdAt: format(item.createdAt, dateFormat),
      updatedAt: format(item.updatedAt, dateFormat),
    }));

    const total = await News.countDocuments(dateFilter);
    const pages = limit > 0 ? Math.ceil(total / limit) : null;

    return res.send({ page, limit, total, pages, data: formattedNews });
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
