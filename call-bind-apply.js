// Function.prototype.myCall = function(ctx,...args){
// 	//ctx是需要修改成的this对象 this是执行的函数
// 		ctx = ctx || window
// 	ctx.fn = this
// 	let res = eval('ctx.fn(...args)')
// 	return res
// }

// Function.prototype.myApply = function(ctx,args){
// 	ctx = ctx || window
// 	ctx.fn = this
// 	let res = eval('ctx.fn(...args)')
// 	return res
// }

// Function.prototype.myBind = function(ctx,...args){
//   let self = this
// 	function fn(){
// 		return self.call(ctx,...args)
// 	}
// 	//ctx是修改后的this对象 this是函数
	
// 	return fn
// }
// function test(n1,n2,n3){
//   console.log(this.name);
//   return n2
// }
//  let fn = test.myBind({name:'bang'},1,2,3)

 
//  console.log( fn())

Function.prototype.myCall = function(ctx=window,...args){
	let fn = this
	ctx.fn = this
	const result = ctx.fn(...args)
	delete ctx.fn //删除挂载的属性
	return result
}
Function.prototype.myBind= function(ctx=window,...args){
	let fn = this
	return function Bind(...newargs){
		ctx.fn = fn
		let result = ctx.fn(...newargs)
	delete ctx.fn //删除挂载的属性

		return result
	}
}
function test(n1,n2,n3){
  console.log(this.name);
  return n2
}
console.log(test.myCall({name:'bang'},1,2,3))
console.log(test.myBind({name:'bang'})(1,2,3))