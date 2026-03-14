const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ============================================
// MONGODB ATLAS CONNECTION
// ============================================
// Replace this connection string with your actual Atlas connection string
// Replace the hardcoded connection string with:
const MONGODB_URI = process.env.MONGODB_URI;

// Make sure to add at the top:
require('dotenv').config();

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    console.log('📊 Database: flowcast');
}).catch(err => {
    console.error('❌ MongoDB Atlas Connection Error:', err);
    console.log('💡 Make sure:');
    console.log('   1. Your username and password are correct');
    console.log('   2. Your IP address is whitelisted in Atlas');
    console.log('   3. The connection string is properly formatted');
});

// Import routes
const userRoutes = require('./routes/users');
const requestRoutes = require('./routes/requests');
const messageRoutes = require('./routes/messages');
const ratingRoutes = require('./routes/ratings');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/ratings', ratingRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ 
        success: true, 
        message: 'FLOWCAST API is running on MongoDB Atlas!',
        database: 'MongoDB Atlas (Cloud)',
        endpoints: {
            users: '/api/users',
            requests: '/api/requests',
            messages: '/api/messages',
            ratings: '/api/ratings'
        }
    });
});

// Test database connection route
app.get('/api/test-db', async (req, res) => {
    try {
        // Try to ping the database
        await mongoose.connection.db.admin().ping();
        res.json({ 
            success: true, 
            message: '✅ Database connection is healthy',
            database: mongoose.connection.name,
            host: mongoose.connection.host
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: 'Database connection error',
            details: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err.stack);
    res.status(500).json({ 
        success: false, 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        error: 'Endpoint not found',
        availableEndpoints: ['/', '/api/test-db', '/api/users', '/api/requests', '/api/messages', '/api/ratings']
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log('\n' + '='.repeat(50));
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Local: http://localhost:${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api`);
    console.log(`💾 Database: MongoDB Atlas (Cloud)`);
    console.log('='.repeat(50) + '\n');
});
