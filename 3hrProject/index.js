let totalcost=0;
const ProductPrice=document.getElementById("price").value;
const ProductName=document.getElementById("name").value;
 async function storeToLocal(e)
{
    e.preventDefault();
    const ProductPrice=document.getElementById("price").value;
    const ProductName=document.getElementById("name").value;

    const obj1={
            ProductPrice,
            ProductName
    }
    try{
       const res=await axios.post('https://crudcrud.com/api/943315142946419f9809660bc688e2c8/ProductData',obj1);
       showOnScreen(res.data);
    }catch(err){
        console.log(err);
    }
}

window.addEventListener("DOMContentLoaded",()=> {
    axios.get('https://crudcrud.com/api/943315142946419f9809660bc688e2c8/ProductData')
     .then((res) =>{
        for(var i=0;i<res.data.length;i++)
        {
         showOnScreen(res.data[i])
        }
     })
     .catch((err) => console.log(err))
})

function showOnScreen(products)
{
    document.getElementById("price").value='';
    document.getElementById("name").value='';

    const productId=products._id;
    const parentNode = document.getElementById('list');
    const childHTML = `<li id=${products._id}> ${products.ProductPrice} - ${products.ProductName} 
                            <button onclick=deleteUser('${products._id}')> Delete product</button>
                            <button onclick=editUserDetails('${products.ProductPrice}','${products.ProductName}','${products._id}')>Edit Product</button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
    totalcost+=Number(products.ProductPrice);

    document.getElementById("TotalCost").innerText="Total Cost: "+totalcost;
}

function editUserDetails(ProductPrice,ProductName,productId)
{
    document.getElementById("price").value=ProductPrice;
    document.getElementById("name").value=ProductName;
   deleteUser(productId)
}


function deleteUser(productId) {
    
    const productToDelete = document.getElementById(productId).innerText.split('-');
    const ProductPrice = productToDelete[0].trim();

    axios.delete(`https://crudcrud.com/api/943315142946419f9809660bc688e2c8/ProductData/${productId}`)
        .then((response) => {
            removeFromScreen(productId, ProductPrice);
        })
        .catch((err) => {
            console.log(err);
        });
}
function removeFromScreen(productId, ProductPrice) {
    const parentNode = document.getElementById('list');
    const childNodeToBeDeleted = document.getElementById(productId);
    
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }

    totalcost -= Number(ProductPrice);
    document.getElementById("TotalCost").innerText = "Total Cost: " + totalcost;
    console.log(totalcost);
}
