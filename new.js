function New(Fn,...args){
	let obj = Object.create(Fn.prototype)
	let res = Fn.apply(obj,args)

	return typeof res === 'object' ? res || obj : obj
}


function test(age){
  this.name = 'jack'
  this.age = age
}
let t = New(test,18)
console.log(t);