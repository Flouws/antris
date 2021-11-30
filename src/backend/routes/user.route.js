/* eslint-disable new-cap */
const router = require('express').Router();
const {user} = require('../controllers');
const {upload} = require('../middleware');

router.get('/', user.home);
router.get('/profile', user.getProfile);
router.patch('/profile', [upload.userProfileUpload], user.editProfile);
router.delete('/profile', user.deleteProfile);

module.exports = router;