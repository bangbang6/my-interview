new Promise((resolve,reject)=>{
  resolve()
  console.log(1)
}).then(res=>{
  console.log(3)
})
console.log(2)
setTimeout(()=>{
  console.log(4)
},0)