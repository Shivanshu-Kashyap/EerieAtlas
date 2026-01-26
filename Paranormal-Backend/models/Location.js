const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add location name'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    severity: {
        type: String, // e.g., "High", "Medium", "Low"
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Location', locationSchema);
