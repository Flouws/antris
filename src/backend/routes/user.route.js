/* eslint-disable new-cap */
const router = require('express').Router();
const {user} = require('../controllers');

router.get('/', user.home);
router.get('/profile', user.getProfile);
router.patch('/profile', user.editProfile);

module.exports = router;
