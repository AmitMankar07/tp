var form=document.getElementById('addForm');
var itemList=document.getElementById('items');


form.addEventListener('submit',addItem);
itemList.addEventListener('click',removeItem);

//add item
function addItem(e){
    e.preventDefault();

    var newItem=document.getElementById('item').value;

    //new li item
    var li=document.createElement('li');
    li.className='list-group-item';

    li.appendChild(document.createTextNode(newItem));

     //edit button
     var editbutn=document.createElement('button');
     editbutn.className="btn btn-danger btn-sm float-right Edit";
     editbutn.appendChild(document.createTextNode('Edit'));
     li.appendChild(editbutn);

     //delete buttn
    var deletebtn=document.createElement('button');
    deletebtn.className='btn btn-danger btn-sm float-right delete';
    deletebtn.appendChild(document.createTextNode('X'));
    li.appendChild(deletebtn);

    itemList.appendChild(li);
}

//rmemove item

function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li=e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}
