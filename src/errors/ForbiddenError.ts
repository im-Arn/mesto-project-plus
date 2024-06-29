import { errorsCode } from "../constants/const";

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = errorsCode.forbidden.code;
  }
}

export default ForbiddenError;