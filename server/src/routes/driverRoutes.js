const express = require('express');
const { getDrivers, createDriver } = require('../controllers/driverController');

const router = express.Router();

router.get('/', getDrivers);
router.post('/', createDriver);

module.exports = router;
