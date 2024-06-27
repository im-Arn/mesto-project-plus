import { Router } from 'express';
import {
  createUser,
  updateUser,
  getAllUsers,
  getUser,
  updateAvatar,
} from '../controllers/users';

// Cоздаём роутер и роуты
const userRouter = Router();

userRouter.post('/', createUser);
userRouter.patch('/me', updateUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUser);
userRouter.patch('/me/avatar', updateAvatar);

export default userRouter;
