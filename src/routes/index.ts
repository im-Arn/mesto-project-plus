import { Request, Response, Router } from 'express';
import userRouter from './users';
import cardRouter from './cards';
import { errorsCode } from '../constants/const';

const routes = Router();

routes
  .use('/users', userRouter)
  .use('/cards', cardRouter)
  .use((req: Request, res: Response) => res.status(errorsCode.notFound.code).send({ message: errorsCode.notFound.message }));

export default routes;
