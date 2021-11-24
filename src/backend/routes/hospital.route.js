/* eslint-disable new-cap */
const router = require('express').Router();
const {hospital} = require('../controllers');

router.get('/', hospital.home);
router.get('/profile', hospital.getProfile);


module.exports = router;
