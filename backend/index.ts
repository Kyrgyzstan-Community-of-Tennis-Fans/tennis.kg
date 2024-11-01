import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import { categoriesRouter } from './src/routers/categories';
import { usersRouter } from './src/routers/users';
import { newsRouter } from './src/routers/news';
import { carouselRouter } from './src/routers/carousel';
import { partnersRouter } from './src/routers/partners';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/carousel', carouselRouter);
app.use('/news', newsRouter);
app.use('/categories', categoriesRouter);
app.use('/partners', partnersRouter);

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
