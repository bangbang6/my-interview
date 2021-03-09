//冒泡排序
function bubbleSort(arr){
  let len = arr.length
  if(len <2){
    return arr
  }

  for(let i = 1;i<len;i++){
    for(let  j = 0;j<i;j++){
      if(arr[j] > arr[i]){
        const temp = array[j]
        array[j] = array[i]
        array[i] = temp
      }
    }
  }
  return arr
}