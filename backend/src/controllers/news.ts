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

export const updateNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({ error: 'Неправильный id!' });
    }

    const id = new Types.ObjectId(req.params.id);
    const { title, subtitle, content, newsCover } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const existingNews = await News.findById(id);
    if (!existingNews) {
      return res.status(404).send({ error: 'Новость не найдена!' });
    }

    const updatedNewsCover =
      files['newsCover'] && files['newsCover'][0]
        ? files['newsCover'][0].filename
        : newsCover || existingNews.newsCover;

    const updatedImages = [
      ...(existingNews.images || []),
      ...(files['images'] ? files['images'].map((file) => file.filename) : []),
    ];

    const newsData = {
      title: title || existingNews.title,
      subtitle: subtitle || existingNews.subtitle,
      content: content || existingNews.content,
      newsCover: updatedNewsCover,
      images: updatedImages,
    };

    const updatedNews = await News.findByIdAndUpdate(id, newsData, { new: true, runValidators: true });

    if (!updatedNews) return res.status(404).send({ error: 'News not found or failed to update!' });

    return res.send(updatedNews);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
};

export const removeNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({ error: 'Неправильный тип id!' });
    }

    const result = await News.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).send({ error: 'Новость не найдена!' });
    }
    return res.send({ message: 'Новость успешно удалена!' });
  } catch (e) {
    return next(e);
  }
};
