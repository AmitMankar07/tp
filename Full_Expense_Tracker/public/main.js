
const btnLeaderBoard = document.getElementById("btn_leader_board");
const leaderBoardTitle = document.getElementById("leader_board_title");
const leaderBoardList = document.getElementById("leader_board_list");

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

window.addEventListener('DOMContentLoaded',async () => {
    const token=localStorage.getItem('token');
   
    const decodeToken=parseJwt(token);
    console.log("decodetoken in main.js:",decodeToken);
    const isPremiumUser=decodeToken.ispremiumuser;
    console.log(isPremiumUser);
    
    if (decodeToken.ispremiumuser) {
        document.getElementById('premium').style.display = 'none';
        // document.getElementById('premiumuser').style.display = 'block';
        document.getElementById('premiummessage').style.display='block';
        document.getElementById('btn_leader_board').style.display='block';
        
    } else {
        document.getElementById('premium').style.display = 'block';
        document.getElementById('premiummessage').style.display = 'none';
    }
    // Function to check if user is a premium member
    
      // Call checkPremiumUser after user logs in or reloads the page
     
 
// const user=response.data;
// console.log("USer:",user);
    console.log("Expense Tracker Main JS");
    
    btnLeaderBoard.onclick = async () => {
        try {
            leaderBoardTitle.textContent = "Leader Board:";
            console.log("token in leaderboard",token)
            const response = await axios.get("http://localhost:3000/premium/showleaderboard",
                { headers: { Authorization: token } }
            );
            const data = response.data;
            console.log("data in leaderboard js ",data)
            // showTotalExpense(data)
            leaderBoardList.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                showLeaderBoard(data[i]);
            }
        } catch (error) {
            console.log(error);
        }
    
    };
    const showLeaderBoard = (obj) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent =
            "Name" +
            " - " +
            obj.name +
            " " +
            " " +
            "Total Expenses" +
            " - " +
            obj.totalExpense;
        leaderBoardList.appendChild(li);
    }
    // btnLeaderBoard.onclick = async () => {
    //     try {
    //         leaderBoardTitle.textContent = "Leader Board";
    //         const response = await axios.get("http://localhost:3000/premium/showleaderboard",
    //             { headers: { Authorization: token } }
    //         );
    //         const data = response.data;
    //         // showTotalExpense(data)
    //         leaderBoardList.innerHTML = "";
    //         for (let i = 0; i < data.length; i++) {
    //             showLeaderBoard(data[i]);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    
    // };


    document.getElementById('premium').onclick=async function(e){
        
       
        console.log("token in premium:",token);
        // if (!token || parseJwt(token).ispremiumuser) {
        //     // Handle user not being a premium member
        //     return;
        // }
        try{
            console.log("Making request to get premium membership...");
            const response=await axios.get('http://localhost:3000/users/premium/premiummembership',{
            headers:{'Authorization':token}});

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

                 alert('You are Premium User Now');
                 document.getElementById('premium').style.display = 'none';

                 document.getElementById('premiummessage').style.display='block';
                 document.getElementById('btn_leader_board').style.display='block';
        
                //  ispremium();
                // document.getElementById('premium').style.visibility='hidden';

                localStorage.setItem('token',res.data.token);
                console.log("updated token:",res.data.token);   
              
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
    const showpagination = ({
        currentPage,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
        lastPage,
    }) => {
        pagination.innerHTML = "";
        if (hasPreviousPage) {
            const btn2 = document.createElement("button");
            btn2.innerHTML = previousPage;
            btn2.addEventListener("click", () => showExpenses(previousPage));
            pagination.appendChild(btn2);
        }
        const btn1 = document.createElement("button");
        btn1.innerHTML = `<h3>${currentPage}</h3>`;
        btn1.addEventListener("click", () => showExpenses(currentPage));
        pagination.appendChild(btn1);
    
        if (hasNextPage) {
            const btn3 = document.createElement("button");
            btn3.innerHTML = nextPage;
            btn3.addEventListener("click", () => showExpenses(nextPage));
            pagination.appendChild(btn3);
        }
        if (lastPage > 2 && lastPage > nextPage) {
            const btn4 = document.createElement("button");
            btn4.innerHTML = lastPage;
            btn4.addEventListener("click", () => showExpenses(lastPage));
            pagination.appendChild(btn4);
        }
    }
    

    // Function to clear input fields
    function clearFields() {
        document.getElementById('amount').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = '';
        console.log("Fields cleared");
    }
    


    // Add event listener for form submission
    const expenseForm = document.getElementById('expense-form');
    expenseForm.addEventListener('submit', handleFormSubmission);

    // Fetch and display expenses on page load
    fetchAndDisplayExpenses();
    const btnSignOut=document.getElementById('btn_Sign_out');
 
    function handleSignOut() {
       window.location.href = './login.html'; // Adjust the path as per your file structure
   }
   
   btnSignOut.addEventListener("click", handleSignOut);
});
