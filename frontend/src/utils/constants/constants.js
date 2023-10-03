export const BASE_URL = 'https://diplom.backend.nomoredomains.xyz';
export const MOVIES_URL = 'https://api.nomoreparties.co';

export const INPUT_LIST_REGISTER = [
  {
    type: 'text',
    description: 'Имя',
  },
  {
    type: 'email',
    description: 'E-mail',
  },
  {
    type: 'password',
    description: 'Пароль',
  },
];

export const INPUT_LIST_lOGIN = [
  {
    type: 'email',
    description: 'E-mail',
  },
  {
    type: 'password',
    description: 'Пароль',
  },
];

export const ERROR_MESSAGE = {
  EMPTY_VALUE: 'Поле не может быть пустым',
  NAME_REPEATED: 'Имя соответствует ранее сохраненному значению',
  NOT_VALID_NAME:
    'Используйте, пожалуйста, латиницу, кириллицу, пробел или дефис',
  INCORRECT_LENGTH: 'Некорректная длина',
  NOT_VALID_EMAIL: 'Почта не валидна',
  EMAIL_REPEATED: 'Почта соответствует ранее сохраненному значению',
  NOT_FOUND: 'Ничего не найдено ',
  SERVER_OUT:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  ENTER_VALUE: 'Нужно ввести ключевое слово',
};

export const SUCCESSFUL_MESSAGE = {
  SAVE_DATA: 'Данные успешно изменены',
};

export const SIZE = {
  M: 480,
  X: 1280,
};

export const NUMBER_OF_CARDS = {
  S: 2,
  M: 3,
  L: 5,
  X: 8,
  XL: 12,
};

export const VALIDATION_RE = {
  EMAIL:
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  // eslint-disable-next-line no-useless-escape
  NAME: /^[\u0400-\u04FFa-zA-Z\s\-]+$/,
};
