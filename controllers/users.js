const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { changeData, getUserData } = require('./helpers/helpers');
const BadRequestError = require('../errors/bad-request-error');
const ConflictingRequestError = require('../errors/conflicting-request-error');

const errMessageUserNotFound = 'Пользователь не найден';

const { NODE_ENV, JWT_SECRET } = process.env;

const changeUserInfo = (req, res) => {
  const me = req.user._id;
  const { name, about } = req.body;
  changeData(User, { name, about }, me, req, res, errMessageUserNotFound);
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
        next(new ConflictingRequestError('Данная почта уже зарегистрирована'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
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
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie(
        'authorization',
        token,
        {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        },
      );
      res.status(200).send({ message: 'Успешный вход' });
    })
    .catch(next);
};

const logOut = (req, res) => {
  res.clearCookie('authorization').send({ message: 'Успешный выход' });
  req.user = null;
};

module.exports = {
  createUser,
  getUserInfo,
  changeUserInfo,
  login,
  logOut,
};
