import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import { categoriesRouter } from './routers/categories';
import { usersRouter } from './routers/users';
import { ratingMembersRouter } from './routers/mainRatings';
import { partnersRouter } from './routers/partners';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/ratingMembers', ratingMembersRouter);
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
