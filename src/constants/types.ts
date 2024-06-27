declare module 'express' {
  export interface Request {
    user?: {
      _id: string;
    };
  }
}

export type TSuccessCode = {
  REQUEST: number,
  CREATE: number,
};

export type TErrorObject = {
  code: number,
  message: string,
};

export type TErrorsObject = {
  dataUncorrect: TErrorObject,
  notFound: TErrorObject,
  server: TErrorObject,
};
