## 1.React生命周期

![img](https://i.loli.net/2021/08/18/3IWvY5iPJw8uDZ7.png)

1.挂载阶段

constructor getDerviedStateFromProps render componentDidMount

2.更新阶段

getDerviedStateFromProps shouldcomponentupdate render getSnapshotBeforeUpdate componentDidupdate 

3.卸载

componentWillunmount

React 16 中删除了如下三个生命周期。

- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

取代这三个生命周期的是两个新生命周期

- static **getDerivedStateFromProp**s(nextProps,nextState)
  - 在 React 16.3.0 版本中：在组件实例化、接收到新的 props 时会被调用
  - 在 React 16.4.0 版本中：在组件实例化、接收到新的 props 、组件状态更新时会被调用

该方法可以返回一个对象，将会和 state 发生合并，且不会触发 re-render。
这个生命周期主要为我们提供了一个可以在组件实例化或 props、state **发生变化后**根据 props **修改 state** 的一个时机，用来替代旧的生命周期中的 componentWillMount、ComponentWillReceiveProps。因为是一个静态方法，this 指向不是组件实例。

- **getSnapshotBeforeUpdate**（prevProps,prevState）
  在 render 函数调用之后，**实际的 Dom 渲染之前**，在这个阶段我们可以拿到**上一个状态 Dom 元素**的坐标、大小的等相关信息。用于替代旧的生命周期中的 componentWillUpdate。
  该函数的返回值将会作为 componentDidUpdate 的第三个参数出现。

##  23、react-router里的`<Link>`标签和`<a>`标签有什么区别

> 对比`<a>`,`Link`组件避免了不必要的重渲染

react的创新之处在于，它利用虚拟DOM的概念和diff算法实现了对页面的"按需更新"，react-router很好地继承了这一点，譬如上图所示，导航组件和三个Tab组件（通过...,通过...,通过...）的重渲染是我们不希望看到的，因为无论跳转到页面一或是页面二，它只需要渲染一次就够了。<Link>组件帮助我们实现了这个愿望，反观<a>标签，每次跳转都重渲染了导航组件和Tab组件试想一下，在一个浩大的项目里，这多么可怕！我们的"渲染"做了许多"无用功"，而且消耗了大量弥足珍贵的DOM性能！

a的话会重新加载整个页面所以tab和导航都会重新渲染 但是link通过diff发现只有下面的tab对应的具体组件会发生变化，所以只重新渲染下面的组件

### **24.React Portal 有哪些使用场景**

- 在以前， react 中所有的组件都会位于 #app 下，而使用 Portals 提供了一种脱离 #app 的组件

Portals 适合脱离文档流(out of flow) 的组件，特别是 position: absolute 与 position: fixed的组件。比如模态框，通知，警告，goTop 等。

```js
const modalRoot = document.getElementById('modal');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children, //可以是个数组 表示直接数组元素放到el里面
      this.el,
    );
  }
}
```

### 25.fiber

React 需要实例化每个类组件，生成一颗组件树，使用 **同步递归 的方式进行遍历渲染**，而这个过程最大的问题就是**无法 暂停和恢复。**

- **解决方**案: 解决同步阻塞的方法，通常有两种: **异步** 与 **任务分割**。而 React Fiber 便是为了**实现任务分割**而诞生的

- 简述
  - 在 `React V16` 将调度算法进行了重构， 将之前的 `stack reconciler` 重构成新版的 **fiber `reconciler`**，变成了具有链表和指针的 单链表树遍历算法。通过指针映射，每个单元都记录着遍历当下的上一步与下一步，从而使遍历变得可以被暂停和重启
  - 这里我理解为是一种 任务分割调度算法，主要是 将原先同步更新渲染的任务分割成一个个独立的 小任务单位，根据不同的优先级，将小任务分散到浏览器的空闲时间执行，充分利用主进程的事件循环机制

- **reconciliation 阶段**: vdom 的数据对比，是个适合拆分的阶段，比如对比一部分树后，先暂停执行个动画调用，待完成后再回来继续比对

**fiber数据结构**

**作为静态的数据结构**

tag

key

type

stateNode

**作为fiber架构**

return 

child

sibling

index

**动态工作单元**

effect 表示副作用

lane表示优先级

alternate 镜像树

### 26.redux中间件

![image-20210819105617979](https://i.loli.net/2021/08/19/CoUrhPxz4RMLE6w.png)

（1）Reducer：纯函数，只承担计算 State 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作。

（2）View：与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能。

（3）Action：存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。

所以只能加强dispatch函数

```javascript
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action);
  next(action);
  console.log('next state', store.getState());
}
```

1. getDerivedStateFromProps

是一个静态函数，所以不能在这里使用 this，也表明了 React 官方不希望调用方滥用这个生命周期函数。

每当父组件引发当前组件的渲染过程时，getDerivedStateFromProps 都会被调用，这样我们有机会根据新的 props 和当前的 state 来调整一个新的 state。

fiber

- React Fiber 是一种基于浏览器的单线程调度算法。

> React Fiber 用类似 requestIdleCallback 的机制来做异步 diff。但是之前数据结构(递归diff)不支持这样的实现异步 diff，于是 React 实现了一个类似链表的数据结构，将原来的 递归diff 变成了现在的 遍历diff，这样就能做到异步可更新了

### 27.setState

```js
class Example extends React.Component {
  constructor() {
  super()
  this.state = {
    val: 0
  }
}
componentDidMount() {
  this.setState({ val: this.state.val + 1 })
  console.log(this.state.val)
  // 第 1 次 log
  this.setState({ val: this.state.val + 1 })
  console.log(this.state.val)
  // 第 2 次 log
  setTimeout(() => {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val)
    // 第 3 次 log
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val)
    // 第 4 次 log
    }, 0)
  }
  render() {
    return null
  }
}

// 答：0, 0, 2, 3
第一次flushqueueinirState是0
settimout又去触发第二次flushqueue initState=1
因为不是batchupdate 所以又去触发第三次flushqueue initState=2
```

## 28 受控组件、非受控组件



- 受控组件就是input受控于**数据的变化**，数据变了页面也变了。受控组件更合适，数据驱动是react核心
- 非受控组件不是通过数据控制页面内容

### 29. hooks 为什么不能放在条件判断里![image-20210819112907957](https://i.loli.net/2021/08/19/Bz9SpWAahtiZ6q3.png)

update 阶段，每次调用 setState，链表就会执行 next 向后移动一步。如果将 setState 写在条件判断中，假设条件判断不成立，没有执行里面的 setState 方法，会导致接下来所有的 setState 的取值出现偏移，从而导致异常发生。

### 30 forwardRef  和 useImperativeHandle

```js
const { forwardRef, useRef, useImperativeHandle } = React;

const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getAlert() {
      alert("getAlert from Child");
    }
  }));
  return <h1>Hi</h1>;
});

const Parent = () => {
  const childRef = useRef();
  return (
    <div>
      <Child ref={childRef} />
      <button onClick={() => childRef.current.getAlert()}>Click</button>
    </div>
  );
};
```

forwardRef   给函数组件一个使用ref的机会 比如childRef

useImperativeHandle 给这个ref实例提供额外属性或者函数 方便调用ref时候调用这个额外属性函数 因为类组件是可以调用里面的成员方法的 但是函数组件没有成员方法 比如这个getalert 如果是类组件就能够直接把这个函数当作私有成员 外部直接ref.getalert就能调用 但是函数组件不能 就只能useImperativeHandle暴露到这个ref实例上

```text
const { Component } = React;

class Parent extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  onClick = () => {
    this.child.current.getAlert();
  };

  render() {
    return (
      <div>
        <Child ref={this.child} />
        <button onClick={this.onClick}>Click</button>
      </div>
    );
  }
}

class Child extends Component {
  getAlert() {
    alert('getAlert from Child');
  }

  render() {
    return <h1>Hello</h1>;
  }
}
```

相当于 forwardRef  和 useImperativeHandle 是个函数组件调用子函数组件的方法或者变量的 一个解决方法

### **31.React 如何区分 Class组件 和 Function组件**

```js
function isClass(func) {
  return typeof func === 'function'
    && /^class\s/.test(Function.prototype.toString.call(func));
}
```

但是这个方式有它的局限性，因为如果用了 babel 等转换工具，将 class 写法全部转为 function 写法，上面的判断就会失效。

> React 区分 Class组件 和 Function组件的方式很巧妙，由于所有的类组件都要继承 React.Component，**所以只要判断原型链上是否有 React.Component 就可以了：**

```text
AComponent.prototype instanceof React.Component
```

### 32.死循环

`componentWillUpdate`生命周期在`shouldComponentUpdate`返回true后被触发。在这两个生命周期只要视图更新就会触发，因此不能再这两个生命周期中使用setState。否则会导致死循环 除非有条件判断去setState

##  33、react性能优化方案

- 重写`shouldComponentUpdate`来避免不必要的dom操作
- 使用 `production` 版本的`react.js`
- 使用`**key**`来帮助`React`识别列表中所有子组件的最小变化

