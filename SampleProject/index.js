let totalcost=0;
 function storeToLocal(e)
{
    e.preventDefault();
    const ProductPrice=document.getElementById("price").value;
    const ProductName=document.getElementById("name").value;
   
    const obj1={
            ProductPrice,
            ProductName
    }

    axios.post('https://crudcrud.com/api/9d54e2405031484a9c37dae1526e4e51/ProductData',obj1)
     .then((res)=>{
        showOnScreen(res.data);
     })
     .catch((err) => console.log(err))
     
  
}

window.addEventListener("DOMContentLoaded",()=> {
    axios.get('https://crudcrud.com/api/9d54e2405031484a9c37dae1526e4e51/ProductData')
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

function deleteUser(productId)
{
    axios.delete(`https://crudcrud.com/api/9d54e2405031484a9c37dae1526e4e51/ProductData/${productId}`).then((response) => {
            console.log(response);
            const ProductPrice=document.getElementById(productId).innerText.split('-')[0];

            removeFromScreen(productId,response.data.ProductPrice);
            })
        .catch((err) => {
            console.log(err)
        })

}

function removeFromScreen(productId)
{
    const parentNode = document.getElementById('list');
                const childNodeToBeDeleted = document.getElementById(productId);
                if(childNodeToBeDeleted) {
                    parentNode.removeChild(childNodeToBeDeleted)
                }
                totalcost-=Number(ProductPrice);
                document.getElementById("TotalCost").innerText="Total Cost: "+totalcost;
}












// let totalprice=0
// function crud(event){
//     event.preventDefault();
//     let price=event.target.num.value;
//     let name=event.target.name.value;

//     let obj=
//     {
//         price:price,
//         name:name
//     }

//     axios.post("https://crudcrud.com/api/942de34096ba4b5791e619f130133308/ecom",obj)
//     .then((res)=>{
//         showuser(res.data)
//         console.log(totalprice);
//         totalprice +=Number(price);
//         displayTotalPrice(totalprice);
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// }
// axios.get("https://crudcrud.com/api/942de34096ba4b5791e619f130133308/ecom")
// .then((res)=>{
//     totalprice = res.data.reduce((acc, item) => acc + item.price, 0);
//         displayTotalPrice(totalprice);
//     for(let i=0;i<res.data.length;i++)
//     {
//         console.log(res.data[i]);
//         showuser(res.data[i]) 
//     }
// })
// .catch((err)=>{
//     console.log(err)
// })

// function showuser(obj){
//     let parent=document.getElementById('listItem');
//     let child=document.createElement('li');
//     child.textContent= obj.price+" - "+ obj.name;

//     let deletebut=document.createElement('input');
//     deletebut.type="button";
//     deletebut.value="Delete Product"

//     child.appendChild(deletebut);
//     parent.appendChild(child)


//     deletebut.addEventListener('click',deleteuser)

//     function deleteuser(){
//         axios.delete(`https://crudcrud.com/api/942de34096ba4b5791e619f130133308/ecom/${obj._id}`)
//         .then(()=>{
//             parent.removeChild(child);
//             totalprice -= obj.price;
//             console.log(totalprice);
//             displayTotalPrice(totalprice);
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
//     }

// }

// function displayTotalPrice(total) {
//     let totalPriceElement = document.getElementById('TotalCost');
//     totalPriceElement.textContent = "Total Value worth of Products:" + total; 
// }

