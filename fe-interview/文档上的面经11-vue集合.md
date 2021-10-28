### 1.生命周期

| beforeCreate  | 组件实例被创建之初，组件的属性生效之前                       |
| ------------- | ------------------------------------------------------------ |
| created       | 组件实例已经完全创建，属性也绑定，但真实dom还没有生成，$el还不可用 |
| beforeMount   | 在挂载开始之前被调用：相关的 render 函数首次被调用           |
| mounted       | el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子    |
| beforeUpdate  | 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前              |
| update        | 组件数据更新之后                                             |
| activited     | keep-alive专属，组件被激活时调用                             |
| deadctivated  | keep-alive专属，组件被销毁时调用                             |
| beforeDestory | 组件销毁前调用                                               |
| destoryed     | 组件销毁后调用                                               |

### 2.history模式

后台多一个配置

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 `index.html` 页面，这个页面就是你 app 依赖的页面。

`history`模式：h`istory`采用`HTML5`的新特性；且提供了两个新方法： `pushState()`， `replaceState()`可以对浏览器历史记录栈进行修改，以及`popState`事件的监听到状态变更

http://mozilla.org/foo.html 执行了如下JavaScript代码：

```
let stateObj = {
    foo: "bar",
};

history.pushState(stateObj, "page 2", "bar.html");
```

### 3.vuex的模块化

![img](https://i.loli.net/2021/08/25/EUFGCifyPac7H2p.png)

4. ### vue-router 有哪几种导航守卫?

- 全局守卫
- 路由独享守卫
- 路由组件内的守卫

**全局守卫**

> vue-router全局有三个守卫

- `router.beforeEach` 全局前置守卫 进入路由之前
- `router.beforeResolve` 全局解析守卫(2.5.0+) 在`beforeRouteEnter`调用之后调用
- `router.afterEach` 全局后置钩子 进入路由之后

```js
// main.js 入口文件
import router from './router'; // 引入路由
router.beforeEach((to, from, next) => {  //beforeeach
  next();
});
router.beforeResolve((to, from, next) => {
  next();
});
router.afterEach((to, from) => {
  console.log('afterEach 全局后置钩子');
});
```

**路由独享守卫**

> 如果你不想全局配置守卫的话，你可以为某些路由单独配置守卫

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => { 
        // 参数用法什么的都一样,调用顺序在全局前置守卫后面，所以不会被全局守卫覆盖
        // ...
      }
    }
  ]
})
```

**路由组件内的守卫**

- **beforeRouteEnter** 进入路由前, 在路由独享守卫后调用 不能 获取组件实例 this，组件实例还没被创建

- **beforeRouteUpdate** (2.2) 路由复用同一个组件时, 在当前路由改变，但是该组件被复用时调用 可以访问组件实例 this

- **beforeRouteLeave** 离开当前路由时, 导航离开该组件的对应路由时调用，可以访问组件实例 this

  ```js
  const Foo = {
    template: `...`,
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
    },
    beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用，我们用它来禁止用户离开
      // 可以访问组件实例 `this`
      // 比如还未保存草稿，或者在用户离开前，
      将setInterval销毁，防止离开之后，定时器还在调用。
    }
  }
  ```

### 5.v-model

自定义的组件上 v-model 默认会利用名为 value 的 prop 和名为 input 的事件实现，但是对于不同的表单元素 value 属性会用于不同的目的（正如我们[上面提到的](https://link.juejin.cn?target=https%3A%2F%2Fwww.yuque.com%2Flittlelane%2Fvue%2Fiqevua%23994d0c3d)），比如单选框、复选框表现为 checked。为了区别这些不同的表现特性 Vue 给组件提供了 model 配置属性。model 是一个对象：提供 prop 属性指定组件 value 特性，event 指定值变化时触发的事件。

单选框自定义属性和事件名

```js
 model: {
    prop: 'checked',
    event: 'change'
  },
```

## 6. vue修饰符



- `stop`：阻止事件的冒泡
- `prevent`：阻止事件的默认行为
- `once`：只触发一次
- `self`：只触发自己的事件行为时，才会执行
- .native 绑定原生事件

### **7 既然Vue通过数据劫持可以精准探测数据变化,为什么还需要虚拟DOM进行diff检测差异**

通常一个绑定一个数据就需要一个Watcher,一但我们的绑定细粒度过高就会产生大量的Watcher,这会带来内存以及依赖追踪的开销,而细粒度过低会无法精准侦测变化,因此Vue的设计是选择中等细粒度的方案,在组件级别进行push侦测的方式,也就是那套响应式系统,通常我们会第一时间侦测到**发生变化的组件,**然后在组件内部进行Virtual Dom Diff获取更加**具体的差异,**

### **8.Vue为什么没有类似于React中shouldComponentUpdate的生命周期？**

当React知道发生变化后,会使用Virtual Dom Diff进行差异检测,但是很多组件实际上是肯定不会发生变化的,这个时候需要用shouldComponentUpdate进行手动操作**来减少diff,**从而提高程序整体的性能.

Vue因为用啦数据劫持 在一开始就知道那个组件发生了变化 然后组件内部采用的diff方式 组件内部是可以引入类似于shouldComponentUpdate相关生命周期

## 9 SSR了解吗



> `SSR`也就是服务端渲染，也就是将`Vue`在客户端把标签渲染成HTML的工作放在服务端完成，然后再把html直接返回给客户端

`SSR`有着更好的`SEO`、并且首屏加载速度更快等优点。不过它也有一些缺点，比如我们的开发条件会受到限制，服务器端渲染只支持`beforeCreate`和`created`两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于`Node.js`的运行环境。还有就是服务器会有更大的负载需求

## 10 Vue的事件绑定原理



放到props里面区分nativeon 和 on 

nativeon直接原生dom事件addeventlistener绑定

on的话用发布订阅模式 $on把函数传入cb队列 等待$emit调用触发

## 11 了解history有哪些方法吗？说下它们的区别



history 这个对象在html5的时候新加入两个api **history.pushState() 和 history.repalceState()** 这两个 API可以在**不进行刷新**的情况下 但是还是会请求后台数据，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录。

从参数上来说：

```javascript
window.history.pushState(state,title,url)
//state：需要保存的数据，这个数据在触发popstate事件时，可以在event.state里获取
//title：标题，基本没用，一般传null
//url：设定新的历史纪录的url。新的url与当前url的origin必须是一样的，否则会抛出错误。url可以时绝对路径，也可以是相对路径。
//如 当前url是 https://www.baidu.com/a/,执行history.pushState(null, null, './qq/')，则变成 https://www.baidu.com/a/qq/，
//执行history.pushState(null, null, '/qq/')，则变成 https://www.baidu.com/qq/

window.history.replaceState(state,title,url)
//与pushState 基本相同，但她是修改当前历史纪录，而 pushState 是创建新的历史纪录
```

另外还有：

- `window.history.back()` 后退
- `window.history.forward()`前进
- `window.history.go(1)` 前进或者后退几步

从触发事件的监听上来说：

- `pushState()`和`replaceState()`不能被`popstate`事件所监听
- 而后面三者可以，且用户点击浏览器前进后退键时也可以

### **12 如何监听 pushState 和 replaceState 的变化呢？**

利用自定义事件`new Event()`创建这两个事件，并全局监听：

```html
<body>
  <button onclick="goPage2()">去page2</button>
  <div>Page1</div>
  <script>
    let count = 0;
    function goPage2 () {
      history.pushState({ count: count++ }, `bb${count}`,'page1.html')
      console.log(history)
    }
    // 这个不能监听到 pushState
    // window.addEventListener('popstate', function (event) {
    //   console.log(event)
    // })
    function createHistoryEvent (type) {
      var fn = history[type]
      return function () {
        // 这里的 arguments 就是调用 pushState 时的三个参数集合
        var res = fn.apply(this, arguments)
        let e = new Event(type)
        e.arguments = arguments
        window.dispatchEvent(e)
        return res
      }
    }
    history.pushState = createHistoryEvent('pushState')
    history.replaceState = createHistoryEvent('replaceState')
    window.addEventListener('pushState', function (event) {
      // { type: 'pushState', arguments: [...], target: Window, ... }
      console.log(event)
    })
    window.addEventListener('replaceState', function (event) {
      console.log(event)
    })
  </script>
</body>
```





### 13.如何创建自定义事件？

1.创建自定义事件 有三个方法 第三个用的多

1. 使用`Event`

```javascript
let myEvent = new Event('event_name');
```

1. 使用`customEvent` （可以传参数）

```javascript
let myEvent = new CustomEvent('event_name', {
	detail: {
		// 将需要传递的参数放到这里
		// 可以在监听的回调函数中获取到：event.detail
	}
})
```

1. **使用`document.createEvent('CustomEvent')和initCustomEvent()`**

```javascript
let myEvent = document.createEvent('CustomEvent');// 注意这里是为'CustomEvent'
myEvent.initEvent(
	// 1. event_name: 事件名称
	// 2. canBubble: 是否冒泡
	// 3. cancelable: 是否可以取消默认行为
)
```

**2.事件的监听**

自定义事件的监听其实和普通事件的一样，使用`addEventListener`来监听：

```javascript
button.addEventListener('event_name', function (e) {})
```

**3.事件的触发**

触发自定义事件使用`dispatchEvent(myEvent)`。 监听和触发对象是同一个对象 因为原理还是观察订阅模式 必须一个对象

```javascript
let myEvent = document.createEvent('CustomEvent');
myEvent.initEvent('myEvent', true, true)

let btn = document.getElementsByTagName('button')[0] 
btn.addEventListener('myEvent', function (e) {
  console.log(e)
  console.log(e.detail)
})
setTimeout(() => {
  btn.dispatchEvent(myEvent) //触发和监听者一样
}, 2000)
```

### 14 完整的导航解析流程



1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 **`beforeEach`** 守卫。 全局
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 **`beforeEnter`**。 路由
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。 组件
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。

### 15.插槽和作用域插槽

 普通插槽-在父组件初始化期间会编译成文本**子节点**存起来，在子组件渲染的时候直接将插槽替换成父组件里渲染的节点

作用域插槽 -在父组件初始化期间会编译**成一个函数**，在子组件初始化的时候执行**这个函数生成vnode再进行渲染**

**普通插槽**

```xml
//r1子组件 r2父组件
let r1 = VueTemplateCompiler.compile('
    <div>
        <span>hello</span>
        <slot name="header">name</slot>
    </div>
');
let r2 = VueTemplateCompiler.compile('
    <div>
        <span>hello</span>
        <div slot="header">name</div>
    </div>
');
```

```rust
r2.render=
'with(this){
    return _c(\'div\',[
        _c(\'span\',[
            _v("hello")
        ]),
        _c(\'div\',{     //在编译时将插槽已经编译成虚拟节点存进[_v("name")]
            attrs:{
                "slot":"header"
            },
            slot:"header"
        },[_v("name")])
    ])
}
```

```rust
r1.render=
'with(this){
    return _c(\'div\',[
        _c(\'span\',[
              _v("hello")
        ]),
        _t("header",[_v("name")])   //在渲染时将header替换成父组件编译完成的[_v("name")]
    ],2)
}'
```

当子组件初始化时，会调`_t()`方法渲染插槽，会先去父组件中寻找名为`"header"`的插槽，将`"header"`替换成`_v("name")`，渲染过程就是将vnode渲染成真实Dom

**作用域插槽**

`r3`为子组件，`r4`为父组件

```xml
let r3 = VueTemplateCompiler.compile('
    <div>
        <span>hello</span>
        <slot name="footer" a="1"></slot>
    </div>
');

let r4 = VueTemplateCompiler.compile('
    <div>
        <span>hello</span>
        <div slot="footer" slot-scope="msg">{{msg.a}}</div>
    </div>
');
```



父组件render函数

```rust
r4.render=
'with(this){
    return _c(\'div\',{
        scopedSlots:  
            _u([{
                  key:"footer",
                  fn:function(msg){  //将插槽编译成函数  关键 然后有key
                      return _c(\'div\',{},[_v(_s(msg.a))])
                  }
            }])
        },
        [_c(\'span\',[_v("hello")])]
  )
}'
```

子组件render函数

```rust
r3.render=
'with(this){
      return _c(\'div\',[
                _c(\'span\',[_v("hello")]),
                _t("footer",null,{a:"1"})
    ],2)
}'
```

父组件编译时将插槽编译成函数存进数组里，子组件初始化时会根据插槽名`"footer"`去父组件里找`key`为`"footer"`的函数并执行，传入插槽的msg对象 然后生成vnode进行渲染