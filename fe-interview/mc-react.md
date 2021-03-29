## 1.react17

使用没什么特别 只是个过渡期 

## 2.jsx

基础用法

1.style={{xxx:xx}}为什么又两个{} 因为首先js变量得用{} 括起来 然后style又得传一个对象 所以有两个括号

2.原生html通过dangerouslysetInnerHtml={htmlData} 传递 直接插值传递不会解析html标签而是直接一个字符串

![image-20210318200104899](https://i.loli.net/2021/03/18/4DR5FWSxOa6AXjm.png)

## 3.react事件的event和dom事件的区别

react事件其实是组合事件(syntheticEvent)的实例 封装了一层![image-20210318202405755](https://i.loli.net/2021/03/18/mhqe5ENzWcLAkua.png)

dom事件的原生事件是mouseEvent或者其他的keyEvent原生对象

```react
<div @click='handleClick'></div>
handleClick(e){
    //这个e是组合事件
    //e.nativeEvent才是原生事件
}
```

e.target是指触发事件的元素 e.currentTarget是指绑定事件的元素

```react

<div onClick = 'xx'>
	<p>yyyy</p>
</div>
```

加入我们点到p标签里触发xx点击事件 那么e.target就是p e.currenttarget就是div

react17之前所有事件绑定到document上 17后就绑定到root组件上啦 因为有利于多个react版本共存 都放到document可能会冲突

![image-20210318203041761](https://i.loli.net/2021/03/18/dTHweUBrkiKQICq.png)

```react
<div onClick='this.clickHandler.bind(this,item.id,item.title)'></div>
//所有事件event都在最后一个参数
clickHandler(id,title,event){
    
}
```

## 4.表单 受控组件 非受控组件



1.<label for='xx'> 其中for在js中是个保留字 改为htmlFor='xx'

![image-20210318205707968](https://i.loli.net/2021/03/18/E9GVoI5b6ZX1tpH.png)

2.**受控组件:**

![image-20210318210318539](https://i.loli.net/2021/03/18/USKs6oxOBIkXhcA.png)

该组件状态state受到Input组件的影响,自身会不断变化和input状态一样 只有一种状态

**非受控组件：**

input值和state没啥关系 只是给拉你一个初始值而已 defaultValue = 'state.value' 不能用value='state.value'

什么时候用非受控组件？当我们必须操作dom的才能完成功能，比如获取文件,我们没法传入state去和file对应;富文本编辑器加粗之类的功能

![image-20210318210357713](https://i.loli.net/2021/03/18/4p5Dqoire81TlIg.png)

该组件状态即state没有受到表单这个局部状态影响 Input状态和该组件不一样，通过ref拿到表单数据

## 5.父子组件通讯

1.prop-types 这个包做类型检查

```js
List.propTypes = {

	name:PropTypes.String

}
```

2.传递函数让子组件去执行 数据提升 放到最外层组件(因为可以传入函数和数据) 这样方便修改

## 6.react生命周期

![image-20210319094346421](https://i.loli.net/2021/03/19/TBifw7EjQzPU2yd.png)

也分为挂载,跟新时，卸载时,就七个而已

挂载时候：constructor->render->componentDIdMount   没有beforeMount之类的

更新时：shouldComponentUpdate->render->componentDidUpdate

卸载时：componentWillUnmount

父子组件生命周期调用顺序和vue完全一样

## 7.ref使用

![image-20210319095828405](https://i.loli.net/2021/03/19/8wZ9qnOSFHKDtLp.png)

vue里面直接$refs,react里面用createRef()创建个对象 或者用useRef的Hooks

## 8.portals使用

组件一般层层渲染,如何让组件渲染到父组件外？div渲染到body上

![image-20210319100833656](https://i.loli.net/2021/03/19/kaC6jWG2AX4pY7g.png)

## 9.context使用

创建和提供context

```react
const ThemeContext = React.createContext('light') //创建一个context对象

//提供contxt 传入value
<ThemeContext.Provider value={this.state.theme}>
            <Toolbar />
            <hr/>
            <button onClick={this.changeTheme}>change theme</button>
        </ThemeContext.Provider>
    
    

```

消费context:

class组件 static contextType = ThemeContext,然后this.context获取

![image-20210319102033311](https://i.loli.net/2021/03/19/T8Plq3CJrnaxf6A.png)

函数组件：cosumer包裹一个函数，函数参数为传入的context

![image-20210319102104661](https://i.loli.net/2021/03/19/oDiKC57y8Br3OuI.png)

## 10.如何加载异步组件

react.lazy和react.suspense两个函数 组件大或者路由懒加载时候用

```react
const ContextDemo = React.lazy(() => import('./ContextDemo'))
<React.Suspense fallback={<div>Loading...</div>}>
                <ContextDemo/>
            </React.Suspense>
```

**react.lazy** 和import表示异步加载这个组件

**react.suspense**表示这个组件没加载完成时候显示生命组件 suspense;n.(对即将发生的事等的)担心; 焦虑; 兴奋; 悬念;

## 11.性能优化 scu

shouldComponentUpdate,pureComponent,react.memo

shouldComponentUpdate给我们自己定制返回false的权力 而不是直接写好state不变就不更新，要用户自己去定更好

![image-20210319103600942](https://i.loli.net/2021/03/19/RvYZLM4Ddr2qosA.png)

react默认父组件更新,子组件则无条件更新 比如Input改变了父组件的state那么footer组件也会重新render,用scu去防止渲染

![image-20210319104255709](https://i.loli.net/2021/03/19/zJQ63ncgspwoXy2.png)

scu里面比较对象直接==的话是比较地址一定不相等，我们可以用深层比较lodash.equal两个对象来判断是不是完全相同，相同则不渲染

为什么是不可变对象？

![image-20210319110553003](https://i.loli.net/2021/03/19/McdCjnAsSUJig82.png)

因为假如你push的话，此时state已经改变了，在子组件scu时候，nextPorps.list和this.props.list(此时已经改了)一定是相等的，所以永远不会重新渲染，出bug

而且setState 里面对象此时已经和原来的state完全相同,react是对比setState传过来的对象和此时的this.state对比不一样才渲染，这时候肯定一样就不渲染

![image-20210319110928770](https://i.loli.net/2021/03/19/klM7Bs8QoXwFApY.png)

## 12.pureComponent,memo

pureComponent在scu里面做了浅比较只会比较第一层是否相同，memo是函数组件的purecomponent

```js
// 浅比较 shallowEqual
export const shallowEqual = (obj, newObj) => {
  // 是否为同一个引用
  if (obj === newObj) {
    return true;
  }
  const objKeys = Object.keys(obj);
  const newObjKeys = Object.keys(newObj);
  // 判断对象的属性长度是否相等
  if (objKeys.length !== newObjKeys.length) {
    return false;
  }
  // 每个属性值是否相等，不会深入判断 如果obj[key]还是对象的话就不会比较啦
  return objKeys.every(key => obj[key] === newObj[key]);
};

```

## 13.组件公共逻辑抽离

1.采用**高阶组件**就是个函数,接受一个组件,返回一个组件，然后这个组件的render是返回接受的组件，公共逻辑就在render其他地方

![image-20210319112832884](https://i.loli.net/2021/03/19/wJ8hc3jQXHDCep5.png)

**2.render props**

APP函数返回一个组件 该组件就是公共逻辑组件(factory)，把render函数当做props传入，然后factory组件返回render函数返回的组件

factory有a,b属性传到render函数当作props

![image-20210319115151342](https://i.loli.net/2021/03/19/1YqHXhZ3k6CxLfi.png)

## 14.jsx本质是什么

就是个createElement函数 返回一个vnode,经过patch后形成一个页面

## 15.纯函数

一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。

https://blog.csdn.net/c_kite/article/details/79138814

#### 1.什么叫只依赖他的参数？

![image-20210319162158378](https://i.loli.net/2021/03/19/dHupmbiVQJDlwkU.png)

这个函数还依赖a

#### 什么叫没有副作用？就是对外部变量/环境不产生影响

```js
let obj = {x:1}
function a(obj){
	obj.x = 2
}
a()
log(obj)
```

obj发生啦改变不是纯函数

同时setTimeout.domapi都对外界产生啦可观察的变化，甚至是console.log我们都能在控制台看到输出



没有副作用，不会改变其他值，返回一个新值，重点：不可变值

## 16.性能优化

1.scu

2.key

3.自定义dom事件和监听器即使销毁

4.异步组件和路由组件懒加载

5.减少bind(this)的次数