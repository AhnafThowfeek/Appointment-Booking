const bcrypt = require('bcryptjs');
const { User } = require('../models');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { name, email, currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updates = {};

        // Update name if provided
        if (name) {
            updates.name = name;
        }

        // Update email if provided and different
        if (email && email !== user.email) {
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            updates.email = email;
        }

        // Update password if both current and new passwords are provided
        if (currentPassword && newPassword) {
            // Verify current password
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            // Hash new password
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(newPassword, salt);
        }

        if (Object.keys(updates).length > 0) {
            const updated = await User.update(userId, updates);
            if (!updated) {
                return res.status(400).json({ message: 'Update failed' });
            }
            res.json({ message: 'Profile updated successfully' });
        } else {
            res.status(400).json({ message: 'No fields to update' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin functions
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const updated = await User.update(userId, { role });
        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User role updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    updateUserRole
};