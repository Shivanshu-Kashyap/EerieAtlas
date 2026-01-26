const express = require('express');
const router = express.Router();
const { getLocations, addLocation } = require('../controllers/locationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getLocations).post(protect, addLocation);

module.exports = router;
