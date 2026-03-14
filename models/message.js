const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    senderType: { type: String, enum: ['user', 'volunteer'], required: true },
    senderName: String,
    text: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
