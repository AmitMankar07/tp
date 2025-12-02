document.getElementById('serviceForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const serviceName = document.getElementById('serviceName').value;
    const serviceDescription = document.getElementById('serviceDescription').value;
    // const serviceDuration = document.getElementById('serviceDuration').value; // Add this input in your form
    const servicePrice = document.getElementById('servicePrice').value;
console.log(serviceName,serviceDescription,servicePrice)
    try {
        const response = await axios.post('http://localhost:4000/api/services', {
            name: serviceName,
            description: serviceDescription,
            // duration: serviceDuration,
            price: servicePrice
        });
        console.log(response);
        console.log(response.data);
        // Optionally, you can clear the form or update the UI
    } catch (error) {
        console.error('Error adding service:', error);
    }
});