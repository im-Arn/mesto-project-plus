import { errorsCode } from '../constants/const';

class AuthError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = errorsCode.authError.code;
  }
}

export default AuthError;
