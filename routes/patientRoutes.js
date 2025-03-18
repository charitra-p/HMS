const express = require('express');
const router = express.Router();

const { getPatientByEmail , addAppointment } = require('../controllers/patientController');

// ✅ Route to get patient by email
router.post('/get-by-email', getPatientByEmail);
router.post('/add-appointment', addAppointment);

module.exports = router;
