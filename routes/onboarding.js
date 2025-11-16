const express = require('express');
const router = express.Router();

// استدعاء Controller
const { handleOnboarding } = require('../controllers/onboardingController');

// POST /api/onboarding
router.post('/', handleOnboarding);

module.exports = router;