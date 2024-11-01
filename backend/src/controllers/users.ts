import { User } from '../model/User';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { type RequestWithUser } from '../middleware/auth';
import { randomBytes } from 'crypto';
import { sendMail } from '../utils/utils';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, category, fullName, telephone, dateOfBirth, gender, password } = req.body;

    const user = new User({
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

    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) return res.status(400).send(error);

    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ telephone: req.body.telephone });

    if (!user) return res.status(400).send({ error: 'Username not found!' });

    if (!req.body.password) return res.status(400).send({ error: 'Password is required!' });

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) return res.status(400).send({ error: 'Телефон или пароль не верный!' });

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).send({ error: 'Unauthorized!' });

    req.user.generateToken();
    await req.user.save();

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ error: 'Пользователь с таким email не найден!' });

    const token = randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    await sendMail(user, token);

    return res.send({ message: 'Ссылка для сброса пароля отправлена на ваш email.' });
  } catch (error) {
    return next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).send({ error: 'Некорректный или истёкший токен.' });

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();
    return res.send({ message: 'Пароль успешно сброшен.' });
  } catch (error) {
    return next(error);
  }
};
