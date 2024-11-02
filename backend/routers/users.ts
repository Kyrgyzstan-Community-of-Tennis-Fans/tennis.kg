import express from 'express';
import mongoose from 'mongoose';
import { auth, type RequestWithUser } from '../middleware/auth';
import { User } from '../model/User';
import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';

export const usersRouter = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tenniskslt@gmail.com',
    pass: 'lwkf dumc iqyr rnoq',
  },
});

usersRouter.post('/', async (req, res, next) => {
  try {
    const { email, category, fullName, telephone, dateOfBirth, gender, password } = req.body;

    const user = await User.create({
      category,
      fullName,
      telephone,
      dateOfBirth,
      gender,
      password,
      email,
    });

    user.generateToken();
    await user.save();

    const newUser = await User.findOne({ _id: user.id }).populate('category', 'name');

    return res.send(newUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ telephone: req.body.telephone }).populate('category', 'name');

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

usersRouter.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: 'Пользователь с таким email не найден' });
    }

    const token = randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${token}`;
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Сброс пароля',
      text:
        `Вы получили это письмо, потому что вы запросили сброс пароля для вашего аккаунта\n\n` +
        `Пожалуйста, перейдите по следующей ссылке, чтобы сбросить ваш пароль:\n\n` +
        `${resetUrl}\n\n` +
        `Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо`,
    };

    await transporter.sendMail(mailOptions);
    return res.send({ message: 'Ссылка для сброса пароля отправлена на ваш email' });
  } catch (error) {
    return next(error);
  }
});

usersRouter.post('/reset-password/:token', async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({ error: 'Некорректный или истёкший токен' });
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();
    return res.send({ message: 'Пароль успешно сброшен' });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('category');

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    return res.send(user);
  } catch (error) {
    return next(error);
  }
});

usersRouter.put('/update-info', auth, async (req: RequestWithUser, res, next) => {
  try {
    const { fullName, telephone, dateOfBirth, category, gender, email } = req.body;

    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized!' });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found!' });
    }

    if (fullName) user.fullName = fullName;
    if (telephone) user.telephone = telephone;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (category) user.category = category;
    if (gender) user.gender = gender;
    if (email) user.email = email;

    await user.save();

    res.send(user);
  } catch (error) {
    return next(error);
  }
});
