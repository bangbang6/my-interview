1.async/await

then/catch还是回调函数 只是解决了回调地狱 async/awiat才是真正的同步写法

  (1)promise和async关系

![image-20210305162001049](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210305162001049.png)

```js
async function fn(){
	return 100
}

let res1 = fn() //返回一个promise async 会自动将非promise的封装成promise对象
```

```js
async function (){
	let data = await 400
	log(data)
} //如果await后面不是promis也会自动封装成promise
```

  (2)异步的本质

​	js还是单线程 还是得有异步 还是基于event-loop

![image-20210305163027243](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210305163027243.png)

​	**执行过程**

```js
// 注意点2
1.await async2() 这句话要分开理解 一个时async2()直接先执行 再去执行await这个异步
await 下面的语句时回调函数 后面的语句要是同步执行，是同步代码
await async2()
log(11)
等同于 
anync2()
promise.then({
	log(2)
})
```

**await只有下面的内容才是回调函数(异步)   后面是同步代码函数**    await改变不了异步的本质 因为await下面的代码就是回调函数 

同步代码完再用event-loop取执行回调函数