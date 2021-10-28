Array.prototype.myFilter = function(cb,context){
  let arr= this
  let newArr = []
  for(let i = 0;i<arr.length;i++){
    if(cb.apply(context,[arr[i],i])){
      newArr.push(arr[i])
    }
  }
  return newArr
}

Array.prototype.myMap = function(cb,context){
  let arr= this
  let newArr = []
  for(let i = 0;i<arr.length;i++){
   
      newArr.push(cb.apply(context,[arr[i],i]))
    
  }
  return newArr
}
var users = [
  {id: 1, name: '张三'},
  {id: 2, name: '张三'},
  {id: 3, name: '张三'},
  {id: 4, name: '张三'}
]
var ret = users.myMap(function (item, index) {
  return {
    id:`1`
  }
})

console.log(ret)