import {
  Request,
  Response,
  NextFunction,
} from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user';
import { successCode, errorsCode } from '../constants/const';
import ConflictError from '../errors/ConflictError';
import DataUncorrectError from '../errors/DataUncorrectError';
import NotFoundError from '../errors/NotFoundError';

// Создание пользователя
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email } = req.body;
  return bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ email, password: hash, name, about, avatar }))
    .then((user) => res.status(successCode.CREATE).send({ user }))
    .catch((error: any) => {
      if (error.code === 11000) {
        return next(new ConflictError(errorsCode.conflict.message));
      }
      if (error instanceof Error && error.name === 'ValidationError') {
        return next(new DataUncorrectError(errorsCode.dataUncorrect.message));
      }
      return next(error);
    });
};

// Список всех пользователей
export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => {
      res.status(successCode.REQUEST).send(users);
    })
    .catch(next);
};

// Декораш поиска пользователя
export const findUser = (req: Request | JwtPayload, res: Response, next: NextFunction, letter: string) => {
  User.findById(letter === 'me' ? req.user!._id : req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(errorsCode.notFound.message));
      }
      return res.status(successCode.REQUEST).send(user);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new DataUncorrectError(errorsCode.dataUncorrect.message));
      }
      return next(error);
    });
};

// Любой пользователь
export const getUser = (req: Request, res: Response, next: NextFunction) => { findUser(req, res, next, 'notme'); };
// Залогиненный пользователь
export const getCurrentUser = (req: Request | JwtPayload, res: Response, next: NextFunction) => { findUser(req, res, next, 'me'); };

// Декораш обновления данных
export const updateUserData = (req: Request, res: Response, next: NextFunction) => {
  User.findByIdAndUpdate(
    req.user?._id,
    req.body,
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(errorsCode.notFound.message));
      }
      return res.status(successCode.REQUEST).send(user);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new DataUncorrectError(errorsCode.dataUncorrect.message));
      }
      return next(error);
    });
};

// Обновление аватара пользователя
export const updateAvatar = (req: Request, res: Response, next: NextFunction) => { updateUserData(req, res, next); };

// Обновление данных пользователя
export const updateUser = (req: Request, res: Response, next: NextFunction) => { updateUserData(req, res, next); };

// Логин
export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new DataUncorrectError(errorsCode.dataUncorrect.message));
      }
      return next(error);
    });
};
