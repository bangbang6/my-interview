1.promise

.then.和catch 的链式调用 避免回调地狱

pending不会触发then和catch

**resolve促发 then**

**reject促发catch**

Promoise.resolve（100）这直接是一个resolve状态的promise



**状态变化**  这四句箴言即可

**then正常返回resolved的promise 里面有报错则返回rejected的promise**

**catch正常返回resolved的promise 里面有报错则返回rejected的promise**

同时注意

**resolve促发 then**

**reject促发catch**

```js
promise.reject().catch() //返回resolve的promise
promise.reject().catch(
throw err) //返回reject的promise
```

习题：

![image-20210305160839648](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210305160839648.png)

打印1，3

![image-20210305160932107](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210305160932107.png)



打印1，2，3

2. new promise(function(){

   })里面的函数会同步执行

   .then 里面的才是promise的异步