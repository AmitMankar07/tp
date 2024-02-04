
// const product=(n1,n2)=>{
//     return n1*n2;
// }

// console.log(product(10,20));

// const Student={
//     name:'Amit',
//     age:22,
//     College:'KITS college'
// }
// console.log(Student);

let array=['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon'];
let newarray=array.map(item=>item===' '?'empty string':item);

const copyarray=[...array];
console.log(copyarray);

console.log(newarray);

console.log('a');
console.log('b');

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncCall() {
    await timeout(3000);
    console.log('c');
    await timeout(0);
    console.log('d');
    console.log('e');
}

asyncCall();
