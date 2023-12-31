document.addEventListener('DOMContentLoaded', function () {
    // Event listener for form submission
    document.getElementById('bmiForm').addEventListener('submit', function (event) {
      event.preventDefault();
      // Validate input fields
      const weight = parseFloat(document.getElementById('weight').value);
      const height = parseFloat(document.getElementById('height').value);
      const age = parseInt(document.getElementById('age').value);
      const gender = document.getElementById('gender').value;
      const unit = document.getElementById('unit').value;
  
      // Additional validation logic if needed
  
      // Make AJAX POST request to /bmicalculator route
      fetch('/bmicalculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight, height, age, gender, unit }),
      })
        .then(response => response.json())
        .then(data => {
          // Display the result
          document.getElementById('bmiResult').innerHTML = `BMI: ${data.bmi}`;
          document.getElementById('interpretation').innerHTML = `Interpretation: ${data.interpretation}`;
        })
        .catch(error => console.error('Error:', error));
    });
  });
  