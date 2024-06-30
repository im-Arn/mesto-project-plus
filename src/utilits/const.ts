
export const STATUS_OK: number = 200;
export const STATUS_CREATED: number = 201;

type TError = {
  code: number,
  message: string,
};

export const errorServer:TError = {
  code: 500,
  message: "Ошибка сервера",
};

export const badRequestError:TError = {
  code: 400,
  message: "Некорректные данные",
};

export const notFoundError:TError = {
  code: 404,
  message: "Запрашиваемая страница не найдена",
};


