## 1.生命周期

分为三个阶段  **挂载 更新 销毁**

挂载:beforecreate created beforeMount mounted 

更新:beforeupdate updated keep-alive里面还有activated(激活时调用) deactivated(离开时候调用)

销毁 beforeDestroy destroyed 这时候一般做**解除绑定**(settimeout)，**销毁子组件** **消除事件监听器**

**created和mouted区别**?created只是把vue实例对象初始化啦 只是内存的js模型对象 没渲染 mouted是在网页上真正渲染

**有子组件的生命周期调用**

父组件先初始化js实例完后到beforeMount，然后子组件初始化js实例到beforeMount，然后子组件渲染Mounted再父组件渲染

![image-20210317173116240](https://i.loli.net/2021/03/17/vUDzFuYOd5oRlLE.png)



![image-20210317172814589](https://i.loli.net/2021/03/17/SQDr1h6tEAVosZg.png)

因为要先修改外部组件的data数据 所以Index先before-update 内部list先更新完外部组件才算更新 所以Index后updated

## 2.vue高级特性

##### 1.自定义v-model

给子组定义

```js
默认是value和@input
model:{
	prop:'text',
	event:"change"
} //都是在子组件定义 不过一个是在子组件属性里面写 下面这句话是在父组件文件 但是子组件标签写
<child v-model='val'></child> //<child :text='val' @change='val2 => val = val2'></child> 
```

来自定义参数名

**这两个参数是不一样的**

原生input组件相当于<input v-bind:value=``"inputValue"` `v-on:input=``"inputValue = $event.target.value"``>

自定义组件相当于<my-component v-bind:value=``"inputValue"` `v-on:input=``"inputValue = argument[0]"``></my-component>

##### $nextTick

dom相关操作异步执行 在这里面才能拿到最新代码

![image-20210318093318907](https://i.loli.net/2021/03/18/EePsFR3wWTkq2Z6.png)

push的dom操作只有一次 一次性push3个元素

##### slot

```vue
<template v-slot:header='slotProps'>{{slotProps.website}}</template>

<Child>
	<slot :website='xxx'></slot>
</Child>
```



##### $attrs,$listeners

$attrs:包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 

$listeners包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器

```vue
//father
<child @foo = 'xxx'></child>
//child
<grondSon v-on='$listeners'></grondSon> //listeners把该组件在父作用域定义的监听器foo传入子组件去监听

//ground
this.$emit('foo')
```

##### 动态组件

不知道渲染什么组件 但是内容是定的

```vue
<component :is='name'> //name必须动态vue
data:{
	name:'input' //默认是Input标签
}
```

实现input和span切换

```vue
 <component :is="name" v-model="url"></component>
 import Span from './components/Span.vue'
import Input from './components/Input.vue'
 data:{name: 'Input', url: "我是" }
 
 //span.vue
 <template>
  <div class="span">{{msg}}</div>
</template>
 
<script>
export default {
  model: {
    prop: "msg",
    event: "change"
  },
  props: {
    msg: String
  },
  data () {
    return {
    }
  }
}
</script>
 
<style lang="scss" scoped>
</style>
//Input.vue
<template>
  <div class="vue">
    <input :value="value" @input="e=>$emit('input',e.target.value)" />
  </div>
</template>
 
<script>
export default {
  props: {
    value: String
  },

  data () {
    return {
    }
  },
  methods: {
    change (e) {
      console.log('e', e.target.value);
    }
  }
}
</script>
 
<style lang="scss" scoped>
</style>
```



##### 异步组件

大组件实现首屏不加载 什么时候用什么时候加载 用于1.<child v-if='xx'> 这个组件可异步 2.或者在router里面所有组件 省的首屏就加载

**import() 函数**

按需加载大组件 用到的时候才会加载

![image-20210318104141227](https://i.loli.net/2021/03/18/C9jds8F5BNWqtuA.png)

相当于 FormDemo:()=>import(xxx)

##### keep-alive

缓存组件 **用于频繁切换组件但是不需要重复渲染**  需要重新Mouted获取数据的不能缓存，因为不会执行这个钩子

![image-20210318105115538](C:/Users/legion/AppData/Roaming/Typora/typora-user-images/image-20210318105115538.png)

如果不加keep-alive的话 a会先销毁 b在挂载 加的话a就不会销毁 直接b挂载 a在缓存中 就算后面点a也不会挂载 只是actived激活

v-if会销毁组件 v-show是通过css控制也不会销毁组件 但是keep-alive是框架层面 

路由切换会触发mouted 因为之前的组件销毁了显示现在的组件

 **主要是看之前的组件有没有销毁 有的话就用keep-alive达到缓存刚刚销毁的组件,他就不会销毁改为失去活性deactived,如果不会销毁也就不会缓存这个组件也不会触发Mounted**

##### mixin

1.变量不可找

2.多mixin冲突问题 mouted会融合 两个showName不会融合 只是都会到融合到methods里面 但是有个showName会无效

## 3.vuex考点

![image-20210318111717369](https://i.loli.net/2021/03/18/9yAK2FijrNWa7Q6.png)



...mapgetters ...mapstate等用法

## 4.vue-router

看下router文档

1.hash模式

2.history模式 **需要server端支持**  https://router.vuejs.org/zh/guide/essentials/history-mode.html？？

3.$route.params.id获取router的:id动态路由传过来的参数

$route.query.id是通过query传过来的或者是在url后面加？的方式传参

4.懒加载就是compoent:()=>import(xx)异步加载组件

## 5.mvvm

**view ，viewModel(vue)， model 三层**

![image-20210318114802649](https://i.loli.net/2021/03/18/XaLPNjCJYGdqWrS.png)

viewModel(vue)是连接层 比如监听click事件，和数据修改

## 6.响应式数据

核心api 

object.defineProperty使用

缺点:1.深度监听第一次就要递归到底，一次性计算量大

![image-20210318115653120](https://i.loli.net/2021/03/18/FBh2sq5cHyJunZQ.png)

**1.监听数组呢？**

重写数组原型 

​		**两个赋值对象区别**

​			obj2=object.create(obj1) 实现的是Obj2的隐士原型指向obj1，自身没属性 hasownproperty为false

​			obj2 = new object(obj1) 是构造函数初始化对象 obj1的所有属性直接到obj2上

![image-20210318150130360](https://i.loli.net/2021/03/18/43VcmQSPR6BnUjl.png)

然后再obserber里面多加个数组判断，给当前数组的隐士原型指向我们加了劫持的新原型

不能直接在Array.prototype改 会污染全局数组 人家不在data里的数组就不需要监听 还是走原始始的原型

![image-20210318150323740](https://i.loli.net/2021/03/18/3nkvgQKUZ2I79Cb.png)

##### 2.深度监听呢？

#####  **递归调用observe 在defineReactive和set里面都要递归调用**

![image-20210318144249291](https://i.loli.net/2021/03/18/YNI3a7pMQtyL95S.png)

![image-20210318145127223](https://i.loli.net/2021/03/18/dbqEzjiDTKAhrpg.png)

初始化时候就得递归value可能是对象 我们也可能set一个新对象也要递归监听

设置对象新值用vue.set()/vue.delete() 或者this.$set/this.$delete

2.proxy有兼容性问题 且无法pliyfill 无支持ie

7.虚拟dom

js模拟dom结构 计算出最小变更 操作dom 没用虚拟dom的时候改变data那么表格会全部渲染，而不是单个cell渲染 下面这图是vnode

### 									Vnode

![image-20210318152151840](https://i.loli.net/2021/03/18/WhtG1z9knqMBaOE.png)



patch功能就是去diff两个虚拟dom然后再去实际操作dom

## 8.模板编译

![image-20210318153526682](https://i.loli.net/2021/03/18/mRVlI9c8rJ2Z6Ce.png)

##### 1.with用法

![image-20210318153727496](https://i.loli.net/2021/03/18/pWVuiLPtfjb7NKH.png)

with 改变内部作用域查找规则 当作obj的属性来找 找不到会报错 为不是Undifined

### 2.render函数

```js
function(){
    with(this){
		return _c('p',{attrs:{xx}，on:{},domProps:{}},[_v(_s(message))])
	}
}
//_c返回一个vnode 所以执行这个render函数就会生成vnode 在去patch
```

**指令**

v-if指令转成三元表达式判断 v-for转成_l(list,function(){return _c(item)}) 

v-model转成  on:{’input',()=>{}},domprops:{value:name} //domprops表示dom原生的属性

![image-20210318162534237](https://i.loli.net/2021/03/18/5nwhjvi43BTZ7lN.png)

**事件** @click转成 监听click事件

转成_c('button',{on:{'click',function},)

![image-20210318163459039](https://i.loli.net/2021/03/18/XktVIRPrQqESgs3.png)

如果用啦webpack 那么自带vue-loader 以上三步都是自动的,react一直用的render(jsx只是语法糖)不是template



## 9.渲染过程

![image-20210318164255788](https://i.loli.net/2021/03/18/dZFCa4uwSm7DGhH.png)

**流程**

因为render函数有_c('p',message) 执行会**触发getter**(这一步是把这个数据(dep和使用到这个数据的组件(watcher)关联起来，方便后面数据改变时候哪部分视图需要重新执行render函数) 但是city是没有 不会触发get 视图也和这个无关

修改data 会促发setter(此前在getter已经被监听) 重新执行render函数 生成newVnode 再去patch

![image-20210318164612819](https://i.loli.net/2021/03/18/ouaPtfU6VlWM3Tj.png)

## 10.异步渲染

作用:数据的整合是同步的  更新视图是异步的 减少dom操作次数

![image-20210318164939936](https://i.loli.net/2021/03/18/vDBAJy8VOx4nFUM.png)

## 11.前端路由原理

spa 就是用前端路由 不用到后端的路由

###  hash![image-20210318170854292](https://i.loli.net/2021/03/18/WYctXuzRaeq89fP.png)

hash特性：hash变化会触发网页跳转即浏览器前进后退 **但是不会刷新页面** **hash永远不会提交到server端**

触发hash变化方式: js修改,手动修改,浏览器前进后退  然后前端会根据hash值切换页面 **window.onhashchange**来实现监听hash

### h5

url规范的路由，但跳转时候不重新加载页面 普通的后端url是会刷新的  spa要求不能重新加载页面 因为所有页面资源都是向服务器请求的 比如

/index.html 去后台请求index 跳到/user 时候去后台请求user 这样如果后台没配置这个路由就会报错

**history.pushState** 和 **window.onpopstate **两个函数来实现不刷新页面



#### 谈谈为什么H5要做服务器的支持

首先我们能访问到的页面只有首页 用hash的时候永远都是在首页这个页面上 因为他的url不是规范的 而是改变hash的 

比如访问 localhost:xx#/user 是不会向后台发页面请求的(因为只是改啦hash而没改url), 只有localhost;xx/user这种规范的url浏览器才会去发请求

所以需要我们后台配置所有url都返回index.html这个首页 然后这个首页index.html里面再去配置pushstate时候(页面不刷新)监听到url是什么去返回对应视图，同时写一个url没匹配到的时候返回404的页面

## 12.何时使用keep-alive

tab页切换 缓存组件不重复渲染

## 13.兄弟组件如何通信采用自定义事件

直接用一个vue实例 因为一个vue实例自己有$on $off $emit方法  只要是同一个对象就能实现设置监听器触发之类的操作

$on传入的函数最好使用定义的函数 方便该组件beforedestroyed的时候解绑

## 14.computed有何特点

缓存数据data不变不会重新计算 提高性能

## 15.ajax放到哪个生命周期

mounted 

因为js是单线程的 放到Mounted之前没用 因为如果放到mounted之前 js还没渲染完 也不会那时候就运行

## 16.何时使用beforeDestroyed

1.解除自定义事件 event.$off

2.清除定时器

3.解除自定义dom事件 比如window.scroll

## 17.diff算法时间复杂度

o(n) 在 o(n3)做了优化 1.只同级对比不跨级 2.tag和key判断组件是否相同

## 18.vue如何实现高阶组件

![image-20210319113844785](https://i.loli.net/2021/03/19/XWxoeMiTNy2KQmw.png)