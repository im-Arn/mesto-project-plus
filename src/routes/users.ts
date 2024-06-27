import { Router } from 'express';
import {
  createUser,
  updateUser,
  getAllUsers,
  getUser,
  updateAvatar,
} from '../controllers/users';

// Cоздаём роутер и роуты
const UserRouter = Router();

UserRouter.post('/', createUser);
UserRouter.patch('/me', updateUser);
UserRouter.get('/', getAllUsers);
UserRouter.get('/:userId', getUser);
UserRouter.patch('/me/avatar', updateAvatar);

export default UserRouter;
