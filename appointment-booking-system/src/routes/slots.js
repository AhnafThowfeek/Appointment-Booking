const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  getAvailableSlots,
  createSlot
} = require('../controllers/slotController');
const { body } = require('express-validator');
const validation = require('../middleware/validation');

router.get('/', getAvailableSlots);

// Admin only routes
router.post('/', [
  auth,
  body('date').isDate().withMessage('Valid date is required'),
  body('start_time').matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage('Valid start time is required (HH:MM:SS)'),
  body('end_time').matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage('Valid end time is required (HH:MM:SS)'),
  validation
], createSlot);

module.exports = router;