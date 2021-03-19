#### 1.vue和react区别

![image-20210308100617562](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308100617562.png)

#### 2.v-if 和v-for哪个优先级更高

```vue

<p v-for='item in items' v-if='item.isfolder'> 
    
```



for優先于if 同時出現時候會先循環再去判斷條件 循環不可避免

如果寫成

```
<template v-if='isFolder'>
	<p v-for='item in items'>
</template>
```

就会先判断

#### 3.vue组件data为什么必须是函数， 而vue实例的data不需要 

采用vue.component注册实例  多实例会共用这个data

根实例为什么不用？ 因为跟实例创建的时候你会用new 的方法只创建一次

![image-20210308152248155](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308152248155.png)

#### 4.key的作用和原理

猜测patch

**先首 不一样再尾**patch判断key 看看是不是key一样

![image-20210308152733665](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308152733665.png)

不加key的话  a.key和b.key都是Undifined 相等

![image-20210308153037565](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308153037565.png)

![image-20210308153402749](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308153402749.png)

#### 5.diff算法理解

1.必要性：一个组件一个watcher 但是里面有data 有很多key

2.执行方法 深度优先 同层比较

3.过程:有孩子则递归执行孩子 没有孩子 则看是不是新节点有孩子 加 老节点有则删

都是文本 则换文本

4.updatechildren ；有key的话 尝试查找 先首首 再尾尾 再首尾 再尾首 都没得话新元素取老元素里面一个一个找

没key得话直接更新

5.时间复杂度O(n) 就是因为我们再同层比较且有key得话会试探

![image-20210308155029252](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308155029252.png)

数据改变触发setter 里面对应得watcher更新函数 比较oldVnode 和newVnode 去diff

#### 6.vue组件化理解

两种方法

1. vue.component 会一开始自动调用vue.extend 然后子类继承Vue成为全局组件

![image-20210308160052540](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308160052540.png)

2.一个vue文件 vue-loader转换成render函数 导出一个js对象，在后面mount时候去extend



必要性：因为一个组件一个watcher 假如我们多个组件 那么有利于后面数据变化得diff 也就只会那一部分组件去patch 去diff

#### 7.vue设计原则理解

1.渐进式js框架

比如h5页面只用单独得vue核心功能 组件之类的

也可以大型得页面 引入vue-router vue-cli这种大型项目

2.易用，灵活，搞笑

易用:响应式数据，声明式模板语法，

灵活：程序小只用核心特性，大的可以自己引入

高效：虚拟dom，diff算法

#### 8.vue性能优化

1.路由懒加载，按需加载 合理使用异步组件和keep-alive来缓存组件不重复渲染

![image-20210308161601778](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308161601778.png)

2.使用路由时候可以用 keep-alive缓存页面，包括用Include来包括进来 exculde去删掉不关心组件

3.v-show可以复用dom(因为这个是display:none来) 比v-if(是删除）好

4.避免v-for同时用v-if 一般把可用得数据filter出来

5.长列表性能优化

​	1.如果纯粹得列表展示 不用写在data里面

​	![image-20210308162027979](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308162027979.png)

​	freeze冻结这个对象，或者configureable变成false

​	2.虚拟滚动，减少dom区域渲染内容

6.事件的销毁 自定义也要销毁

7.图片懒加载  v-lazy = 'xxx.png' 用到啦vue-lazyload这个库 滚动到这个图片位置再去加载

8.element-ui按需引入

9.函数式组件

![image-20210308162410638](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308162410638.png)

![image-20210308162557181](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308162557181.png)

10.子组件分割

​	自己的watcher管自己 避免其他的组件渲染

11.ssr seo，首屏优化

#### 9.vue3新特性

1.proxy响应式改进代替defineProperty， 内存和初始化速度都优化 因为之前要递归，设置dep,observer什么的 proxy初始化时候只会对外面那个对象加一个壳，只有用到里面对象时候才会加壳

2.静态标记(不用标记)

3..ts支持 

4..compsition api

5..可维护性强 模块化明显 单独的响应式模块 只要引入这个模块就能创建响应式数据 不用引入vue

#### 10.vuex理解

设计理念不止于用法

![image-20210308164217658](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308164217658.png)

state数据也是响应式的 改变时候促发watcher去改变视图 怎么实现的?通过new 啦一个vue实例 把data放进来啦

vuex是vue专门的状态管理模式    集中(state),可预测的(mutation)

解决全局状态管理 和组件间的状态共享

![image-20210308164835095](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308164835095.png)



commit直接派发Mutation dispatch派发action异步在派发mutaion  外部传入mutation 和actions两个对象就是 改变state的说明书

#### 11.vue-router保护指定路由安全

路由守卫，beforeEach 等勾子判断

![image-20210308165608042](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308165608042.png)

##### //待补充看

#### 12.你知道next-tick吗



1.在下次dom更新后执行回调，获取到更新后的dom  **主要是正确获取dom相关的东西**，dom改变会放到异步更新队列里面去

next-tick函数放到队列最后面 首选的是promise这种异步方式

#### 13.响应式理解

**data:{obj：{a:1,b:2}} 几个对象几个ob 几个key几个dep因为会遍历obj的key进行响应式处理* 几个组件几个watcher** 数据改变dep去让相关的watcher队列改变

