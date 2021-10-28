Array.prototype.myMap=function(cb,context){
  let copyArr = Array.prototype.slice.call(this)
  let result = []
  for(let i = 0;i<copyArr.length;i++){
    result[i] = cb.call(context,copyArr[i],i)
  }
  return result
}
console.log([1,2,3].myMap(a=>a*2))


Array.prototype.myReduce=function(cb,initVal){
  let copyArr = Array.prototype.slice.call(this)

  let res =  initVal == undefined?copyArr[0]:initVal
  
  let startIndex =   initVal === undefined?1:0
  for(let i = startIndex;i<copyArr.length;i++){
    res = cb.call(null,res,copyArr[i],i)
  }
  return res
}
console.log([1,2,3].myReduce((a,b)=>a+b))
