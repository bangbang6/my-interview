'use strict'
window.name = 'xx'
class A{
  constructor(){
    this.name = 'bb'
  }
}
A.prototype.getA=function(){
  return function(){
    console.log(this)
    console.log(this.name)
  }
}

let a = new A()
let b = a.getA()
b() //报错 严格模式下没定义的this不会找全局变量

/* let x = 5

let fn = function(x){
  return function(y){
    console.log('x',x); //6
    return y+(++x)
  }
}
let f = fn(6)
console.log(f(7)) //14 */