const express = require('express');
const router = express.Router();

// استدعاء Controller
const { generateStudyPlan } = require('../controllers/aiController');

// POST /api/ai
router.post('/', generateStudyPlan);

module.exports = router;