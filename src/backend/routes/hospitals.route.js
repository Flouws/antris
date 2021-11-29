/* eslint-disable new-cap */
const router = require('express').Router();
const {hospitals} = require('../controllers');

router.get('/', hospitals.getAll);
router.get('/:uuid', hospitals.getOne);

module.exports = router;
