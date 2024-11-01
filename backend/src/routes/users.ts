import express from 'express';
import { auth } from '../middleware/auth';
import { forgotPassword, login, logout, register, resetPassword } from '../controllers/users';

export const usersRouter = express.Router();

usersRouter.post('/', register);
usersRouter.post('/sessions', login);
usersRouter.delete('/sessions', auth, logout);
usersRouter.post('/forgot-password', forgotPassword);
usersRouter.post('/reset-password/:token', resetPassword);
