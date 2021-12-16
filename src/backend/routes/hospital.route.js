/* eslint-disable max-len */
/* eslint-disable new-cap */
const router = require('express').Router();
const {hospital} = require('../controllers');
const {upload} = require('../middleware');

router.get('/', hospital.home);
router.get('/profile', hospital.getProfile);
router.patch('/profile', [upload.userProfileUpload], hospital.editProfile);
router.delete('/profile', hospital.deleteProfile);

router.post('/poly', [upload.polyPictureUpload], hospital.addPoly);
router.get('/poly', hospital.getAllPoly);
router.get('/poly/:id', hospital.getPoly);
router.patch('/poly/:id', [upload.polyPictureUpload], hospital.editPoly);
router.delete('/poly/:id', hospital.deletePoly);

router.post('/poly/:polyId/appointment', hospital.addAppointment);
router.get('/poly/:polyId/appointment', hospital.getAllAppointment);
router.get('/poly/:polyId/appointment/:appointmentId', hospital.getAppointment);
router.patch('/poly/:polyId/appointment/:appointmentId', hospital.editAppointment);
router.delete('/poly/:polyId/appointment/:appointmentId', hospital.deleteAppointment);

router.get('/queue', hospital.getAllQueue);
router.get('/queue/today', hospital.getTodayQueue);
router.get('/queue/:queueId', hospital.getQueue);
router.get('/queue/date/:queueDate', hospital.getByDateQueue);
router.patch('/queue/:queueId/accept', hospital.acceptQueue);
router.patch('/queue/:queueId/process', hospital.processQueue);
router.patch('/queue/:queueId/finish', hospital.finishQueue);

module.exports = router;
