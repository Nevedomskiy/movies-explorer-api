const Movie = require('../models/movie');
const { getData } = require('./helpers/helpers');
const AssertionError = require('../errors/assertion-error');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');

const errMessageMovieNotFound = 'Фильм не найден';

const getMovies = (req, res, next) => {
  getData(Movie, req, res, next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie
    .create(
      {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner,
      },
    )
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};

const removeMovieById = (req, res, next) => {
  Movie
    .findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(errMessageMovieNotFound));
      } else if (req.user._id !== movie.owner.toString()) {
        next(new AssertionError('Попытка удалить чужой фильм'));
      } else {
        Movie
          .findByIdAndDelete(req.params.id)
          .then(() => { res.status(200).send({ message: 'Фильм удален' }); })
          .catch(next);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  removeMovieById,
};
