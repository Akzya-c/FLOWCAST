const express = require('express');
const router = express.Router();
const Request = require('../models/request');

// Get all pending requests
router.get('/pending', async (req, res) => {
    try {
        const requests = await Request.find({ status: 'pending' })
            .sort({ priority: -1, createdAt: -1 });
        res.json({ success: true, requests });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get user's requests
router.get('/user/:userId', async (req, res) => {
    try {
        const requests = await Request.find({ userId: req.params.userId })
            .sort({ createdAt: -1 });
        res.json({ success: true, requests });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get volunteer's requests
router.get('/volunteer/:volunteerId', async (req, res) => {
    try {
        const requests = await Request.find({ 
            volunteerId: req.params.volunteerId 
        }).sort({ createdAt: -1 });
        res.json({ success: true, requests });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create new request
router.post('/', async (req, res) => {
    try {
        const request = new Request(req.body);
        await request.save();
        res.json({ success: true, request });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Accept request
router.put('/:id/accept', async (req, res) => {
    try {
        const request = await Request.findByIdAndUpdate(
            req.params.id,
            {
                volunteerId: req.body.volunteerId,
                status: 'accepted',
                acceptedAt: Date.now()
            },
            { new: true }
        );
        res.json({ success: true, request });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update request status
router.put('/:id/status', async (req, res) => {
    try {
        const update = { status: req.body.status };
        if (req.body.status === 'completed') {
            update.completedAt = Date.now();
        }
        
        const request = await Request.findByIdAndUpdate(
            req.params.id,
            update,
            { new: true }
        );
        res.json({ success: true, request });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;