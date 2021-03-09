## 知识点

1.event-loop(事件循环/轮询)

js是单线程 js异步要基于回调实现   **而event-loop就是异步回调的实现原理**

js是一行一行执行的

![image-20210305152858747](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210305152858747.png)

callStack是调用栈 js每读一个代码就放到这里面  比如读到setTimeout 他发现这个是webapi他就把里面的cb给到webapis然后出栈 然后再去读log(bye) 读完后call Stack就清空啦 callStack里面是所有同步的代码 **注意settimeout算同步但是里面的回调是异步** callStack清空后 eventloop就开始工作(异步) 一致循环读取callback queue里面的异步函数 当5s后webapis把cb1放到队列后 eventloop就会执行这个函数

**callback完才会去执行event-loop**

 (2)dom事件和event-loop之间的关系

![image-20210305153511529](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210305153511529.png)

​	dom事件也是回调 只是触发时机不一样

​	这个回调会放到web apis 里面 然后当用户点击时候这个函数就会到callback-queue 然后event-loop 无限读取到马上执行

结论：所以settimeout,ajax,dom事件都是基于回调 也就是基于event-loop









2.for of

​	for in 和foreach是同步遍历 循环不会等待 而是等待1s后一次性输出

​	for of是异步遍历 循环会等待1s再去执行下一个循环

```js
function muti(){
	return NEW promise(resolve,reject=>{
		settimeout(()=>{
		resolve(num * num)
	})
	})
	
}
nums.forEach(i=>{
	log(muti(i))
})
//循环 而是等待1s后一次性输出
for(let i of nums){
	log(muti(i))
}
//循环会等待1s再去执行下一个循环 1，4，9 1s1s输出
```



## 题目



1.描述event loop(事件循环/轮询)的机制



在宏任务和微任务图里的图 或者直接先讲这里面简单的图