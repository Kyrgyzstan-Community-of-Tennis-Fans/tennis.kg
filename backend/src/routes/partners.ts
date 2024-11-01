import express from 'express';
import { imagesUpload } from '../utils/multer';
import { createNewPartner, getPartners, removePartner } from '../controllers/partners';

export const partnersRouter = express.Router();

partnersRouter.get('/', getPartners);
partnersRouter.post('/', imagesUpload.single('image'), createNewPartner);
partnersRouter.delete('/:id', removePartner);
