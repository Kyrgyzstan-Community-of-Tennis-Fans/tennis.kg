import express from 'express';
import { createEvent } from '../controllers/events';

export const eventsRouter = express.Router();

eventsRouter.post('/', createEvent);
