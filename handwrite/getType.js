function getType(obj){
  return Object.prototype.toString.call(obj).replace('[object' ,'').replace(']','')
  // if(obj === null) return String(obj)
  // return typeof obj === 'object'?Object.prototype.toString.call(obj).replace('[object' ,'').replace(']',''):typeof obj
}// 调用
console.log(getType(null), // -> null
getType(undefined), // -> undefined
getType({}), // -> object
getType([]), // -> array
getType(123), // -> number
getType(true), // -> boolean
getType('123'), // -> string
getType(/123/), // -> regexp
getType(new Date())); // -> date)