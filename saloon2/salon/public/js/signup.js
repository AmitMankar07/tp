document.getElementById('register-btn').addEventListener('click', function() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value; // Get selected role
    console.log("username", username, "email", email, "password", password, "role", role);

    // Update the endpoint to match the defined route
    axios.post('/api/auth/register', { username, email, password, role })
        .then(response => {
            alert('Registration successful! Please log in.');
            // Redirect to login page or perform other actions
            window.location.href = 'login.html'; // Redirect to login page
        })
        .catch(error => {
            alert('Registration failed: ' + error.response.data.message);
        });
});