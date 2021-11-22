/* eslint-disable new-cap */
const router = require('express').Router();
const {user} = require('../controllers');
const {authJwt} = require('../middleware');

router.get('/', [
  authJwt.verifyToken,
], user.home);

module.exports = router;
