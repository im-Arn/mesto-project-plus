import { Request, Response, Router, NextFunction } from 'express';
import userRouter from './users';
import cardRouter from './cards';
import { errorsCode } from '../constants/const';
import NotFoundError from '../errors/NotFoundError';

const routes = Router();

routes
  .use('/users', userRouter)
  .use('/cards', cardRouter)
  .use((req: Request, res: Response, next:NextFunction) => next(new NotFoundError(errorsCode.notFound.message)));

export default routes;
