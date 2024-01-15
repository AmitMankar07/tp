
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


const obj1 = {'key1': 1 , 'key2' : 2}

const obj2 = { ...obj1, key1: 1000}



console.log(obj1)

console.log(obj2)