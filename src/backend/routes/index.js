/* eslint-disable new-cap */
const router = require('express').Router();
const {authJwt} = require('../middleware');
const {baseResponse} = require('../base/index');

const homeRoute = require('./home.route.js');
router.use('/', homeRoute);

const authRoute = require('./auth.route.js');
router.use('/auth', authRoute);

const userRoute = require('./user.route.js');
router.use('/user', [
  authJwt.verifyToken,
  authJwt.isUser,
], userRoute);

router.all('*', (req, res) => {
  return baseResponse.error(res, 404, '404 Not Found');
});

module.exports = router;
