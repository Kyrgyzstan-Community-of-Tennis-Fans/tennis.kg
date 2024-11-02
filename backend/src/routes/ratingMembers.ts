import express from 'express';
import {
  createRatingMember,
  deleteRatingMember,
  getRatingMembers,
  updateRatingMember,
  updateRatingMembersCategories,
} from '../controllers/ratingMembers';
import { imagesUpload } from '../utils/multer';

export const ratingMembersRouter = express.Router();

ratingMembersRouter.get('/', getRatingMembers);
ratingMembersRouter.post('/', imagesUpload.single('image'), createRatingMember);
ratingMembersRouter.delete('/:id', deleteRatingMember);
ratingMembersRouter.put('/:id', imagesUpload.single('image'), updateRatingMember);
ratingMembersRouter.patch('/categories', updateRatingMembersCategories);
