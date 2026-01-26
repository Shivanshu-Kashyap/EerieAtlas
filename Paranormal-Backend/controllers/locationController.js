const Location = require('../models/Location');

// @desc    Get all locations
// @route   GET /api/locations
// @access  Public
const getLocations = async (req, res) => {
    try {
        const locations = await Location.find().populate('story', 'title type');
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a location
// @route   POST /api/locations
// @access  Private (Admin or approved users?) - For now Private
const addLocation = async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.status(201).json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getLocations,
    addLocation
};
