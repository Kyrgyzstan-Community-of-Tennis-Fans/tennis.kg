import { NextFunction, Request, Response, Router } from 'express';
import { Error, Types } from 'mongoose';
import { permit } from '../middleware/permit';
import { auth } from '../middleware/auth';
import News from '../model/News';
import { format } from 'date-fns/format';
import { imagesUpload } from '../multer';

const newsRouter = Router();

newsRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.fields([
    { name: 'newsCover', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, subtitle, content } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const newsData = {
        title,
        subtitle,
        content,
        newsCover: files['newsCover'] && files['newsCover'][0] ? files['newsCover'][0].filename : '',
        images: files['images'] ? files['images'].map((file) => file.filename) : [],
      };

      const news = new News(newsData);
      await news.save();

      return res.send(news);
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        return res.status(422).send(e);
      }

      return next(e);
    }
  }
);

newsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 4;
    const startIndex = (page - 1) * limit;
    const total = await News.countDocuments();

    const news = await News.find().sort({ createdAt: -1 }).skip(startIndex).limit(limit).lean();
    const formattedNews = news.map((item) => ({
      ...item,
      createdAt: format(item.createdAt, 'dd.MM.yyyy'),
      updatedAt: format(item.updatedAt, 'dd.MM.yyyy'),
    }));

    const pages = limit > 0 ? Math.ceil(total / limit) : null;
    return res.send({ page, limit, total, pages, data: formattedNews });
  } catch (e) {
    return next(e);
  }
});

newsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({ error: 'Неправильный тип id!' });
    }

    const newsId = new Types.ObjectId(req.params.id);
    const newsById = await News.findById(newsId).lean();

    if (!newsById) {
      return res.status(404).send({ error: 'Новость не найдена!' });
    }

    const formattedNews = {
      ...newsById,
      createdAt: format(newsById.createdAt, 'dd.MM.yyyy'),
      updatedAt: format(newsById.updatedAt, 'dd.MM.yyyy'),
    };

    return res.send(formattedNews);
  } catch (e) {
    return next(e);
  }
});

export default newsRouter;
