const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoute = require('./routes/authRoute');
const patientRoute = require('./routes/patientRoutes');
const doctorRoute = require('./routes/doctorRoutes');
const staffRoute = require('./routes/staffRoutes');
const adminRoute = require('./routes/adminRoutes');
const pushNoticeRoute = require('./routes/pushNoticeRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/patient', patientRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/staff', staffRoute);

app.use('/api/admin', adminRoute);

app.use('/api/notice', pushNoticeRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Atlas connected!');
}).catch(err => {
    console.log('MongoDB connection error:', err);
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
