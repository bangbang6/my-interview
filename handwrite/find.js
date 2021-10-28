Array.prototype.myFind = function(cb){
  let arr = this
  for(let i = 0;i<arr.length;i++){
    if(cb(arr[i],i)){
      return arr[i]
    }
  }
}
Array.prototype.myFindIndex = function(cb){
  let arr = this
  for(let i = 0;i<arr.length;i++){
    if(cb(arr[i],i)){
      return i
    }
  }
}
var users = [
  {id: 1, name: '张三'},
  {id: 2, name: '张三'},
  {id: 3, name: '张三'},
  {id: 4, name: '张三'}
]
var ret = users.myFindIndex(function (item, index) {
  return item.id === 2
})

console.log(ret)