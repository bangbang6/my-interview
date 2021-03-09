#### Array构造器

![image-20210309112124255](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210309112124255.png)

归纳：只有传入一个数字的时候是返回这莫多个数的数组 其他都是返回数组包含这些参数项

#### Array.of

就是返回一个数组包括传入的参数项 和构造器的差别就在单个数字的处理上

![image-20210309112024938](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210309112024938.png)

![image-20210309112049555](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210309112049555.png)

#### Array.from

基于其他对象创建新的数组 可以是迭代器也可以是类数组 也可以定义加工函数

![image-20210309112505092](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210309112505092.png)

加工函数

![image-20210309112554083](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210309112554083.png)

value就是数组中的每一项

#### Array.isArray 

判断是不是数组

#### 改变自身数组的方法(9个)

pop push reverse shift sort splice unshift

```js
 //splice 注意会改变自身 返回值是哪个删除的元素数组
var array = ["apple","boy"];
var splices = array.splice(1,1);
console.log(array); // ["apple"]
console.log(splices); // ["boy"]
```

#### 不改变自身的方法(9个)

concat join slice toString toLocalString indexOf lastIndexOf

```js

//concat 返回添加后的数组自身不变
//join 添加分隔符自己就会变成字符串
//slice 返回值是取的副本 自身不变
```

**ps**: **slice不会改变自身 splice会改变自身**

![image-20210309113430474](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210309113430474.png)

详解 ：添加的都是返回长度 长度减少的都是返回减少的元素 其他都是返回数组

1、 concat()

- 连接两个或多个数组
- **不改变原数组**
- 返回被连接数组的一个副本

------

2、join()

- 把数组中所有元素放入一个字符串
- **不改变原数组**
- 返回字符串

------

3、 slice()

- 从已有的数组中返回选定的元素
- **不改变原数组**
- 返回一个新数组

------

4、 toString()

- 把数组转为字符串
- **不改变原数组**
- 返回数组的字符串形式

## 改变原数组：

5、 pop()

- 删除数组最后一个元素，如果数组为空，则不改变数组，返回undefined

- 改变原数组

- 返回被删除的元素

  ------

6、 push()

- 向数组末尾添加一个或多个元素
- 改变原数组
- 返回新数组的长度

------

7、 reverse()

- 颠倒数组中元素的顺序
- 改变原数组
- 返回该数组

------

8、 shift()

- 把数组的第一个元素删除，若空数组，不进行任何操作，返回undefined
- 改变原数组
- 返回第一个元素的值

------

9、 sort()

- 对数组元素进行排序(ascii)
- 改变原数组
- 返回该数组

------

10、 splice()

- 从数组中添加/删除项目
- 改变原数组
- 返回被删除的元素

------

11、 unshift()

- 向数组的开头添加一个或多个元素
- 改变原数组
- 返回新数组的长度