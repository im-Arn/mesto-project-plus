import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Card from '../models/card';
import { successCode, errorsCode } from '../constants/const';

// Создание карточки
export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user?._id,
  })
    .then((card) => res.status(successCode.CREATE).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error && error.name === 'ValidationError') {
        return res
          .status(errorsCode.dataUncorrect.code)
          .send({ message: errorsCode.dataUncorrect.message });
      }
      return res
        .status(errorsCode.server.code)
        .send({ message: errorsCode.server.message });
    });
};

// Удаление карточки
export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(errorsCode.notFound.code)
          .send({ message: errorsCode.notFound.message });
      }
      return res.status(successCode.REQUEST).send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error && error.name === "CastError") {
        return res
          .status(errorsCode.dataUncorrect.code)
          .send({ message: errorsCode.dataUncorrect.message });
      }
      return res
        .status(errorsCode.server.code)
        .send({ message: errorsCode.server.message });
    });
};

// Все карточки
export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => {
      res.status(successCode.REQUEST).send(cards);
    })
    .catch(() => {
      res.status(errorsCode.server.code).send({ message: errorsCode.server.message });
    });
};

// Лайки
export const likeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(errorsCode.notFound.code).send({ message: errorsCode.notFound.message });
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error && error.name === "CastError") {
        return res.status(errorsCode.dataUncorrect.code).send({ message: errorsCode.dataUncorrect.message });
      }
      return res.status(errorsCode.server.code).send({ message: errorsCode.server.message });
    });
};

export const dislikeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user?._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(errorsCode.notFound.code)
          .send({ message: errorsCode.notFound.message });
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error && error.name === "CastError") {
        return res
          .status(errorsCode.dataUncorrect.code)
          .send({ message: errorsCode.dataUncorrect.message });
      }
      return res.status(errorsCode.server.code).send({ message: errorsCode.server.message });
    });
};