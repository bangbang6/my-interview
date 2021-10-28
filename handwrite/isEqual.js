function isEqual(obj1,obj2){
  //只有都是对象才会递归 不是的话 直接等去比较
    if(!isObject(obj1) || !isObject(obj2)){
      return obj1 === obj2
    }
    function isObject(obj){
      return typeof obj === "Object"
    }
    //都是对象啦

    if(obj1 === obj2){
      return true
    }
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    if(keys1.length!==keys2.length){
      return false
    }
    for(let key in obj1){
      if(!isEqual(obj1[key],obj2[key])){
        return false
      }
    }
    return true
}