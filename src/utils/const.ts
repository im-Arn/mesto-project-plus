import {
  TSuccessCode,
  TErrorsObject,
} from '../constants/types';

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
