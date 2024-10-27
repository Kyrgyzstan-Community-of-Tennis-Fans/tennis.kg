import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import { ranksRouter } from './routers/ranks';
import { usersRouter } from './routers/users';

const app = express();
const port = 8030;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/ranks', ranksRouter);

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
