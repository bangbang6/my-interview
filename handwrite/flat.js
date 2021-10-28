function flat(arr){
let result = []
  
  for(let i = 0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
     result = result.concat(flat(arr[i]))  //!concat的返回值是最新数组 本身不会变 push是本身会变 返回值是长度
    }else{
      result = result.concat(arr[i])
    }
  }
  return result
}
let ary = [1, [2, [3, [4, 5]]], 6];
console.log('xx',flat(ary));



