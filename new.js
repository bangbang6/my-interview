function New(Fn,...args){
	let obj = Object.create(Fn.prototype) //表示obj.__proto__ = fn.prototype  这个顺便就绑定了this为fn的实例
	let res = Fn.apply(obj,args)

	return typeof res === 'object' ? res || obj : obj
}


function test(age){
  this.name = 'jack'
  this.age = age
}
let t = New(test,18)
console.log(t);