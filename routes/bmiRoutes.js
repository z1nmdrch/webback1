const express = require('express');
const router = express.Router();
const path = require('path');

const bmiHistory = [];

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/bmicalculator', (req, res) => {
  const { weight, height, gender, age, unit } = req.body;

  if (!isValidInput(weight, height, gender, age, unit)) {
    return res.status(400).json({ error: 'Invalid input. Please provide valid weight, height, gender, age, and unit.' });
  }

  const bmi = calculateBMI(weight, height, unit);
  const bmiCategory = getBMICategory(bmi);

  const timestamp = new Date().toISOString();
  const calculationResult = { bmi, bmiCategory, gender, age, unit, timestamp };
  bmiHistory.push(calculationResult);

  setTimeout(() => {
    res.json({ bmi, bmiCategory });

    console.log('Updated BMI History:', bmiHistory);
  }, 1000);
});

router.get('/history', (req, res) => {
  res.json(bmiHistory);
});

function isValidInput(weight, height, gender, age, unit) {
  return (
    !isNaN(parseFloat(weight)) &&
    !isNaN(parseFloat(height)) &&
    typeof gender === 'string' &&
    !isNaN(parseInt(age)) &&
    (unit === 'metric' || unit === 'imperial')
  );
}

function calculateBMI(weight, height, unit) {
  const heightInMeters = unit === 'imperial' ? height * 0.0254 : height;
  return (weight / Math.pow(heightInMeters, 2)).toFixed(2);
}

function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'Normal weight';
  } else if (bmi >= 25 && bmi < 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

module.exports = router;
