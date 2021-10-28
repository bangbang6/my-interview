function myInstanceof (ex,classfunc){
  let proto = Object.getPrototypeOf(ex)
  while(true){
    if(proto === null) return false
    if(classfunc.prototype == proto){
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
}
let arr = [1,2,3]
console.log(myInstanceof(arr,Function))