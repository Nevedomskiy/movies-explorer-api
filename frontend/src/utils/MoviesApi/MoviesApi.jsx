import { MOVIES_URL } from '../constants/constants';

class MoviesApi {
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
  getAllMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      ...this._config,
      method: 'GET',
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

//api данных карточек
export const moviesApi = new MoviesApi({
  url: MOVIES_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
