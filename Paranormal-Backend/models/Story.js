const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    id: { type: Number, unique: true }, // Legacy ID support if needed
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String, // Text location e.g., "London, UK"
        required: true
    },
    type: {
        type: String,
        enum: ['ghost', 'ufo', 'cryptid', 'other'],
        default: 'other'
    },
    images: {
        type: [String],
        default: []
    },
    views: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        min: 1,
        max: 5
    },
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Story', storySchema);
