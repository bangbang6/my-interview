function chunk(arr,length){
  let res = []
  for(let i = 0;i<arr.length;i=i+length){
    res.push(arr.slice(i,i+length))
  }
  return res
}
console.log(chunk(['a', 'b', 'c', 'd'], 3))

