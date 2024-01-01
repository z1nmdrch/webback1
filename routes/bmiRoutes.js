const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/bmicalculator', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseInt(req.body.height);
  const bmi = calculateBMI(weight, height);

  // Render the result on the main page
  res.sendFile(path.join(__dirname, '../views/index.html'), { result: `Your BMI is: ${bmi}` });
});

function calculateBMI(weight, height) {
  return (weight / Math.pow(height, 2)).toFixed(2);
}

module.exports = router;
