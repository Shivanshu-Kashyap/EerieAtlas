const Comment = require('../models/Comment');

// @desc    Get comments for a story
// @route   GET /api/comments/:storyId
// @access  Public
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ story: req.params.storyId })
            .populate('user', 'username avatar')
            .sort({ createdAt: -1 }); // Newest first

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a comment
// @route   POST /api/comments
// @access  Private
const addComment = async (req, res) => {
    const { storyId, content } = req.body;

    if (!storyId || !content) {
        return res.status(400).json({ message: 'Please add storyId and content' });
    }

    try {
        const comment = await Comment.create({
            story: storyId,
            user: req.user.id,
            content
        });

        // Populate user details for immediate display
        const populatedComment = await Comment.findById(comment._id).populate('user', 'username avatar');

        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getComments,
    addComment
};
