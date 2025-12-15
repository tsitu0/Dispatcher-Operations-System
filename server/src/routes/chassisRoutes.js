const express = require('express');
const { getChassis, createChassis } = require('../controllers/chassisController');

const router = express.Router();

router.get('/', getChassis);
router.post('/', createChassis);

module.exports = router;
