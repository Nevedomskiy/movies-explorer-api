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
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validIsURL),
    }),
  }),
  createMovie,
);

router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  removeMovieById,
);

module.exports = router;
