import express from 'express';
import { auth } from '../middleware/auth';
import {
  forgotPassword,
  getAllUsers,
  getOneUser,
  login,
  logout,
  register,
  resetPassword,
  updateActiveStatus,
  updateCurrentProfile,
  updateProfile,
} from '../controllers/users';

export const usersRouter = express.Router();

usersRouter.get('/get-users', getAllUsers);
usersRouter.get('/:id', getOneUser);
usersRouter.post('/', register);
usersRouter.post('/sessions', login);
usersRouter.delete('/sessions', auth, logout);
usersRouter.post('/forgot-password', forgotPassword);
usersRouter.post('/reset-password/:token', resetPassword);
usersRouter.put('/update-info', auth, updateProfile);
usersRouter.put('/:id/update-info', auth, updateCurrentProfile);
usersRouter.patch('/:id/toggleActive', updateActiveStatus);
