Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
// Array.of()方法用于将一组值，转换为数组

// 这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
// Array.of()基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统

function Arrayof(...args){
  return [].slice.call(args)
}
console.log('Arrayof',Arrayof(3,23,2,13));