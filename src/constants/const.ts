type TSuccessCode = {
  REQUEST: number,
  CREATE: number,
};

type TErrorObject = {
  code: number,
  message: string,
};

type TErrorsObject = {
  dataUncorrect: TErrorObject,
  notFound: TErrorObject,
  server: TErrorObject,
};

export const successCode: TSuccessCode = {
  REQUEST: 200,
  CREATE: 201,
};

export const errorsCode: TErrorsObject = {
  dataUncorrect: {
    code: 400,
    message: 'Использованы некорректные данные',
  },
  notFound: {
    code: 404,
    message: 'Запрашиваемые данные не найдены',
  },
  server: {
    code: 500,
    message: 'На сервере произошла ошибка',
  },
};
