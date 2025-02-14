const Slot = require('../models/Slot');

const getAvailableSlots = async (req, res) => {
    try {
        const slots = await Slot.findAvailable();
        res.json(slots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createSlot = async (req, res) => {
    try {
        const { date, start_time, end_time } = req.body;

        // Validate date is not in the past
        if (new Date(date) < new Date().setHours(0, 0, 0, 0)) {
            return res.status(400).json({ message: 'Cannot create slots for past dates' });
        }

        // Validate end_time is after start_time
        if (start_time >= end_time) {
            return res.status(400).json({ message: 'End time must be after start time' });
        }

        const slotId = await Slot.create({ date, start_time, end_time });

        res.status(201).json({
            message: 'Slot created successfully',
            slotId
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Slot already exists for this time period' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAvailableSlots,
    createSlot
};