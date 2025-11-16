require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// استدعاء الـ Routes
const onboardingRoutes = require('./routes/onboarding');
const aiRoutes = require('./routes/ai');

app.use('/api/onboarding', onboardingRoutes);
app.use('/api/ai', aiRoutes);

// اختبار السيرفر
app.get('/', (req, res) => {
  res.send('Backend SmartStudyPlan يعمل بشكل صحيح');
});

// بدء السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});