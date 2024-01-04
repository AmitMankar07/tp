var buttn=document.getElementById('butn');
var productList=document.getElementById('Products');
var products=[];
var totalCost=0;

buttn.addEventListener('click',clickHandler);
productList.addEventListener('click',removeItem);
productList.addEventListener('click',editItem);

document.addEventListener('DOMContentLoaded', retrieveData);

function retrieveData() {
  axios.get("https://crudcrud.com/api/afa2b0a872134eaea2ede4d2a0bb9882/ProductData")
    .then((response) => {
      products = response.data;
      products.forEach((product) => {
        addItemToList(product.pname, product.pprice, product._id);
        Number(totalCost)+=Number(pprice);
      });
      updateTotalCost();
    })
    .catch(err => {
      console.log(err);
    });
}

// async function retrieveData() {
//   try {
//     const response = await axios.get("https://crudcrud.com/api/afa2b0a872134eaea2ede4d2a0bb9882/ProductData");
//     const products = response.data;
//     products.forEach((product) => {
//       addItemToList(product.pname, product.pprice, product._id);
//       Number(totalCost) += Number(product.pprice);
//     });
//     updateTotalCost();
//   } catch (err) {
//     console.log(err);
//   }
// }


function addItemToList(pname, pprice,productId) {
  var newItem = pname + "-" + pprice;
  const li = document.createElement('li');
  li.id=productId;
  li.className = 'items';
  li.appendChild(document.createTextNode(newItem));
  
   //delete butn
  var delbtn=document.createElement('button');
  delbtn.className="delete float-right";
  delbtn.appendChild(document.createTextNode('delete'));
  li.appendChild(delbtn);

  //edit buutn
  var editbutn=document.createElement('button');
  editbutn.className="edit float-right";
  editbutn.appendChild(document.createTextNode('edit'));
  li.appendChild(editbutn);

  
  productList.appendChild(li);
  totalCost += Number(pprice);
  updateTotalCost();
}

// function calculateTotalCost(){
//     let totalCost=0;
//     for(let i=0;i<products.length;i++){
//         totalCost+=products[i].pprice;
//     }
//     return totalCost;
// }

function updateTotalCost(){
    const totalCostElement=document.getElementById('TotalCost');

    console.log(totalCost);
    totalCostElement.textContent=`Total Value worth of Products:${totalCost}`;
}


function clickHandler(event){
    event.preventDefault();
    console.log("event");
    const pname=document.getElementById('Pname').value;
    const pprice=document.getElementById('Pprice').value;
    const product = {
        pname,
        pprice,
      };
      const userJson = JSON.stringify(product);

      //post data into the crud server
      axios.post("https://crudcrud.com/api/afa2b0a872134eaea2ede4d2a0bb9882/ProductData",product)
      .then((response)=>{
        console.log(response)
      })
      .catch(err=>{
        console.log(err);
      })

      //get data from the crud
      
      
      
        //new item
      var newItem=pname+"-"+pprice;
      const li = document.createElement('li');
      li.className = 'items';
      li.appendChild(document.createTextNode(newItem));
      
      //delete butn
      var delbtn=document.createElement('button');
      delbtn.className="delete float-right";
      delbtn.appendChild(document.createTextNode('delete'));
      li.appendChild(delbtn);

      //edit buutn
      var editbutn=document.createElement('button');
      editbutn.className="edit float-right";
      editbutn.appendChild(document.createTextNode('edit'));
      li.appendChild(editbutn);

      productList.appendChild(li);
      totalCost+=Number(pprice);
      updateTotalCost();
    }
   
    
    function removeItem(e) {
        if (e.target.classList.contains('delete')) {
          if (confirm('Are you sure?')) {
            var li = e.target.parentElement;
            var productId = li.id;
            console.log(li);
     
            // Get the price of the product from the list item's text
            var productText = li.textContent;
            console.log(productText);
            var productPrice = productText.split('-')[1].split('delete')[0].trim();
            console.log(productPrice);
            // Check if productPrice is a number
           
              totalCost -= Number(productPrice);
              updateTotalCost();
            
      
            axios.delete(`https://crudcrud.com/api/afa2b0a872134eaea2ede4d2a0bb9882/ProductData/${productId}`)
              .then((response) => {
                console.log(response);
              
              })
              .catch((error) => {
                console.log(error);
              });
              productList.removeChild(li);
          }
        }
      }
      
      

    function editItem(e){
      if(e.target.classList.contains('edit')){
         
    const listItem = e.target.parentElement;
    const ProductText = listItem.textContent;
    const [pname, pprice] = ProductText.split('-');
        const productId=listItem.id;
    
        axios.delete(`https://crudcrud.com/api/afa2b0a872134eaea2ede4d2a0bb9882/ProductData/${productId}`)
        .then((response) => {
          console.log(response);
          productList.removeChild(listItem);
        })
        .catch((error) => {
          console.log(error);
        });
        totalCost -= Number(oldPrice);

        document.getElementById('Pprice').value = pprice;
        document.getElementById('Pname').value = pname;

    //   const newPrice = parseFloat(prompt("Enter the new price:"));
    // const newName = prompt("Enter the new name:");

    // // Add the new price to the total cost
    // totalCost += newPrice;

    // // Update the total cost display
    // updateTotalCost();

    // // Add the updated product to the list
    // addItemToList(newName, newPrice, productId);
      }
    //   updateTotalCost();
    }