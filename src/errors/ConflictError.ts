import { errorsCode } from "../constants/const";

class ConflictError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = errorsCode.conflict.code;
  }
}

export default ConflictError;