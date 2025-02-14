// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const slotRoutes = require('./routes/slots');
// const userRoutes = require('./routes/users');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

// Create Express app
const app = express();

// Set up rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } })); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(limiter); // Apply rate limiting

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/slots', slotRoutes);
// app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Resource not found',
        path: req.path
    });
});

// Error handling middleware
app.use(errorHandler);

// Graceful shutdown handler
process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Performing graceful shutdown...');
    // Close database connections, etc.
    process.exit(0);
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

// Export for testing
module.exports = server;