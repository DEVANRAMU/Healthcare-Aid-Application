document.addEventListener('DOMContentLoaded', () => {
 const form = document.getElementById('inputForm');
 const predictBtn = document.getElementById('predictBtn');
 const resultDiv = document.getElementById('result');
 const plotImage = document.getElementById('plotImage');
 // Event listener for form submission
 form.addEventListener('submit', async (event) => {
 event.preventDefault(); // Prevent the default form submission
 const formData = new FormData(form);
 const data = {
 age: formData.get('age'),
 sex: formData.get('sex'),
 bmi: formData.get('bmi'),
 children: formData.get('children'),
 smoker: formData.get('smoker'),
 region: formData.get('region')
 };
 try {
 // Make an AJAX request to the Flask API
 const response = await fetch('/predict', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json'
 },
 body: JSON.stringify(data)
 });
 if (!response.ok) {
 throw new Error('Network response was not ok.');
 }
 const result = await response.json();
 // Update result display
 resultDiv.innerHTML = `Predicted Insurance Premium: $${result.premium.toFixed(2)}`;
 // Update visualization
 plotImage.src = `data:image/png;base64,${result.plot}`;
 } catch (error) {
 console.error('Error:', error);
 resultDiv.innerHTML = 'An error occurred while predicting the premium.';
 }
 });
});