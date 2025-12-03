document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const role = document.getElementById('login-role').value; // Get selected role
    console.log("username", username, "password", password, "role", role);

    // Ensure the correct URL is used for the POST request
    axios.post('http://localhost:5000/api/auth/login', { username, password, role })
        .then(response => {
            alert('Login successful!');
            
            const token = response.data.token; // Assuming the token is returned in the response
            localStorage.setItem('token', token); // Store the token in local storage
            
            // Verify the token is saved
            console.log('Token saved in localStorage:', localStorage.getItem('token')); // Log to confirm token is saved

            const userRole = response.data.user.role; // Assuming the role is returned in the response
            console.log('User Role:', userRole); // Log to confirm the user role
            
            if (userRole === 'admin') {
                window.location.href = 'services.html'; // Redirect to the service management page for admin
            } else {
                window.location.href = 'index.html'; // Redirect to the main page for customers
            }
        })
        .catch(error => {
            alert('Login failed: ' + error.response.data.message);
        });
});
