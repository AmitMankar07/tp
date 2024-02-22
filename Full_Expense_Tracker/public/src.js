
document.getElementById('submitbtn').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await axios.post('/users/signup', { name, email, password });
        console.log(response.data);
    } catch (error) {
        console.error(error.response.data);
    }
});