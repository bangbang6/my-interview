Array.prototype.myEvery = function(cb,context){
  let arr= this
  let flag = true
  for(let i = 0;i<arr.length;i++){
    if(!cb.apply(context,[arr[i],i])){
      flag = false
      break
    }
  }
  return flag
}
Array.prototype.mySome = function(cb,context){
  let arr= this
  let flag = false
  for(let i = 0;i<arr.length;i++){
    if(cb.apply(context,[arr[i],i])){
      flag = true
      break
    }
  }
  return flag
}

var users = [
  {id: 1, name: '张三'},
  {id: 2, name: '张三'},
  {id: 3, name: '张三'},
  {id: 4, name: '张三'}
]
  var aa=users.myEvery(function(v,index){
  	return v.id>=0;
  })
  console.log(aa)