const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true },
    userPhone: { type: String, required: true },
    location: { type: String, required: true },
    coordinates: {
        lat: Number,
        lng: Number
    },
    type: { 
        type: String, 
        enum: ['flood', 'heat', 'evacuation', 'supplies', 'medical'],
        required: true 
    },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    details: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'in-progress', 'completed', 'rejected'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now },
    acceptedAt: Date,
    completedAt: Date
});

module.exports = mongoose.model('Request', RequestSchema);