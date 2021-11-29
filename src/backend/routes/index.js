/* eslint-disable max-len */
/* eslint-disable new-cap */
const router = require('express').Router();
const {authJwt} = require('../middleware');
const {baseResponse} = require('../base/index');
const express = require('express');
const path = require('path');

const homeRoute = require('./home.route.js');
router.use('/', homeRoute);

const authRoute = require('./auth.route.js');
router.use('/auth', authRoute);

const userRoute = require('./user.route.js');
router.use('/user', [authJwt.isUser], userRoute);

const hospitalRoute = require('./hospital.route.js');
router.use('/hospital', [authJwt.isHospital], hospitalRoute);

const hospitalsRoute = require('./hospitals.route.js');
router.use('/hospitals', hospitalsRoute);

router.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

router.all('*', (req, res) => {
  return baseResponse.error(res, 404, '404 Not Found');
});

module.exports = router;
