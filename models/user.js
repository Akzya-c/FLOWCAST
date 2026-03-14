const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['user', 'volunteer'], default: 'user' },
    location: { type: String, required: true },
    coordinates: {
        lat: Number,
        lng: Number
    },
    stats: {
        rescues: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
        responseTime: { type: Number, default: 0 }
    },
    isOnline: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);