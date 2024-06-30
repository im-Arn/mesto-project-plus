import { Router } from 'express';
import {
  updateUser,
  getAllUsers,
  getUser,
  updateAvatar,
  getCurrentUser,
} from '../controllers/users';
import {
  valUpdateAvatar,
  valUpdateUser,
  valUserId,
} from '../constants/validate';

// Cоздаём роутер и роуты
const userRouter = Router();

// userRouter.post('/', createUser);
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', valUpdateUser, updateUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:userId', valUserId, getUser);
userRouter.patch('/me/avatar', valUpdateAvatar, updateAvatar);

export default userRouter;
