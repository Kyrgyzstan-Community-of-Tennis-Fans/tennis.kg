import { NextFunction, Request, Response, Router } from 'express';
import { Error, Types } from 'mongoose';
import { permit } from '../middleware/permit';
import { auth } from '../middleware/auth';
import News from '../model/News';

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
    const news = await News.find();
    return res.send(news);
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
    const newsById = await News.findById(newsId);

    if (!newsById) {
      return res.status(404).send({ error: 'Новость не найдена!' });
    }

    return res.send(newsById);
  } catch (e) {
    return next(e);
  }
});

export default newsRouter;
