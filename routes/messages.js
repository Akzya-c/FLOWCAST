const express = require('express');
const router = express.Router();
const Message = require('../models/message');

// Save message
router.post('/', async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.json({ success: true, message });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get messages for a request
router.get('/:requestId', async (req, res) => {
    try {
        const messages = await Message.find({ requestId: req.params.requestId })
            .sort({ createdAt: 1 });
        res.json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
