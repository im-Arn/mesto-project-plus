import { Router } from 'express';
import {
  createUser,
  updateUser,
  getAllUsers,
  getUser,
  updateAvatar,
} from '../controllers/users';

const router = Router();

router.post('/', createUser);
router.patch('/me', updateUser);
router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.patch('/me/avatar', updateAvatar);

export default router;
