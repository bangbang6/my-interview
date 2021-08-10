class Promise {
  
}

let p = new Promise((resolve,rej)=>{
  console.log(1);
  resolve()
  console.log(2);
})
p.then(res=>{
  console.log(3);
})
console.log(4);