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

function insertSort(arr){
  for(let i = 1;i<arr.length;i++){
    let j = i //因为i这个位置需要被占领 一边后移动一边比较不用找到位置在插入
    let temp = arr[i]
    while(j>0 && arr[j-1]>tmp){
      arr[j]=arr[j-1]
      j--
    }
    arr[j]= temp
  }
  return arr
}
console.log('insertrArr',arr)

function mergeSort(arr){
  let len = arr.length
  let middle = Math.ceil(len/2)
  if(len === 0) return []
  if(len === 1) return arr
  let left = arr.slice(0,middle)
  let right = arr.slice(middle)
  return merge(mergeSort(left),mergeSort(right))
}
function merge(left,right){
  let l =0
  let r = 0
  let result = []
  while(l<left.length && r<right.length){
    if(left[l]<right[r]){
      result.push(left[l])
      l++
    }else{
      result.push(right[r])
      r++
    }
  }
  result.concat(left.slice(l)).concat(right.slice(r))
}
console.log('mergeArr',arr)

function quickSort(arr){
  let len = arr.length
  
  main(arr,0,len-1)
  return arr
  function main(arr,left,right){
    if(left>=right) return
    let index = partion(arr,left,right)
    main(arr,0,index)
    main(arr,index+1,right)
  }
  function partion(arr,left,right){
    let pivot = arr[left]
    while(left<right){
      while(left<right && arr[right]>=pivot) right--;
      nums[left] = nums[right]
      while(left<right && arr[left]<=pivot) left++;
      nums[right] = nums[left]
    }
    nums[left] = pivot
    return left

  }
}
console.log('quickArr',arr)


function heapSort(arr){
  bulidHeap(arr) //初始化创建堆
  for(let i = arr.length-1;i>=0;i--){
    let temp = arr[0]
    arr[0]=arr[i]
    arr[i]=temp
    heapify(arr,i,0) //比较的范围小于i  只是对0这个元素的儿子进行找最大 其他的不用动
  }
  return arr
  function buildHeap(arr){
    let mid = Math.floor(arr.length/2)
    for(let i = mid;i>=0;i--){
      heapify(arr,arr.length,i)
    }
  }
  /**
   * 关键函数 
   * @param {*} arr 
   * @param {*} maxSize 最大的索引值  不等于 
   * @param {*} begin 这个索引值进行向下儿子比较
   */
  function heapify(arr,maxSize,begin){
    
    let left = begin*2+1
    let right = begin*2+2
    let largest = begin
    if(left<maxSize && arr[left]>arr[largest]){
      largest = left;
    }
    if(right<maxSize && arr[right]>arr[largest]){
      largest = right;
    }
    if(largest!=begin){
      let temp = arr[begin]
    arr[begin] = arr[largest]
    arr[largest] =temp
    heapify(arr,maxSize,largest)
    }
    
  }
}
console.log('heapArr',arr)
