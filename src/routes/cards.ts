import { Router } from 'express';
import {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

// Cоздаём роутер и роуты
const cardRouter = Router();

cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.get('/', getCards);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

export default cardRouter;
