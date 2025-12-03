
fetchServices();
async function fetchServices() {
    const token = localStorage.getItem('token'); // Get the token from local storage
    try {
        const response = await axios.get('/api/services', {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the request headers
            }
        });
        displayServices(response.data); // Call the function to display services
    } catch (error) {
        console.error('Error fetching services:', error);
        alert('Failed to fetch services. Please try again later.');
    }
}

// Function to display services on the page
function displayServices(services) {
    console.log(services);
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = ''; // Clear previous services
    services.forEach(service => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${service.name}</strong><br>
            Price: $${service.price}<br>
            Duration: ${service.duration} minutes<br>
            Description: ${service.description}<br>
          <button data-service='${JSON.stringify(service)}' onclick="bookService(this)">Book Service</button>
         `;
            //  <button onclick="bookService(${JSON.stringify(service)})">Book Service</button>
       
        servicesList.appendChild(li);
    });
    document.getElementById('services').style.display = 'block'; // Show services section
}

// Function to handle booking a service
async function bookService(button) {
    const service = JSON.parse(button.getAttribute('data-service')); // Get the service object from the button's data attribute
    console.log("service id", service);
    const token = localStorage.getItem('token'); // Get the token from local storage
    console.log("Token:", token); 
    try {
        const response = await axios.post('/api/services/book-appointment',  {
            serviceId: service.id,
            name: service.name,
            duration: service.duration,
            price: service.price,
            description: service.description
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the request headers
            }
        });
        alert(response.data.message); // Show booking confirmation message
        showReviewForm(service); 
    } catch (error) {
        console.error('Error booking service:', error);
        alert('Failed to book service. Please try again later.');
    }
}
// Function to show the review form
function showReviewForm(service) {
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.style.display = 'block'; // Show the review form
    reviewForm.setAttribute('data-service-id', service.id); // Store the service ID in the form
}

// Function to submit the review
async function submitReview(event) {
    event.preventDefault(); // Prevent the default form submission
    const reviewForm = document.getElementById('reviewForm');
    const serviceId = reviewForm.getAttribute('data-service-id');
    const reviewText = document.getElementById('reviewText').value;

    const token = localStorage.getItem('token'); // Get the token from local storage
    try {
        const response = await axios.post('/api/services/submit-review', {
            serviceId: serviceId,
            review: reviewText
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the request headers
            }
        });
        alert(response.data.message); // Show review submission confirmation message
        reviewForm.reset(); // Reset the form
        reviewForm.style.display = 'none'; // Hide the review form
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('Failed to submit review. Please try again later.');
    }
}