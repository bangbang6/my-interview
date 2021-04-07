function deepClone(obj){
  //typeof只能判断基本类型+object+function 其他的对象都是在object里
  if(typeof obj !== 'object'  ||obj === null){
    return obj
  }
  
  let result
  
  if(obj instanceof Array ){
    result = []
  }else{
    
    result = {}
  }
 
  //数组也能通过 for in遍历 
  for(let key in obj){
    //除去隐士原型上不需要赋值的属性
    if(obj.hasOwnProperty(key)){
      result[key] = deepClone(obj[key])
    }
  }
  return result
}


let test = {
  name:"帮",
  address:{
    "age":11,
  },
  ids:[1,2,3]
}
const test2  = deepClone(test)
test2.name = '振'
console.log(test2,test);