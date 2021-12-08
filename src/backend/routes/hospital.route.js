/* eslint-disable max-len */
/* eslint-disable new-cap */
const router = require('express').Router();
const {hospital} = require('../controllers');
const {upload} = require('../middleware');

router.get('/', hospital.home);
router.get('/profile', hospital.getProfile);
router.patch('/profile', [upload.userProfileUpload], hospital.editProfile);
router.delete('/profile', hospital.deleteProfile);

router.post('/poly', hospital.addPoly);
router.get('/poly', hospital.getAllPoly);
router.get('/poly/:id', hospital.getPoly);
router.patch('/poly/:id', hospital.editPoly);
router.delete('/poly/:id', hospital.deletePoly);

router.post('/poly/:polyId/appointment', hospital.addAppointment);
router.get('/poly/:polyId/appointment', hospital.getAllAppointment);
router.get('/poly/:polyId/appointment/:appointmentId', hospital.getAppointment);
router.patch('/poly/:polyId/appointment/:appointmentId', hospital.editAppointment);
router.delete('/poly/:polyId/appointment/:appointmentId', hospital.deleteAppointment);

module.exports = router;
