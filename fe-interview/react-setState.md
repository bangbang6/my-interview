## re1.setState

1.不可变值 2.可能是异步更新 3.可能会被合并

### **1.不可变值**

不能直接改变state

#### **1.数组**

![image-20210319091546578](https://i.loli.net/2021/03/19/ZqpvW41CyX2nrwN.png)

1.concat不会影响原数组,只会返回个新数组 所以这里可以用concat ,不能用push push的话原数组就变化了

2.用展开数组方式然后新数组括起来也不会影响老数组也可

3.slice，filter,map(所有遍历的函数)也不会影响老数组，都是可用的

![image-20210309113430474](https://i.loli.net/2021/03/19/KBidnU6XgVT71qN.png)

#### **2.对象**

![image-20210319092150028](https://i.loli.net/2021/03/19/RQrAa8FXZJPO73V.png)

使用Object.assgin和扩展运算也不要会影响原对象

### 2.同步还是异步

**直接使用是异步**

![image-20210319092428637](https://i.loli.net/2021/03/19/W2wFBXNPCr7tf8U.png)

我们在setState的第二个参数传入一个回调函数 里面可以拿到最新的state值，这个回调函数相当于$next-tick

**哪些是同步的？**在settimeout和dom事件监听中是同步的

```js

setTimeout(() => {
        //     this.setState({
        //         count: this.state.count + 1
        //     })
        //     console.log('count in setTimeout', this.state.count)
        // }, 0)
 dom.addeventlistener('click',()=>{
	this.setState()//同步
 })
```

## 3.什么时候合并

**1.传入对象 会被合并** 类似于object.assgin()

```react
 this.setState({
            count: this.state.count + 1
        })
       this.setState({
        count: this.state.count + 1
     })
         this.setState({
         count: this.state.count + 1
     })
```

因为setState是异步的,这三句话里面的count都是0,加1都是1 所以只会加一

类似Object.assgin({count:1},{count:1},{count:1})

举例：

![image-20210319094205096](https://i.loli.net/2021/03/19/ZB2fQGopHKmqN9S.png)

这种情况一次只加一 因为最后一个对象是1

![image-20210319094255349](https://i.loli.net/2021/03/19/jsKGwlD8dYmtJHx.png)

这种情况会加3，因为最后一个对象是3 就类似object.assgin 最后那个数字为主

**2.传入函数，不会被合并**

![image-20210319093341692](https://i.loli.net/2021/03/19/MEtDxqzVpCv1n96.png)

这时候会加三，因为函数没办法合并，所以只能一个一个执行

相当于传入对象是异步，传入函数是同步

