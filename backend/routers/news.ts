import { NextFunction, Request, Response, Router } from 'express';
import { Error, Types } from 'mongoose';
import { permit } from '../middleware/permit';
import { auth } from '../middleware/auth';
import News from '../model/News';
import { format } from 'date-fns/format';

const newsRouter = Router();

newsRouter.post('/', auth, permit('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, subtitle, content } = req.body;

    const newsData = {
      title,
      subtitle,
      content,
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
});

newsRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await News.find().lean();
    const formattedNews = news.map((item) => ({
      ...item,
      createdAt: format(item.createdAt, 'dd.MM.yyyy HH:mm'),
      updatedAt: format(item.updatedAt, 'dd.MM.yyyy HH:mm'),
    }));

    return res.send(formattedNews);
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
      createdAt: format(newsById.createdAt, 'dd.MM.yyyy HH:mm'),
      updatedAt: format(newsById.updatedAt, 'dd.MM.yyyy HH:mm'),
    };

    return res.send(formattedNews);
  } catch (e) {
    return next(e);
  }
});

export default newsRouter;
