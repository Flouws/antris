/* eslint-disable new-cap */
const router = require('express').Router();
const {hospitals} = require('../controllers');

router.get('/', hospitals.getAll);
router.get('/:uuid', hospitals.getOne);
router.get('/:uuid/poly', hospitals.getAllPoly);
router.get('/:uuid/poly/:polyId', hospitals.getOnePoly);

module.exports = router;
