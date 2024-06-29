import { errorsCode } from "../constants/const";

class DataUncorrectError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = errorsCode.dataUncorrect.code;
  }
}

export default DataUncorrectError;