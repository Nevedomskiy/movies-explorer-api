// сообщения ошибок
const errMessageMailIsRegistered = 'Данная почта уже зарегистрирована';
const errMessageIncorrectCreateDataUser = 'Переданы некорректные данные при создании пользователя.';
const errMessageIncorrectUpdateDataUser = 'Переданы некорректные данные при обновлении профиля.';
const errMessageIncorrectCreateDataMovie = 'Переданы некорректные данные при создании фильма.';
const errMessageMovieNotFound = 'Фильм не найден';
const errMessageAssertionMovie = 'Попытка удалить чужой фильм';
const errMessageUserNotFound = 'Пользователь не найден';
const errMessageLinkIsNotValid = 'Ссылка невалидна';
const errMessageIncorrectMailOrPassword = 'Неправильные почта или пароль';
const errMessageUnauthorized = 'Необходима авторизация';

// сообщения ответов
const messageSuccessfulLogin = 'Успешный вход';
const messageSuccessfulExit = 'Успешный выход';
const messageMovieDeleted = 'Фильм удален';

module.exports = {
  errMessageMailIsRegistered,
  errMessageLinkIsNotValid,
  errMessageIncorrectMailOrPassword,
  errMessageIncorrectCreateDataUser,
  errMessageIncorrectUpdateDataUser,
  errMessageIncorrectCreateDataMovie,
  errMessageMovieNotFound,
  errMessageAssertionMovie,
  errMessageUserNotFound,
  messageSuccessfulLogin,
  messageSuccessfulExit,
  messageMovieDeleted,
  errMessageUnauthorized,
};
