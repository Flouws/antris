/* eslint-disable new-cap */
const router = require('express').Router();
const {home} = require('../controllers');

router.get('/', home.home);

module.exports = router;
