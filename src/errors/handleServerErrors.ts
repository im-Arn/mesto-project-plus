import { NextFunction, Response, Request } from 'express';
import { errorsCode } from '../constants/const';

const handleServerErrors = (err: any, req: Request, res: Response, next: NextFunction): void => {
  const { statusCode = errorsCode.server.code, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? errorsCode.server.message : message });
};

export default handleServerErrors;
