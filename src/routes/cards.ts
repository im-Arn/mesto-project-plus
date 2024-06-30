import { Router } from 'express';
import {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import {
  valCreateCard,
  valCardId,
} from '../constants/validate';

// Cоздаём роутер и роуты
const cardRouter = Router();

cardRouter.post('/', valCreateCard, createCard);
cardRouter.delete('/:cardId', valCardId, deleteCard);
cardRouter.get('/', getCards);
cardRouter.put('/:cardId/likes', valCardId, likeCard);
cardRouter.delete('/:cardId/likes', valCardId, dislikeCard);

export default cardRouter;
