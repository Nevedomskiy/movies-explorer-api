const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validationLogin,
  validationCreateUser,
  validationAddMovies,
  validationRemoveMovies,
  validationPatchUser,
} = require('../validation/validation');

const {
  login,
  createUser,
  logOut,
  getUserInfo,
  changeUserInfo,
} = require('../controllers/users');

const {
  getMovies,
  createMovie,
  removeMovieById,
} = require('../controllers/movies');

router.post(
  '/signin',
  validationLogin,
  login,
);
router.post(
  '/signup',
  validationCreateUser,
  createUser,
);

router.use(auth);

router.get('/movies', getMovies);

router.post(
  '/movies',
  validationAddMovies,
  createMovie,
);

router.delete(
  '/movies/:id',
  validationRemoveMovies,
  removeMovieById,
);
router.get('/users/me', getUserInfo);

router.patch(
  '/users/me',
  validationPatchUser,
  changeUserInfo,
);

router.post('/signout', logOut);

module.exports = router;
