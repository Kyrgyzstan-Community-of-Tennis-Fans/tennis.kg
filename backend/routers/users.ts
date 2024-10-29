import express from 'express';
import mongoose from 'mongoose';
import { auth, type RequestWithUser } from '../middleware/auth';
import { User } from '../model/User';
import { imagesUpload } from '../multer';

export const usersRouter = express.Router();

usersRouter.get('/', async (_, res, next) => {
  try {
    const users = await User.find();

    return res.send(users);
  } catch (error) {
    return next(error);
  }
});

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    const { rank, fullName, telephone, dateOfBirth, gender, password } = req.body;

    const user = new User({
      rank,
      fullName,
      telephone,
      dateOfBirth,
      gender,
      password,
      avatar: req.file ? req.file.filename : null,
    });

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send({ error: 'Username not found!' });
    }

    if (!req.body.password) {
      return res.status(400).send({ error: 'Password is required!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Телефон или пароль не верный!' });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete('/sessions', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized!' });
    }

    req.user.generateToken();
    await req.user.save();

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});
