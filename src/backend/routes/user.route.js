/* eslint-disable max-len */
/* eslint-disable new-cap */
const router = require('express').Router();
const {user} = require('../controllers');
const {upload} = require('../middleware');

router.get('/', user.home);
router.get('/profile', user.getProfile);
router.patch('/profile', [upload.userProfileUpload], user.editProfile);
router.delete('/profile', user.deleteProfile);

router.post('/queue', [upload.queuePicturesUpload], user.addQueue);
router.get('/queue', user.getAllQueue);
router.get('/queue/today', user.getTodayQueue);
router.get('/queue/:queueId', user.getQueue);
router.get('/queue/date/:queueDate', user.getByDateQueue);
router.delete('/queue/:queueId', user.deleteQueue);

module.exports = router;
