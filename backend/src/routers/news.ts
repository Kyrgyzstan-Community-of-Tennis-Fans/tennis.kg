import { Router } from 'express';
import { permit } from '../middleware/permit';
import { auth } from '../middleware/auth';
import { imagesUpload } from '../utils/multer';
import {createNewPost, getById, getNews} from "../controllers/news";

export const newsRouter = Router();

newsRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.fields([
    { name: 'newsCover', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  createNewPost
);
newsRouter.get('/', getNews);
newsRouter.get('/:id', getById);