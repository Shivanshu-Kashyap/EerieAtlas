const express = require('express');
const router = express.Router();
const { getStories, getStory, createStory, rateStory, updateStory, deleteStory } = require('../controllers/storyController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/').get(getStories).post(protect, upload.array('images', 5), createStory);
router.route('/:id').get(getStory).put(protect, upload.array('images', 5), updateStory).delete(protect, deleteStory);
router.route('/:id/rate').post(protect, rateStory);

module.exports = router;
