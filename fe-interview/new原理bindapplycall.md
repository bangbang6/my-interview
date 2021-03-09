#### new关键词

1.一定返回一个对象，要么是实例对象要么是函数retutn的对象

返回是一个对象

![image-20210309093058691](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210309093058691.png)

返回不是对象或者没返回

则new 返回的就是实例



#### new object 和 object.create()的区别

![image-20210309094337446](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210309094337446.png)

```js
// new Object() 方式创建
var a = {  rep : 'apple' }
var b = new Object(a)
console.log(b) // {rep: "apple"}
console.log(b.__proto__) // {}
console.log(b.rep) // {rep: "apple"}

// Object.create() 方式创建
var a = { rep: 'apple' }
var b = Object.create(a)
console.log(b)  // {}
console.log(b.__proto__) // {rep: "apple"}
console.log(b.rep) // {rep: "apple"}
```



#### new实现

**注意继承** 然后用call改变this

```js
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
```

#### apply/call实现

原理使用eval来立即执行函数 

 

```js
Function.prototype.myCall = function(ctx,...args){
	//ctx是需要修改成的this对象 this是执行的函数
	ctx = ctx || window
	ctx.fn = this
	let res = eval('ctx.fn(...args)')
	return res
}
```

```js
Function.prototype.myApply = function(ctx,args){
	ctx = ctx || window
	ctx.fn = this
	let res = eval('ctx.fn(...args)')
	return res
}
```

#### bind实现

```js

Function.prototype.myBind = function(ctx,...args){
	function fn(){
		return this.call(ctx,...args)
	}
	//ctx是修改后的this对象 this是函数
	
	return fn
}
```

