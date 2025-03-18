const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const serverless = require('serverless-http');

const authRoute = require('../routes/authRoute');
const patientRoute = require('../routes/patientRoutes');
const doctorRoute = require('../routes/doctorRoutes');
const staffRoute = require('../routes/staffRoutes');
const adminRoute = require('../routes/adminRoutes');
const pushNoticeRoute = require('../routes/pushNoticeRoutes');

const connectToDatabase = require('../lib/mongoose'); // ✅ require karo

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect to DB
connectToDatabase().then(() => {
  console.log('MongoDB connected inside handler');
});

// Routes
// ✅ Test Route
app.get('/api/test', (req, res) => {
    res.status(200).json({
      message: 'API is working fine!',
      status: 'success'
    });
  });
app.use('/api/auth', authRoute);
app.use('/api/patient', patientRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/staff', staffRoute);
app.use('/api/admin', adminRoute);
app.use('/api/notice', pushNoticeRoute);

// Export serverless handler
module.exports = serverless(app);
