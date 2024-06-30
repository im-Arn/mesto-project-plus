import { Router } from 'express';
import {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);

export default router;
