import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthError from '../errors/AuthError';
import { errorsCode } from '../constants/const';

export default (req: Request | JwtPayload, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(errorsCode.authError.message));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (error) {
    return next(new AuthError(errorsCode.authError.message));
  }
  req.user = payload;
  return next();
};
