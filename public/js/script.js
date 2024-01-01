function validateForm() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
  
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert('Please enter valid weight and height.');
      return false;
    }
  
    return true;
  }
  