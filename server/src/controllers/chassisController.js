const Chassis = require('../models/Chassis');

const getChassis = async (_req, res) => {
  try {
    const chassis = await Chassis.find().sort({ chassisNumber: 1 });
    return res.status(200).json({ data: chassis, message: 'Success' });
  } catch (err) {
    console.error('Error fetching chassis:', err);
    return res.status(500).json({ error: 'Failed to fetch chassis' });
  }
};

const createChassis = async (req, res) => {
  try {
    const { chassisNumber, type, status } = req.body;

    if (!chassisNumber) {
      return res.status(400).json({ error: 'chassisNumber is required' });
    }

    const newChassis = await Chassis.create({ chassisNumber, type, status });
    return res.status(201).json({ data: newChassis, message: 'Chassis created' });
  } catch (err) {
    console.error('Error creating chassis:', err);
    return res.status(500).json({ error: 'Failed to create chassis' });
  }
};

module.exports = { getChassis, createChassis };
