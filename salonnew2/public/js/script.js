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

// Staff-related functions
document.getElementById('staffForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const staffData = {
        name: document.getElementById('staffName').value,
        specialization: document.getElementById('specialization').value,
        availability: document.getElementById('availability').value
    };
console.log(staffData)
    try {
        await axios.post('/api/staff', staffData, {
            headers: { 'Authorization': `Bearer ${validateToken()}` }
        });
        alert('Staff added successfully!');
        loadStaff();
    } catch (error) {
        console.error('Error adding staff:', error);
        alert('Failed to add staff.');
    }
});

function loadStaff() {
    axios.get('/api/staff', {
        headers: { 'Authorization': `Bearer ${validateToken()}` }
    })
    .then(response => {
        const staffSelect = document.getElementById('staffSelect');
        staffSelect.innerHTML = response.data.map(staff => `<option value="${staff.id}">${staff.name}</option>`).join('');
        console.log(staffSelect)
    })

    .catch(error => {
        console.error('Error loading staff:', error);
        alert('Failed to load staff.');
    });
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
            const assignmentElement = document.createElement('div');
            assignmentElement.classList.add('assignment');
            assignmentElement.innerHTML = `
                <p><strong>Staff:</strong> ${assignment.staffName}</p>
                <p><strong>Assigned Services:</strong> ${assignment.services.map(service => service.name).join(', ')}</p>
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
// function loadAssignments() {
//     axios.get('/api/assignments', {
//         headers: { 'Authorization': `Bearer ${validateToken()}` }
//     })
//     .then(response => {
//         const assignmentContainer = document.getElementById('assignmentList');
//         // Clear previous assignments
//         assignmentContainer.innerHTML = '';

//         // Populate the assignment list
//         response.data.forEach(assignment => {
//             const assignmentElement = document.createElement('div');
//             assignmentElement.classList.add('assignment');
//             assignmentElement.innerHTML = `
//                 <p><strong>Staff:</strong> ${assignment.staffName}</p>
//                 <p><strong>Assigned Services:</strong> ${assignment.services.map(service => service.name).join(', ')}</p>
//             `;
//             assignmentContainer.appendChild(assignmentElement);
//         });
//     })
//     .catch(error => {
//         console.error('Error loading assignments:', error);
//         alert('Failed to load assignments. Please try again.');
//     });
// }
// DOMContentLoaded to initialize
document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    loadStaff();
    loadAssignments();
});
