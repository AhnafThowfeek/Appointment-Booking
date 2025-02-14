const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');
const {
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    updateUserRole
} = require('../controllers/userController');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// Protected routes - require authentication
router.use(auth);

// User profile routes
router.get('/profile', getUserProfile);

router.put('/profile', [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please enter a valid email'),
    body('currentPassword')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Current password must be at least 6 characters long'),
    body('newPassword')
        .optional()
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long'),
    validation
], updateUserProfile);

// Admin routes
router.get('/all', isAdmin, getAllUsers);

router.put('/:userId/role', [
    isAdmin,
    body('role')
        .isIn(['user', 'admin'])
        .withMessage('Invalid role'),
    validation
], updateUserRole);

module.exports = router;