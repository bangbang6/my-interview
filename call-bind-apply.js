Function.prototype.myCall = function(ctx,...args){
	//ctx是需要修改成的this对象 this是执行的函数
		ctx = ctx || window
	ctx.fn = this
	let res = eval('ctx.fn(...args)')
	return res
}

Function.prototype.myApply = function(ctx,args){
	ctx = ctx || window
	ctx.fn = this
	let res = eval('ctx.fn(...args)')
	return res
}

Function.prototype.myBind = function(ctx,...args){
  let self = this
	function fn(){
		return self.call(ctx,...args)
	}
	//ctx是修改后的this对象 this是函数
	
	return fn
}
function test(n1,n2,n3){
  console.log(this.name);
  return n2
}
 let fn = test.myBind({name:'bang'},1,2,3)

 
 console.log( fn())