
document.addEventListener('DOMContentLoaded',async () => {

// const user=response.data;
// console.log("USer:",user);
    console.log("Expense Tracker Main JS");
    

    // Function to clear input fields
    function clearFields() {
        document.getElementById('amount').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = '';
        console.log("Fields cleared");
    }
// Check if the user is a premium user and update UI accordingly
async function checkPremiumUser() {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:3000/users/premium/premiummembership', {
            headers: { 'Authorization': token }
        });
        // If the user is a premium user, hide the premium button and display a message
        const isPremium = response.data.isPremiumUser;
        console.log("isPremium in main:",isPremium);
        if (isPremium) {
            const premiumButton = document.getElementById('premium');
            premiumButton.style.display = 'none';
            // Create a new button or display a message for premium users
            const premiumUserMessage = document.createElement('p');
            premiumUserMessage.innerHTML = '<h3>Premium User</h3>';
            premiumButton.parentNode.insertBefore(premiumUserMessage, premiumButton.nextSibling);
        }
    } catch (error) {
        console.log("Error:", error);
        // Handle error
    }
}

// Call checkPremiumUser function when DOM content is loaded
await checkPremiumUser();

    document.getElementById('premium').onclick=async function(e){
        
        const token=localStorage.getItem('token');
        console.log("token in premium:",token);
        try{
            const response=await axios.get('http://localhost:3000/users/premium/premiummembership',{
            headers:{'Authorization':token}});

            // console.log("user.ispremiumuser",user.ispremiumuser);
            // If the user is already a premium member, display a message
            

            console.log("get succesful");
        console.log(response);
    
        var options={
            "key":response.data.key_id,
            "order_id":response.data.order.id,
            "handler":async function (response){
                await axios.post('http://localhost:3000/users/premium/updateTransactionStatus',{
                    order_id:options.order_id,
                    payment_id:response.razorpay_payment_id,
                },{headers:{'Authorization':token}})

                // isPremiumUser = true; 
                alert('You are Premium User Now');
                (async function() {
                    await checkPremiumUser();
                })();
                const leaderboardButton = document.createElement('button');
                leaderboardButton.id = 'leaderboard';
                leaderboardButton.textContent = 'Leaderboard';

                leaderboardButton.addEventListener('click', () => {
                        // Handle leaderboard button click
                    });

                const premiumButton = document.getElementById('premium');
                premiumButton.parentNode.insertBefore(leaderboardButton, premiumButton.nextSibling);

              
            },
        };
        const rzp1=new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on('payment.failed',function (response){
            console.log(response);
            alert('Something went wrong')
        });
        }catch(error){
            console.log("Error:",error);
            alert('Error while processing request');
        }
        
    };

    // Function to fetch and display expenses
    async function fetchAndDisplayExpenses() {
        try {
            const token=localStorage.getItem('token');
            if (!token) {
                // Handle case when token is not present
                console.error('No token found');
                return;
            }
            const expensesResponse = await axios.get('/users/expenses',{
                headers:{'Authorization':`${token}`}});
            const expenses = expensesResponse.data;
            const itemsList = document.getElementById('items');
            itemsList.innerHTML = ''; // Clear existing list items
            expenses.forEach(expense => {
                const listItem = document.createElement('li');
                listItem.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;

                // Add "Edit" button
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.type = 'button';
                editButton.addEventListener('click', () => {
                    // Handle edit button click
                    editExpense(expense);
                });
                listItem.appendChild(editButton);

                // Add "Delete" button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.type = 'button'; 
                deleteButton.addEventListener('click', () => {
                    // Handle delete button click
                    deleteExpense(expense.id);
                });
                listItem.appendChild(deleteButton);

                itemsList.appendChild(listItem);
            });
        } catch (error) {
            console.error(error);
        }
    }

    // Function to handle form submission
    async function handleFormSubmission(event) {
        event.preventDefault();
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        
        console.log("amount, desc, category:", { amount, description, category });

        try {
            const token = localStorage.getItem('token');
            console.log("token in main js file",token);
        if (!token) {
            // Handle case when token is not present
            console.error('No token found in mainjs');
            return;
        }
            const response = await axios.post('/users/expenses', { 
                amount, description, category },
                { headers: { 'Authorization': token }});
            console.log(response.data);
            console.log("expense posted");

            clearFields();
            fetchAndDisplayExpenses();
        } catch (error) {
            console.error(error);
        }
    }

    // Function to handle editing expense
    function editExpense(expense) {
        // Populate input fields with expense data for editing
        console.log("in edit func");
       const expenseId=expense.id;
       console.log("expenseid:",expenseId);
        document.getElementById('amount').value = expense.amount;
        document.getElementById('description').value = expense.description;
        document.getElementById('category').value = expense.category;
        deleteExpense(expenseId)

        // Implement editing logic here (optional)
    }

    // Function to handle deleting expense
    async function deleteExpense(expenseId) {
        console.log("in delete func");
        try {
            await axios.delete(`/users/expenses/${expenseId}`,{ 
                headers: { 'Authorization': `${localStorage.getItem('token')}` }});
            console.log("delte completed")
            fetchAndDisplayExpenses();
        } catch (error) {
            console.error(error);
        }
    }

    // Add event listener for form submission
    const expenseForm = document.getElementById('expense-form');
    expenseForm.addEventListener('submit', handleFormSubmission);

    // Fetch and display expenses on page load
    fetchAndDisplayExpenses();
});
