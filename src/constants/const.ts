import {
  TSuccessCode,
  TErrorsObject,
  TProfileDef,
} from './types';

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

export const defaultProfile: TProfileDef = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь',
  avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
}
