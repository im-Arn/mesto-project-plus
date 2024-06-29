import { errorsCode } from "../constants/const";

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = errorsCode.notFound.code;
  }
}

export default NotFoundError;