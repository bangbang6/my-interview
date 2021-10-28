function distinct(arr){
  return arr.filter((item,index)=>{
    return arr.indexOf(item) === index
  })
}
var resources = [
  { name: "张三", age: "18" },
  { name: "张三", age: "18" },
  { name: "张三", age: "20" },
  { name: "李四", age: "19" },
  { name: "王五", age: "20" },
  { name: "赵六", age: "21" }
]
console.log(distinct([1,3,,21,3,123,,4,123,,12,4,233,,523,1,]))

function objectDis(arr){
  let res= {}
  let resArr = []
  for(let i = 0;i<arr.length;i++){
    res[arr[i].name] = arr[i]
  }
  for(let key in res){
    resArr.push(res[key])
  }
  return resArr
}
console.log(objectDis(resources))
