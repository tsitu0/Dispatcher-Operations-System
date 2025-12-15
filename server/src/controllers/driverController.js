const Driver = require('../models/Driver');

const getDrivers = async (_req, res) => {
  try {
    const drivers = await Driver.find().sort({ name: 1 });
    return res.status(200).json({ data: drivers, message: 'Success' });
  } catch (err) {
    console.error('Error fetching drivers:', err);
    return res.status(500).json({ error: 'Failed to fetch drivers' });
  }
};

const createDriver = async (req, res) => {
  try {
    const { name, phone, licenseNumber, status } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }

    const newDriver = await Driver.create({ name, phone, licenseNumber, status });
    return res.status(201).json({ data: newDriver, message: 'Driver created' });
  } catch (err) {
    console.error('Error creating driver:', err);
    return res.status(500).json({ error: 'Failed to create driver' });
  }
};

module.exports = { getDrivers, createDriver };
