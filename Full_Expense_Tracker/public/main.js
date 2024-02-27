document.addEventListener('DOMContentLoaded', () => {
    console.log("Expense Tracker Main JS");

    // Function to clear input fields
    function clearFields() {
        document.getElementById('amount').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = '';
        console.log("Fields cleared");
    }

    // Function to fetch and display expenses
    async function fetchAndDisplayExpenses() {
        try {
            const expensesResponse = await axios.get('/users/expenses');
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
            const response = await axios.post('/users/expenses', { amount, description, category });
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
            await axios.delete(`/users/expenses/${expenseId}`);
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
