const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createAppointment,
  getUserAppointments,
  cancelAppointment
} = require('../controllers/appointmentController');
const { body } = require('express-validator');
const validation = require('../middleware/validation');

router.use(auth); // Protect all appointment routes

router.post('/', [
  body('slot_id').isInt().withMessage('Valid slot ID is required'),
  validation
], createAppointment);

router.get('/', getUserAppointments);

router.delete('/:id', cancelAppointment);

module.exports = router;