import { BASE_URL } from '../constants/constants';

class MainApi {
  constructor({ url, credentials, headers }) {
    this._url = url;
    this._config = { credentials, headers };
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
  }

  //получение данных карточек
  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      ...this._config,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //регистрация
  register(email, password, name) {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      ...this._config,
      body: JSON.stringify({
        password: password,
        email: email,
        name: name,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //вход в аккаунт
  authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      ...this._config,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //выход с аккаунта
  signOut() {
    return fetch(`${BASE_URL}/signout`, {
      method: 'POST',
      ...this._config,
    }).then(() => {
      localStorage.clear();
    });
  }

  //получение данных пользователя
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      ...this._config,
      method: 'GET',
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //редактирование данных пользователя
  changeUserInfo(data) {
    // console.log(JSON.stringify(data))
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      ...this._config,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //сохранение фильма
  addMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      ...this._config,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        trailerLink: data.trailerLink,
        image: data.image,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: data.thumbnail,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //удаление фильма
  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      ...this._config,
      method: 'DELETE',
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

//api данных карточек
export const mainApi = new MainApi({
  url: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
