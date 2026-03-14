const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');

// Save rating
router.post('/', async (req, res) => {
    try {
        const rating = new Rating(req.body);
        await rating.save();
        res.json({ success: true, rating });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get volunteer's ratings
router.get('/volunteer/:volunteerId', async (req, res) => {
    try {
        const ratings = await Rating.find({ volunteerId: req.params.volunteerId })
            .sort({ createdAt: -1 });
        res.json({ success: true, ratings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;