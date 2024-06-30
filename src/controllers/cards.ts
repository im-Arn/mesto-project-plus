import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import { successCode, errorsCode } from '../constants/const';
import DataUncorrectError from '../errors/DataUncorrectError';
import NotFoundError from '../errors/NotFoundError';
import ForbiddenError from '../errors/ForbiddenError';

// Создание карточки
export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user?._id,
  })
    .then((card) => res.status(successCode.CREATE).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new DataUncorrectError(errorsCode.dataUncorrect.message));
      }
      return next(error);
    });
};

// Удаление карточки
export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(errorsCode.notFound.message));
      }
      if (String(card.owner) !== req.user!._id) {
        return next(new ForbiddenError(errorsCode.forbidden.message));
      }
      return card // для удаления
        .remove()
        .then(() => res.status(successCode.REQUEST).send(card))
        .catch(next);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new DataUncorrectError(errorsCode.dataUncorrect.message));
      }
      return next(error);
    });
};

// Все карточки
export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => {
      res.status(successCode.REQUEST).send(cards);
    })
    .catch(next);
};

// Лайки
export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(errorsCode.notFound.message));
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new DataUncorrectError(errorsCode.dataUncorrect.message));
      }
      return next(error);
    });
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user?._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(errorsCode.notFound.message));
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new DataUncorrectError(errorsCode.dataUncorrect.message));
      }
      return next(error);
    });
};
