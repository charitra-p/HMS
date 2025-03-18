const Patient = require('../models/patientModel');

// ✅ POST request to fetch user by email
const getPatientByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient by email:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ POST request to add an appointment
const addAppointment = async (req, res) => {
  const { email, appointment } = req.body;

  try {
    // Patient exist karta hai?
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Direct update (no version issue)
    const updatedPatient = await Patient.findOneAndUpdate(
      { email },
      { $push: { upcomingAppointments: appointment } },
      { new: true }
    );

    res.status(200).json({
      message: 'Appointment added successfully',
      patient: updatedPatient
    });

  } catch (error) {
    console.error('Error adding appointment:', error);
    res.status(500).json({ message: 'Error adding appointment' });
  }
};


module.exports = { getPatientByEmail , addAppointment};
