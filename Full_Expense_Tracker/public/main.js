

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
        document.getElementById('btn_download').style.display='block';
        
    } else {
        document.getElementById('premium').style.display = 'block';
        document.getElementById('premiummessage').style.display = 'none';
    }
    // Function to check if user is a premium member
    
      // Call checkPremiumUser after user logs in or reloads the page
     
 
// const user=response.data;
// console.log("USer:",user);
    console.log("Expense Tracker Main JS");
    const btnLeaderBoard = document.getElementById("btn_leader_board");
const leaderBoardTitle = document.getElementById("leader_board_title");
const leaderBoardTable = document.getElementById("leader_board_table");

    document.getElementById('home_btn').onclick=function(){

window.location.href='./main.html';

    document.getElementById('expense-form-container').style.display='block';
        document.getElementById('expenses-container').style.display='block';
        document.getElementById('leaderboard-container').style.display = 'none';
    }; 



btnLeaderBoard.onclick = async () => {
    try {
        document.getElementById('expense-form-container').style.display='none';
        document.getElementById('expenses-container').style.display='none';
        document.getElementById('leaderboard-container').style.display = 'block';
        console.log("style updated")
        leaderBoardTitle.textContent = "Leader Board:";
        console.log("token in leaderboard", token);
        const response = await axios.get("http://localhost:3000/premium/showleaderboard", {
            headers: { Authorization: token }
        });
        const data = response.data;
        console.log("data in leaderboard js ", data);
        renderLeaderBoard(data);
    } catch (error) {
        console.log(error);
    }
};

const renderLeaderBoard = (data) => {
    // Clear existing table content
    
    leaderBoardTable.innerHTML = "";
  
// Create the <thead> element
const thead = document.createElement("thead");

const headerRow = document.createElement("tr");

const positionHeader = document.createElement("th");
positionHeader.textContent = "Position";

const nameHeader = document.createElement("th");
nameHeader.textContent = "Name";

const totalExpensesHeader = document.createElement("th");
totalExpensesHeader.textContent = "Total Expenses";

headerRow.appendChild(positionHeader);
headerRow.appendChild(nameHeader);
headerRow.appendChild(totalExpensesHeader);

thead.appendChild(headerRow);

leaderBoardTable.appendChild(thead);

const tbody = leaderBoardTable.querySelector("tbody");
if (tbody) {
    tbody.style.backgroundColor = "#ecfaff"; // Example background color
    tbody.style.fontFamily = "'Roboto', sans-serif"; // Example font family
    tbody.style.fontSize = '16px'; // Example font size
    tbody.style.color = '#333';// Add more style properties as needed
}

    // Populate table with leaderboard data
    for (let i = 0; i < data.length; i++) {
        const row = leaderBoardTable.insertRow();
        const positionCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const totalExpensesCell = row.insertCell(2);
        positionCell.textContent = i + 1; // Position starts from 1
        nameCell.textContent = data[i].name;
        totalExpensesCell.textContent = data[i].totalExpense;
    }
};

const btnDownload=document.getElementById('btn_download');
btnDownload.onclick=async function(){
    try{
     const response=    axios.get('http://localhost:3000/users/download', { headers: {"Authorization" : token} });

     
         if(response.status === 200){
             //the bcakend is essentially sending a download link
             //  which if we open in browser, the file would download
             var a = document.createElement("a");
             a.href = response.data.fileUrl;
             a.download = 'myexpense.csv';
             document.body.appendChild(a); 
             a.click();
             document.body.removeChild(a); 
             }else if (response.data && response.data.message) {
                console.log(response.data.message);
            }
         else {
            console.log('File not available');
            // throw new Error(response.data.message)
        }
    }
    catch(err) {
        // showError(err)
        console.log(err);
    }
};


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
                 document.getElementById('btn_download').style.display='block';
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
        const token = localStorage.getItem('token');
        if (!token) {
            // Handle case when token is not present
            console.error('No token found');
            return;
        }
        const expensesResponse = await axios.get('/users/expenses', {
            headers: { 'Authorization': `${token}` }
        });
        const expenses = expensesResponse.data;
        const expensesBody = document.getElementById('expenses-body');
        expensesBody.innerHTML = ''; // Clear existing table body
        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${expense.category}</td>
                
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
                <td><button class="edit-button" data-id="${expense.id}">Edit</button></td>
                <td><button class="delete-button" data-id="${expense.id}">Delete</button></td>
            `;
            // Add event listeners to edit and delete buttons
            const editButton = row.querySelector('.edit-button');
            editButton.addEventListener('click', () => {
                editExpense(expense);
            });
            const deleteButton = row.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => {
                deleteExpense(expense.id);
            });
            expensesBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
    }
}

    // Function to fetch and display expenses
    // async function fetchAndDisplayExpenses() {
    //     try {
    //         const token=localStorage.getItem('token');
    //         if (!token) {
    //             // Handle case when token is not present
    //             console.error('No token found');
    //             return;
    //         }
    //         const expensesResponse = await axios.get('/users/expenses',{
    //             headers:{'Authorization':`${token}`}});
    //         const expenses = expensesResponse.data;
    //         const itemsList = document.getElementById('items');
    //         itemsList.innerHTML = ''; // Clear existing list items
    //         expenses.forEach(expense => {
    //             const listItem = document.createElement('li');
    //             listItem.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;

    //             // Add "Edit" button
    //             const editButton = document.createElement('button');
    //             editButton.textContent = 'Edit';
    //             editButton.type = 'button';
    //             editButton.addEventListener('click', () => {
    //                 // Handle edit button click
    //                 editExpense(expense);
    //             });
    //             listItem.appendChild(editButton);

    //             // Add "Delete" button
    //             const deleteButton = document.createElement('button');
    //             deleteButton.textContent = 'Delete';
    //             deleteButton.type = 'button'; 
    //             deleteButton.addEventListener('click', () => {
    //                 // Handle delete button click
    //                 deleteExpense(expense.id);
    //             });
    //             listItem.appendChild(deleteButton);

    //             itemsList.appendChild(listItem);
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

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
