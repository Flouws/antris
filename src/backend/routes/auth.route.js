/* eslint-disable new-cap */
const router = require('express').Router();
const {auth} = require('../controllers');
const {verifySignUp} = require('../middleware');

router.post('/signup', [
  verifySignUp.checkDuplicateEmail,
  verifySignUp.checkRoleExist,
], auth.signup);

router.post('/signin', auth.signin);

module.exports = router;
