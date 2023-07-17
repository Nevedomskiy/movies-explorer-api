const router = require('express').Router();
const moviesRouter = require('./movies');
const userRouter = require('./users');
const auth = require('../middlewares/auth');
const { validationLogin, validationCreateUser } = require('../validation/validation');
const { login, createUser, logOut } = require('../controllers/users');

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
router.post('/signout', logOut);
router.use('/movies', moviesRouter);
router.use('/users', userRouter);

module.exports = router;
