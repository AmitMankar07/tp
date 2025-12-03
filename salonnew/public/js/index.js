
window.onload = async function() {
    const bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    displayUserBookings(bookings);
    await fetchServices(); // Fetch services after displaying bookings
};
const token = localStorage.getItem('token');
// Adjust the path as necessary
    console.log("Token:", token);
    const decodeToken = parseJwt(token);
    const userId = decodeToken.id;
    console.log("decodetoken in main.js:", decodeToken);

// fetchServices();
fetchUserBookings(); 
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


async function fetchUserBookings() {
    const token = localStorage.getItem('token'); // Get the token from local storage
    try {
        const response = await axios.get(`/api/services/user-bookings/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the request headers
            }
        });
        const bookings = response.data;
        console.log("User  bookings:", bookings);
        localStorage.setItem('userBookings', JSON.stringify(bookings));
       
        return bookings; // Return the bookings for further processing
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        alert('Failed to fetch user bookings. Please try again later.');
        return []; // Return an empty array in case of error
    }
}


function displayUserBookings(bookings) {
    // Implement logic to display the user's bookings on the UI
    const userBookingsSection = document.getElementById('userBookingsSection');
    userBookingsSection.innerHTML = ''; // Clear previous bookings

    bookings.forEach(booking => {
        const bookedServiceElement = document.createElement('div');
        bookedServiceElement.innerText = `Booked Service: ${booking.service_name} - Appointment Date: ${booking.appointment_date}`;
        userBookingsSection.appendChild(bookedServiceElement);
    });
}
fetchServices();
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

function parseJwt (token) {
    if(!token){
        return null;
    }
    console.log("token in parsejwt",token);
    // var base64Url = token;
    var base64Url = token.split('.')[1];
    console.log("base64url:",base64Url);
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


async function bookService(button) {
    const service = JSON.parse(button.getAttribute('data-service'));
    console.log("service id", service);
    
    const userName = decodeToken.name;
    const userId = decodeToken.id; // Assuming you have userId from the decoded token

    // Create payment order
    try {
        console.log("price", service.price);
        const orderResponse = await axios.post('/api/services/payment/create-order', {
            amount: service.price, // Amount to be paid
            currency: 'INR' // Currency
        });
        console.log("orderres", orderResponse);
        const razorpayKey = orderResponse.data.razorpayKey;

        const options = {
            key: razorpayKey, // Your Razorpay key id
            amount: orderResponse.data.amount, // Amount in paise
            currency: orderResponse.data.currency,
            name: 'Service Booking',
            description: service.name,
            order_id: orderResponse.data.id, // Use the order_id created in the previous step
            handler: async function (response) {
                // This function is called on successful payment
                console.log("Payment successful:", response);
                
                // Proceed to book the service
                try {
                    console.log("xvc", userId, service.id, service.name, service.duration, service.price, service.description, response.razorpay_payment_id);
                    
                    // Create the order in the database
                    // const order = await Order.create({
                    //     paymentId: response.razorpay_payment_id,
                    //     orderId: orderResponse.data.id,
                    //     status: 'Completed', // or whatever status you want to set
                    //     amount: service.price,
                    //     currency: 'INR',
                    //     serviceId: service.id,
                    //     userId: userId
                    // });
                    const createOrderResponse = await axios.post('/api/services/create-order', {
                        paymentId: response.razorpay_payment_id,
                        orderId: orderResponse.data.id,
                        status: 'Completed', // or whatever status you want to set
                        amount: service.price,
                        currency: 'INR',
                        serviceId: service.id,
                        userId: userId
                    });
                    console.log("Order creation response:", createOrderResponse.data);

                    // Now book the appointment
                    const bookingResponse = await axios.post('/api/services/book-appointment', {
                        userId: userId,
                        serviceId: service.id,
                        name: service.name,
                        duration: service.duration,
                        price: service.price,
                        description: service.description,
                        paymentId: response.razorpay_payment_id // Include payment ID
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    saveBookingToLocalStorage({
                        service_id: service.id,
                        service_name: service.name,
                        appointment_date: new Date().toISOString() // Example date, replace with actual appointment date
                    });
                    console.log("Booking response:", bookingResponse);
                    alert(bookingResponse.data.message); // Show booking confirmation message
                    
                    button.textContent = 'Cancel Service';
                    button.onclick = function() {
                        cancelService(service.id, button); // Call cancelService function
                    };
                    showReviewForm(service);
                } catch (error) {
                    console.error('Error booking service:', error);
                    alert('Failed to book service. Please try again later.');
                }
            },
            prefill: {
                name: 'Customer Name', // Optional: Prefill customer name
 email: 'customer@example.com', // Optional: Prefill customer email
                contact: '9999999999' // Optional: Prefill customer contact
            },
            theme: {
                color: '#F37254' // Optional: Customize the theme color
            }
        };

        const rzp = new Razorpay(options);
        rzp.open(); // Open the Razorpay payment modal
    } catch (error) {
        console.error('Error creating payment order:', error);
        alert('Failed to initiate payment. Please try again later.');
    }
}
function saveBookingToLocalStorage(booking) {
    let bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    bookings.push(booking);
    localStorage.setItem('userBookings', JSON.stringify(bookings));
}
async function cancelService(serviceId, button) {
    // Implement the cancellation logic here
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('/api/services/cancel-appointment', {
            serviceId: serviceId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Cancellation response:", response);
        alert(response.data.message); // Show cancellation confirmation message
        
        // Change the button back to "Book Service"
        button.textContent = 'Book Service';
        button.onclick = function() {
            bookService(button); // Call bookService function again
        };
    } catch (error) {
        console.error('Error cancelling service:', error);
        alert('Failed to cancel service. Please try again later.');
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
        const response = await axios.post('/api/submit-review', {
            serviceId: serviceId,
            review: reviewText
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the request headers
            }
        });
        console.log("review done:",response);
        alert(response.data.message); // Show review submission confirmation message
        // reviewForm.reset(); // Reset the form
       
        document.getElementById('reviewText').value = '';// Hide the review form
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('Failed to submit review. Please try again later.');
    }
}


// async function init() {
//     const bookings = await fetchUserBookings(); // Fetch user bookings first
//     await fetchServices(bookings); // Pass the bookings to fetchServices
// }

// async function fetchServices(bookings) {
//     const token = localStorage.getItem('token'); // Get the token from local storage
//     try {
//         const response = await axios.get('/api/services', {
//             headers: {
//                 'Authorization': `Bearer ${token}` // Include the token in the request headers
//             }
//         });
//         const services = response.data; // Get the list of services

//         // Extract booked service IDs
//         const bookedServiceIds = bookings.map(booking => booking.service_id);

//         // Filter out booked services from the available services
//         const availableServices = services.filter(service => !bookedServiceIds.includes(service.id));

//         displayServices(availableServices); // Call the function to display available services
//     } catch (error) {
//         console.error('Error fetching services:', error);
//         alert('Failed to fetch services. Please try again later.');
//     }
// }

// async function fetchUserBookings() {
//     const token = localStorage.getItem('token'); // Get the token from local storage
//     try {
//         const response = await axios.get(`/api/services/user-bookings/${userId}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}` // Include the token in the request headers
//             }
//         });
//         const bookings = response.data;
//         console.log("User  bookings:", bookings);
//         return bookings; // Return the bookings for further processing
//     } catch (error) {
//         console.error('Error fetching user bookings:', error);
//         alert('Failed to fetch user bookings. Please try again later.');
//         return []; // Return an empty array in case of error
//     }
// }

// function displayUserBookings(bookings) {
//     const userBookingsSection = document.getElementById('userBookingsSection');
//     userBookingsSection.innerHTML = ''; // Clear previous bookings

//     if (bookings.length === 0) {
//         userBookingsSection.innerHTML = '<p>No booked services found.</p>'; // Display a message if no bookings
//         return;
//     }
//     bookings.forEach(booking => {
//         const bookedServiceElement = document.createElement('div');
//         bookedServiceElement.innerText = `Booked Service: ${booking.service_name} - Appointment Date: ${booking.appointment_date}`;
        
//         // Create a cancel button
//         const cancelButton = document.createElement('button');
//         cancelButton.innerText = 'Cancel Booking';
//         cancelButton.onclick = function() {
//             cancelBooking(booking.id); // Call the cancel function with the booking ID
//         };

//         bookedServiceElement.appendChild(cancelButton);
//         userBookingsSection.appendChild(bookedServiceElement);
//     });
// }

// function displayServices(services) {
//     console.log(services);
//     const servicesList = document.getElementById('servicesList');
//     servicesList.innerHTML = ''; // Clear previous services
//     services.forEach(service => {
//         const li = document.createElement('li');
//         li.innerHTML = `
//             <strong>${service.name}</strong><br>
//             Price: $${service.price}<br>
//             Duration: ${service.duration} minutes<br>
//             Description: ${service.description}<br>
//             <button data-service='${JSON.stringify(service)}' onclick="bookService(this)">Book Service</button>
//         `;
//         servicesList.appendChild(li);
//     });
//     document.getElementById('services').style.display = 'block'; // Show services section
// }

// // Initialize the application
// init();
// async function fetchServices() {
//     const token = localStorage.getItem('token'); // Get the token from local storage
//     try {
//         const response = await axios.get(`/api/services/getUser/${userId}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}` // Include the token in the request headers
//             }
//         });
//         displayServices(response.data); // Call the function to display services
//     } catch (error) {
//         console.error('Error fetching services:', error);
//         alert('Failed to fetch services. Please try again later.');
//     }
// }


// // Function to handle booking a service
// async function bookService(button) {
//     const service = JSON.parse(button.getAttribute('data-service'));
//     console.log("service id", service);
    
//     const userName = decodeToken.name;
//     // Create payment order
//     try {
//         console.log("price",service.price);
//         const orderResponse = await axios.post('/api/services/payment/create-order', {
//             amount: service.price, // Amount to be paid
//             currency: 'INR' // Currency
//         });
//         console.log("orderres",orderResponse)
//         const razorpayKey = orderResponse.data.razorpayKey;
//         const options = {
//             key: razorpayKey, // Your Razorpay key id
//             amount: orderResponse.data.amount, // Amount in paise
//             currency: orderResponse.data.currency,
//             name: 'Service Booking',
//             description: service.name,
//             order_id: orderResponse.data.id, // Use the order_id created in the previous step
//             handler: async function (response) {
//                 // This function is called on successful payment
//                 console.log("Payment successful:", response);
                
//                 // Proceed to book the service
//                 try {
//                     console.log("xvc",userId,service.id,service.name,service.duration,service.price,service.description,response.razorpay_payment_id)
//                     const bookingResponse = await axios.post('/api/services/book-appointment', {
//                         userId: userId,
//                         serviceId: service.id,
//                         name: service.name,
//                         duration: service.duration,
//                         price: service.price,
//                         description: service.description,
//                         paymentId: response.razorpay_payment_id // Include payment ID
//                     }, {
//                         headers: {
//                             'Authorization': `Bearer ${token}`
//                         }
//                     });
//                     console.log("Booking response:", bookingResponse);
//                     alert(bookingResponse.data.message); // Show booking confirmation message
                    
//                     button.textContent = 'Cancel Service';
//                     button.onclick = function() {
//                         cancelService(service.id, button); // Call cancelService function
//                     };
//                     showReviewForm(service);
//                 } catch (error) {
//                     console.error('Error booking service:', error);
//                     alert('Failed to book service. Please try again later.');
//                 }
//             },
//             prefill: {
//                 name: 'Customer Name', // Optional: Prefill customer name
//                 email: 'customer@example.com', // Optional: Prefill customer email
//                 contact: '9999999999' // Optional: Prefill customer contact
//             },
//             theme: {
//                 color: '#F37254' // Optional: Customize the theme color
//             }
//         };

//         const rzp = new Razorpay(options);
//         rzp.open(); // Open the Razorpay payment modal
//     } catch (error) {
//         console.error('Error creating payment order:', error);
//         alert('Failed to initiate payment. Please try again later.');
//     }
// }
// async function fetchUserBookings() {
//     const token = localStorage.getItem('token'); // Get the token from local storage
//     try {
//         const response = await axios.get(`/api/services/user-bookings/${userId}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}` // Include the token in the request headers
//             }
//         });
//         const bookings = response.data;
//         console.log("User  bookings:", bookings);
//         displayUserBookings(bookings); // Call the function to display user bookings
//     } catch (error) {
//         console.error('Error fetching user bookings:', error);
//         alert('Failed to fetch user bookings. Please try again later.');
//     }
// }


// fetchUserBookings(); // Fetch user bookings first
// async function fetchServices() {
//     const token = localStorage.getItem('token'); // Get the token from local storage
//     try {
//         const response = await axios.get('/api/services', {
//             headers: {
//                 'Authorization': `Bearer ${token}` // Include the token in the request headers
//             }
//         });
//         const services = response.data; // Get the list of services
//         const bookings = await fetchUserBookings(); // Fetch user bookings to filter services
//         const bookedServiceIds = bookings.map(booking => booking.service_id); // Extract booked service IDs

//         // Filter out booked services from the available services
//         const availableServices = services.filter(service => !bookedServiceIds.includes(service.id));

//         displayServices(availableServices); // Call the function to display available services
//     } catch (error) {
//         console.error('Error fetching services:', error);
//         alert('Failed to fetch services. Please try again later.');
//     }
// }