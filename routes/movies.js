const router = require('express').Router();

const { validationAddMovies, validationRemoveMovies } = require('../validation/validation');

const {
  getMovies,
  createMovie,
  removeMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post(
  '/',
  validationAddMovies,
  createMovie,
);

router.delete(
  '/:id',
  validationRemoveMovies,
  removeMovieById,
);

module.exports = router;
