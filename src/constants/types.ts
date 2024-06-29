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
  authError: TErrorObject,
  forbidden: TErrorObject,
  notFound: TErrorObject,
  conflict: TErrorObject,
  server: TErrorObject,
};

export type TProfileDef = {
  name: string,
  about: string,
  avatar: string,
}
