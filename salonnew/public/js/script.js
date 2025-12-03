// Utility function to get the token from localStorage
function getToken() {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token); // Log the token for debugging
    return token;
}

// Utility function to validate token presence
function validateToken() {
    const token = getToken();
    if (!token) {
        alert('No token found. Please log in again.');
        throw new Error('No token available');
    }
    return token;
}

// Function to load services and update the dropdown
function loadServices() {
    axios.get('/api/services', {
        headers: { 'Authorization': `Bearer ${validateToken()}` }
    })
    .then(response => {
        const services = response.data;
        const serviceList = document.getElementById('serviceList');
        serviceList.innerHTML = services.length === 0 
            ? '<p>No services available.</p>' 
            : services.map(service => `
                <div class="service">
                    <h3>${service.name}</h3>
                    <p><strong>Description:</strong> ${service.description}</p>
                    <p><strong>Duration:</strong> ${service.duration} minutes</p>
                    <p><strong>Price:</strong> $${service.price}</p>
                    <p><strong>Available:</strong> ${service.available ? 'Yes' : 'No'}</p>
                    <button class="update-button" onclick="editService('${service.id}')">Update</button>
                    <button class="delete-button" onclick="deleteService('${service.id}')">Delete</button>
                </div>`).join('');
        updateServiceDropdown();
    })
    .catch(error => {
        console.error('Error loading services:', error);
        alert('Failed to load services.');
    });
}

function updateServiceDropdown() {
    axios.get('/api/services', {
        headers: { 'Authorization': `Bearer ${validateToken()}` }
    })
    .then(response => {
        const services = response.data;
        const serviceSelect = document.getElementById('serviceSelect');
        serviceSelect.innerHTML = services.map(service => `<option value="${service.id}">${service.name}</option>`).join('');
    })
    .catch(error => {
        console.error('Error updating service dropdown:', error);
        alert('Failed to update service dropdown.');
    });
}

// Form submission handler for adding a new service
document.getElementById('serviceForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        duration: document.getElementById('duration').value,
        price: document.getElementById('price').value,
        available: document.getElementById('available').checked
    };

    try {
        await axios.post('/api/services', formData, {
            headers: { 'Authorization': `Bearer ${validateToken()}` }
        });
        alert('Service added successfully!');
        loadServices();
    } catch (error) {
        console.error('Error adding service:', error);
        alert('Failed to add service.');
    }
});

// Function to edit a service
function editService(id) {
    const token = validateToken();

    axios.get(`/api/services/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
        const service = response.data;
        const form = document.getElementById('serviceForm');

        Object.entries(service).forEach(([key, value]) => {
            const input = document.getElementById(key);
            if (input) input.type === 'checkbox' ? input.checked = value : input.value = value;
        });

        form.onsubmit = async (e) => {
            e.preventDefault();
            const updatedService = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                duration: document.getElementById('duration').value,
                price: document.getElementById('price').value,
                available: document.getElementById('available').checked
            };

            try {
                await axios.put(`/api/services/${id}`, updatedService, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert('Service updated successfully!');
                loadServices();
            } catch (error) {
                console.error('Error updating service:', error);
                alert('Failed to update service.');
            }
        };
    })
    .catch(error => {
        console.error('Error fetching service details:', error);
        alert('Failed to fetch service details.');
    });
}

// Function to delete a service
function deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        axios.delete(`/api/services/${id}`, {
            headers: { 'Authorization': `Bearer ${validateToken()}` }
        })
        .then(() => {
            alert('Service deleted successfully!');
            loadServices();
        })
        .catch(error => {
            console.error('Error deleting service:', error);
            alert('Failed to delete service.');
        });
    }
}

// Load Staff and Populate List + Dropdown
function loadStaff() {
    axios.get('/api/staff', {
        headers: { 'Authorization': `Bearer ${validateToken()}` }
    })
    .then(response => {
        const staff = response.data;
        const staffSelect = document.getElementById('staffSelect');
        const staffList = document.getElementById('staffList');

        // Populate the staff dropdown
        staffSelect.innerHTML = staff.map(staff => `<option value="${staff.id}">${staff.name}</option>`).join('');

        // Populate the staff list
        staffList.innerHTML = staff.length === 0 
            ? '<p class="text-gray-500">No staff available.</p>' 
            : staff.map(staff => `
                <div class="staff bg-white p-4 rounded-lg shadow-md mb-4">
                    <h3 class="text-lg font-medium text-gray-800">${staff.name}</h3>
                    <p class="text-gray-600"><strong>Specialization:</strong> ${staff.specialization}</p>
                    <p class="text-gray-600"><strong>Availability:</strong> ${staff.availability}</p>
                    <div class="mt-2 space-x-2">
                        <button class="update-button bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onclick="editStaff('${staff.id}')">Edit</button>
                        <button class="delete-button bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onclick="deleteStaff('${staff.id}')">Delete</button>
                    </div>
                </div>`).join('');
    })
    .catch(error => {
        console.error('Error loading staff:', error);
        alert('Failed to load staff.');
    });
}

// Add Staff Form Submission
document.getElementById('staffForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const staffData = {
        name: document.getElementById('staffName').value,
        specialization: document.getElementById('specialization').value,
        availability: document.getElementById('availability').value
    };

    try {
        await axios.post('/api/staff', staffData, {
            headers: { 'Authorization': `Bearer ${validateToken()}` }
        });
        alert('Staff added successfully!');
        document.getElementById('staffForm').reset(); // Reset form
        loadStaff(); // Refresh staff list and dropdown
    } catch (error) {
        console.error('Error adding staff:', error);
        alert('Failed to add staff.');
    }
});

// Edit Staff
function editStaff(id) {
    const token = validateToken();

    axios.get(`/api/staff/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
        const staff = response.data;
        const form = document.getElementById('staffForm');

        // Populate form with staff details
        document.getElementById('staffName').value = staff.name;
        document.getElementById('specialization').value = staff.specialization;
        document.getElementById('availability').value = staff.availability;

        // Change form submission to update
        form.onsubmit = async (e) => {
            e.preventDefault();
            const updatedStaff = {
                name: document.getElementById('staffName').value,
                specialization: document.getElementById('specialization').value,
                availability: document.getElementById('availability').value
            };

            try {
                await axios.put(`/api/staff/${id}`, updatedStaff, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert('Staff updated successfully!');
                form.reset(); // Reset form
                form.onsubmit = null; // Revert to default add behavior
                loadStaff(); // Refresh staff list
            } catch (error) {
                console.error('Error updating staff:', error);
                alert('Failed to update staff.');
            }
        };
    })
    .catch(error => {
        console.error('Error fetching staff details:', error);
        alert('Failed to fetch staff details.');
    });
}

// Delete Staff
function deleteStaff(id) {
    if (confirm('Are you sure you want to delete this staff member?')) {
        axios.delete(`/api/staff/${id}`, {
            headers: { 'Authorization': `Bearer ${validateToken()}` }
        })
        .then(() => {
            alert('Staff deleted successfully!');
            loadStaff(); // Refresh staff list
        })
        .catch(error => {
            console.error('Error deleting staff:', error);
            alert('Failed to delete staff.');
        });
    }
}

// Assign services to staff
document.getElementById('assignServicesForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const staffId = document.getElementById('staffSelect').value;
    const selectedServices = Array.from(document.getElementById('serviceSelect').selectedOptions).map(option => option.value);
console.log(staffId,selectedServices)
    // Validate input
    if (!staffId || selectedServices.length === 0) {
        alert('Please select a staff member and at least one service.');
        return;
    }

    try {
        // Send POST request to assign services
        await axios.post('/api/assignments', { staffId, serviceIds: selectedServices }, {
            headers: { 'Authorization': `Bearer ${validateToken()}` }
        });
        alert('Services assigned successfully!');
        loadAssignments(); // Reload assignments after successful assignment
    } catch (error) {
        console.error('Error assigning services:', error);
        alert('Failed to assign services. Please try again.');
    }
});

function loadAssignments() {
    console.log('Loading assignments...'); // Log when the function is called

    axios.get('/api/assignments', {
        headers: { 'Authorization': `Bearer ${validateToken()}` }
    })
    .then(response => {
        console.log('Response received from API:', response); // Log the entire response object
        console.log('Assignments data:', response.data); // Log just the data part of the response

        const assignmentContainer = document.getElementById('assignmentList');
        // Clear previous assignments
        assignmentContainer.innerHTML = '';

// Populate the assignment list
response.data.forEach(assignment => {
    const services = assignment.services || []; // Default to an empty array if services is undefined
    const serviceNames = Array.isArray(services) ? services.map(service => service.name).join(', ') : 'No services assigned';

    const assignmentElement = document.createElement('div');
    assignmentElement.classList.add('assignment');
    assignmentElement.innerHTML = `
        <p><strong>Staff:</strong> ${assignment.Staff.name}</p> <!-- Adjusted to access staff name correctly -->
        <p><strong>Assigned Services:</strong> ${assignment.Service.name}</p>
    `;
    assignmentContainer.appendChild(assignmentElement);
});

        console.log('Assignments displayed in the UI.'); // Log after displaying assignments
    })
    .catch(error => {
        console.error('Error loading assignments:', error); // Log the error
        alert('Failed to load assignments. Please try again.');
    });
}

async function fetchReviews(serviceId) {
    console.log('Entering fetchReviews with serviceId:', serviceId);

    if (!serviceId) {
        console.error('serviceId is undefined or empty');
        alert('Please select a service to fetch reviews.');
        return;
    }

    try {
        console.log(`Fetching reviews for service ID: ${serviceId}`);
        const url = `/api/reviews/${serviceId}`;
        console.log('Request URL:', url);
        const response = await axios.get(url);
        console.log('Response from server:', response.data);

        const reviews = response.data;
        const reviewsList = document.getElementById('reviewsList');
        if (!reviewsList) {
            console.error('reviewsList element not found in DOM');
            return;
        }
        reviewsList.innerHTML = ''; // Clear existing reviews

        if (!Array.isArray(reviews) || reviews.length === 0) {
            console.log('No reviews returned or invalid response format');
            reviewsList.innerHTML = '<li>No reviews found for this service.</li>';
        } else {
            console.log(`Rendering ${reviews.length} reviews`);
            reviews.forEach(review => {
                const listItem = document.createElement('li');
                listItem.textContent = `User ${review.user_id}: ${review.review_text}`;
                reviewsList.appendChild(listItem);
            });
        }
        document.getElementById('reviews').style.display = 'block';
    } catch (error) {
        console.error('Error fetching reviews:', error);
        console.log('Error response:', error.response?.data);
        alert('Failed to fetch reviews. Please try again later.');
    }
}

async function fetchStatistics() {
    
    try {
        console.log('Fetching statistics...'); // Log when fetching starts
        // totalServicesResponse
        const [ totalStaffResponse, totalAssignmentsResponse, totalReviewsResponse] = await Promise.all([
            // axios.get('/api/services/total-services'),
            axios.get('/api/total-staff'), // Ensure the correct route is used
            axios.get('/api/total-assignments'), // Ensure the correct route is used
            axios.get('/api/total-reviews') // Ensure the correct route is used
        ]);

        // Log the responses for debugging
        // console.log('Total Services Response:', totalServicesResponse.data);
        console.log('Total Staff Response:', totalStaffResponse.data);
        console.log('Total Assignments Response:', totalAssignmentsResponse.data);
        console.log('Total Reviews Response:', totalReviewsResponse.data);
console.log("tss",totalStaffResponse.data.totalStaff)
        // Update the DOM with the fetched data
        // document.getElementById('totalServices').innerText = totalServicesResponse.data.totalServices;
        document.getElementById('totalStaff').innerText = totalStaffResponse.data.totalStaff;
        document.getElementById('totalAssignments').innerText = totalAssignmentsResponse.data.totalAssignments;
        document.getElementById('totalReviews').innerText = totalReviewsResponse.data.totalReviews;

        console.log('Statistics updated successfully.'); // Log when statistics are updated
    } catch (error) {
        console.error('Error fetching statistics:', error); // Log any errors that occur
    }
}

// Call fetchStatistics when the admin dashboard is shown
function showAdminDashboard() {
    const sections = ['admin'];
    sections.forEach(section => {
        document.getElementById(section).style.display = 'block';
    });
    fetchStatistics(); // Fetch statistics when the dashboard is shown
}
document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    loadStaff();
    loadAssignments();
    fetchReviews(2);
});



