#### attr

自己设置的特性 不是元素原生原生自带的 我们修改这个属性是对标签的

api

setArrribute  getAttribute

```js
p1.setAttribute('data-name','immoc')
log(p1.getAttribute('data-name'))
//标签就变化啦
<p data-name='immoc'>
```

![image-20210309165019900](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210309165019900.png)

style也加上去啦 从而变成50px啦 所以property和attr都能对style进行修改

#### property

可以通过js访问和修改的属性 是dom元素原生自带的

p1.style.width p1.className





**区别**

property是对dom元素的js变量进行修改，不会对标签产生什么影响

attr是直接对dom元素自身标签进行修改，会在标签属性里面展示





#### dom结构操作

![image-20210309170439969](https://i.loli.net/2021/03/09/j815cMLDrqJAgxY.png)

appendchild 当时一个已经存在的节点时候 节点会移动

childnodes 包含text节点和p节点 因为两个p直接会有空格