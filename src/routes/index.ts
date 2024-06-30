import { Request, Response, Router } from 'express';
import userRouter from './users';
import cardRouter from './cards';
import { notFoundError } from '../utilits/const';

const routes = Router();

routes

  .use('/cards', cardRouter)
  .use('/users', userRouter)
  .use((req: Request, res: Response) =>
    res.status(notFoundError.code).send({ message: notFoundError.message }));

export default routes;
