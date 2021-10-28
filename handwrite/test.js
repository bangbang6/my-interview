new Promise((resolve,reject)=>{
  console.log(1)
 reject(6)
  console.log(2)
 
  
  
}).then(_=>{
  console.log(3)
}).catch(e=>{
  console.log(4)
})