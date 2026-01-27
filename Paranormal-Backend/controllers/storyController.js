const Story = require('../models/Story');

// @desc    Get all stories
// @route   GET /api/stories
// @access  Public
const getStories = async (req, res) => {
    try {
        let query = {};
        if (req.query.author) {
            query.author = req.query.author;
        }
        const stories = await Story.find(query).populate('author', 'username avatar');
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single story
// @route   GET /api/stories/:id
// @access  Public
const getStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id).populate('author', 'username avatar');

        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        // Increment views
        story.views += 1;
        await story.save();

        res.status(200).json(story);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new story
// @route   POST /api/stories
// @access  Private
const createStory = async (req, res) => {
    if (!req.body.title || !req.body.content || !req.body.location) {
        return res.status(400).json({ message: 'Please add title, content, and location' });
    }

    try {
        // Handle image uploads
        let images = [];
        if (req.files) {
            images = req.files.map(file => file.path);
        }

        const story = await Story.create({
            title: req.body.title,
            content: req.body.content,
            location: req.body.location,
            type: req.body.type || 'other',
            images: images,
            author: req.user.id
        });

        res.status(201).json(story);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Rate a story
// @route   POST /api/stories/:id/rate
// @access  Private
const rateStory = async (req, res) => {
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Please provide a rating between 1 and 5' });
    }

    try {
        const story = await Story.findById(req.params.id);

        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        // Check if user already rated
        const alreadyRated = story.ratings.find(
            (r) => r.user.toString() === req.user.id
        );

        if (alreadyRated) {
            // Update existing rating
            alreadyRated.rating = Number(rating);
        } else {
            // Add new rating
            story.ratings.push({
                user: req.user.id,
                rating: Number(rating)
            });
        }

        // Calculate average
        story.averageRating =
            story.ratings.reduce((acc, item) => item.rating + acc, 0) /
            story.ratings.length;

        await story.save();

        res.status(200).json({ message: 'Story rated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Update story
// @route   PUT /api/stories/:id
// @access  Private
const updateStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);

        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the story author
        if (story.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Handle image updates
        let updateData = { ...req.body };
        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => file.path);
        }

        const updatedStory = await Story.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        });

        res.status(200).json(updatedStory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete story
// @route   DELETE /api/stories/:id
// @access  Private
const deleteStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);

        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the story author
        if (story.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await story.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStories,
    getStory,
    createStory,
    rateStory,
    updateStory,
    deleteStory
};
