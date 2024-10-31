import express from 'express';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getOneCategory,
  updateCategory
} from "../controllers/categoriesControllers";

export const categoriesRouter = express.Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.post('/', auth, permit('admin'), createCategory);
categoriesRouter.delete('/:id', auth, permit('admin'), deleteCategory);
categoriesRouter.put('/:id', auth, permit('admin'),updateCategory);
categoriesRouter.get('/:id', getOneCategory);
