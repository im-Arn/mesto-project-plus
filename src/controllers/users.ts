import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import { successCode, errorsCode } from '../utils/const';

// Создание пользователя
export const createUser = (req: Request, res: Response) => {
  User.create(req.body)
    .then((user) => res.status(successCode.CREATE).send(user))
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

// Список всех пользователей
export const getAllUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => {
      res.status(successCode.REQUEST).send(users);
    })
    .catch(() => {
      res.status(errorsCode.server.code).send({ message: errorsCode.server.message });
    });
};

// Конкретный пользователь
export const getUser = (req: Request, res: Response) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(errorsCode.notFound.code)
          .send({ message: errorsCode.notFound.message });
      }
      return res.status(successCode.REQUEST).send(user);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error && error.name === 'CastError') {
        return res
          .status(errorsCode.dataUncorrect.code)
          .send({ message: errorsCode.dataUncorrect.message });
      }
      return res
        .status(errorsCode.server.code)
        .send({ message: errorsCode.server.message });
    });
};

// Декораш
export const updateUserData = (req: Request, res: Response) => {
  User.findByIdAndUpdate(
    req.user?._id,
    req.body,
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(errorsCode.notFound.code)
          .send({ message: errorsCode.notFound.message });
      }
      return res.status(successCode.REQUEST).send(user);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error && error.name === 'ValidationError') {
        return res
          .status(errorsCode.dataUncorrect.code)
          .send({ message: errorsCode.dataUncorrect.message });
      }
      return res
        .status(errorsCode.server.code)
        .send(errorsCode.server.message);
    });
};

// Обновление аватара пользователя
export const updateAvatar = (req: Request, res: Response) => { updateUserData(req, res); };

// Обновление данных пользователя
export const updateUser = (req: Request, res: Response) => { updateUserData(req, res); };
