const { Appointment, Slot } = require('../models');

const createAppointment = async (req, res) => {
    try {
        const { slot_id } = req.body;
        const user_id = req.user.id;

        // Check if slot exists and is available
        const slot = await Slot.findById(slot_id);
        if (!slot || !slot.is_available) {
            return res.status(400).json({ message: 'Slot is not available' });
        }

        // Create appointment and update slot availability
        const appointmentId = await Appointment.create({ user_id, slot_id });
        await Slot.updateAvailability(slot_id, false);

        res.status(201).json({
            message: 'Appointment booked successfully',
            appointmentId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findByUser(req.user.id);
        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        await Appointment.cancel(id, userId);
        res.json({ message: 'Appointment cancelled successfully' });
    } catch (error) {
        if (error.message === 'Appointment not found') {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createAppointment,
    getUserAppointments,
    cancelAppointment
};