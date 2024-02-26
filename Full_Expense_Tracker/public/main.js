document.addEventListener('DOMContentLoaded',()=>{
console.log("in main js file");

    function clearFields() {
        document.getElementById('amount').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = '';
        console.log("field clear");
    }
    const expenseForm = document.getElementById('expense-form');
const itemsList = document.getElementById('items');

    expenseForm.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const amount=document.getElementById('amount').value; 
        const description=document.getElementById('description').value;
        const category=document.getElementById('category').value;

        console.log("amount,desc,category", { amount,description,category });
     try {
        const response = await axios.post('/users/expenses', { amount,description,category });
        console.log(response.data);
        
        clearFields();
        const expensesResponse = await axios.get('/users/expenses');
        const expenses=expensesResponse.data;
        const itemsList = document.getElementById('items');
        itemsList.innerHTML = ''; // Clear existing list items
        expenses.forEach(expense => {
            const listItem = document.createElement('li');
            listItem.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;
            itemsList.appendChild(listItem);
        });
    }catch(error){
        console.log(error);
    }

    })

})