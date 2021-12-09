/* eslint-disable max-len */
/* eslint-disable new-cap */
const router = require('express').Router();
const {hospitals} = require('../controllers');

router.get('/', hospitals.getAll);
router.get('/:uuid', hospitals.getOne);
router.get('/:uuid/poly', hospitals.getAllPoly);
router.get('/:uuid/poly/:polyId', hospitals.getOnePoly);
router.get('/:uuid/poly/:polyId/appointment', hospitals.getAllAppointment);
router.get('/:uuid/poly/:polyId/appointment/:appointmentId', hospitals.getOneAppointment);

module.exports = router;
