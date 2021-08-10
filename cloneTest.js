/* 对象的拷贝 */
let obj = {a:1,b:{c:1}}
let obj2 = {...obj}
 obj.a = 2
console.log(obj)  //{a:2,b:{c:1}} 
console.log(obj2); //{a:1,b:{c:1}} 
obj.b.c = 2
console.log(obj)  //{a:2,b:{c:2}} 
console.log(obj2); //{a:1,b:{c:2}}
 /* 数组的拷贝 */
// let arr = [1, 2, 3];
// let newArr = [...arr]; //跟arr.slice()是一样的效果 