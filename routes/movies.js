const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validIsURL } = require('../validation/validation');

const {
  getMovies,
  createMovie,
  removeMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(validIsURL),
      trailerLink: Joi.string().required().custom(validIsURL),
      thumbnail: Joi.string().required().custom(validIsURL),
      owner: Joi.required(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  removeMovieById,
);

module.exports = router;
