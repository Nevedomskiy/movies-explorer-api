const router = require('express').Router();
const { validationPatchUser } = require('../validation/validation');
const {
  getUserInfo,
  changeUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);

router.patch(
  '/me',
  validationPatchUser,
  changeUserInfo,
);

module.exports = router;
