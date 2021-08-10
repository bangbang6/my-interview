## 1.bind函数

```js
Function.prototype.myBind = function(...args){
  if(args.length<1){
    return
  }  
  let ctx = args.shift()
  let fn = this //外部调用Bind的函数 即我们真正要执行的函数
  return function(){
    return fn.apply(ctx,args)
  }
}
```

## 2.apply函数

都是在bind基础上加一个eval执行而已

```js
Function.prototype.myApply = function(ctx,args){
	ctx = ctx || window
	ctx.fn = this //这个this就是需要执行的函数
	let res = eval('ctx.fn(...args)')
	return res
}
```

## 3.call函数

```js
Function.prototype.myCall = function(ctx,...args){
	//ctx是需要修改成的this对象 this是执行的函数
		ctx = ctx || window
	ctx.fn = this
	let res = eval('ctx.fn(...args)')
	return res
}
```

