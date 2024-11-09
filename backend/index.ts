import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import { carouselRouter } from './src/routes/carousel';
import { categoriesRouter } from './src/routes/categories';
import { eventsRouter } from './src/routes/events';
import { newsRouter } from './src/routes/news';
import { partnersRouter } from './src/routes/partners';
import { ratingMembersRouter } from './src/routes/ratingMembers';
import { ratingsRouter } from './src/routes/ratings';
import { usersRouter } from './src/routes/users';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/ratingMembers', ratingMembersRouter);
app.use('/carousel', carouselRouter);
app.use('/news', newsRouter);
app.use('/categories', categoriesRouter);
app.use('/partners', partnersRouter);
app.use('/ratings', ratingsRouter);
app.use('/events', eventsRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
