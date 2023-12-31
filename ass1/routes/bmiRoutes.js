const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.post('/index', (req, res) => {
  // BMI calculation logic
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);
  const age = parseInt(req.body.age);
  const gender = req.body.gender;
  const unit = req.body.unit;

  // Additional logic for unit conversion if needed

  const bmi = weight / Math.pow(height, 2);

  // Interpretation logic
  let interpretation = 'Normal Weight';

  // Additional logic for interpretation based on age, gender, etc.

  res.send({
    bmi: bmi.toFixed(2),
    interpretation: interpretation,
  });
});

module.exports = router;
