/* eslint-disable new-cap */
const router = require('express').Router();
const {hospital} = require('../controllers');
const {upload} = require('../middleware');

router.get('/', hospital.home);
router.get('/profile', hospital.getProfile);
router.patch('/profile', [upload.userProfileUpload], hospital.editProfile);
router.delete('/profile', hospital.deleteProfile);

module.exports = router;
