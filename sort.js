function bubbleSort(arr){
  let len = arr.length
  for(let i = 0;i<len;i++){
    for(let j = 0;j<len-1-i;j++){
      if(arr[j]>arr[j+1]){
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
      }
    }
  }
  return arr
}
let arr =[1,2,2,4,4,3,8,5,4,3]
console.log('arr',bubbleSort(arr));


function selectionSort(arr){
  let len = arr.length
  for(let i = 0;i<len;i++){
    let min = i
    if(arr[i]<arr[min]){
      min = i
    }
    if(arr[min]<arr[i]) [arr[min],arr[i]] = [arr[i],arr[min]]
  }
  return arr
}
console.log('arr',selectionSort(arr));
