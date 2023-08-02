const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { changeData, getUserData } = require('./helpers/helpers');
const BadRequestError = require('../errors/bad-request-error');
const ConflictingRequestError = require('../errors/conflicting-request-error');

const {
  errMessageUserNotFound,
  errMessageMailIsRegistered,
  messageSuccessfulExit,
  messageSuccessfulLogin,
  errMessageIncorrectUpdateDataUser,
  errMessageIncorrectCreateDataUser,
} = require('../utils/constants/constants');

const {
  DEV_SECRET, NODE_ENV, JWT_SECRET,
} = require('../utils/config/config');

const changeUserInfo = (req, res) => {
  const me = req.user._id;
  const { name, email } = req.body;
  changeData(
    User,
    { name, email },
    me,
    res,
    errMessageUserNotFound,
    errMessageMailIsRegistered,
    errMessageIncorrectUpdateDataUser,
  );
};

const getUserInfo = (req, res, next) => {
  getUserData(User, req.user._id, res, next, errMessageUserNotFound);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictingRequestError(errMessageMailIsRegistered));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(errMessageIncorrectCreateDataUser));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie(
        'authorization',
        token,
        {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        },
      );
      res.status(200).send({ message: messageSuccessfulLogin });
    })
    .catch(next);
};

const logOut = (req, res) => {
  res.clearCookie('authorization').send({ message: messageSuccessfulExit });
  req.user = null;
};

module.exports = {
  createUser,
  getUserInfo,
  changeUserInfo,
  login,
  logOut,
};
