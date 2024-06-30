declare module 'express' {
  export interface Request {
    user?: {
      _id: string;
    };
  }
}
