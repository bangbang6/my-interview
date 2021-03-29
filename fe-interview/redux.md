## 1.基本概念

store,state,action

```js
vuex:dispatch(action 里面会commit(mutation)) commit(mutation) 对照mutations去变化
redux dispatch(action) 对照reducer去变化
```



```js

import { createStore } from 'redux';

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter);
 
// 可以手动订阅更新，也可以事件绑定到视图层。 
//!state数据改变引起视图改变是在这里实现
store.subscribe(() =>
  console.log(store.getState())
);

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1
```

## 2.单项数据流

![image-20210319120621558](https://i.loli.net/2021/03/19/KpfRrsSGtc1iNZd.png)

dispatch->reducer->state发生改变->subscribe订阅视图发生变化

## 3.react-redux

react和redux交互用的框架 只有redux是传入store 因为redux类里面的属性叫store，context是传入value

![image-20210319144141684](https://i.loli.net/2021/03/19/fDy3a2IgsuRl689.png)

然后子组件用connect包裹一层，可以把state,dispatch封装到props里面

同步action 用法dispatch(addTodo(text))，addTodo返回一个action对象{type:'xx'}

![image-20210319145001763](https://i.loli.net/2021/03/19/WvM6SJGbYFOgHoq.png)

异步action dispatch(addTodoAsync) dispatch碰到参数是函数时候就会执行这个函数，thunk中间件

![image-20210319145148508](https://i.loli.net/2021/03/19/2kNgdA6tniQ7EXo.png)

## 4.redux中间件

![image-20210319145456395](https://i.loli.net/2021/03/19/iTlWEIAmkoQtKz5.png)

**对dispatch加点逻辑，然后返回一个新的dispatch，next就是老的dispatch**

![image-20210319145728293](https://i.loli.net/2021/03/19/N7KaBCuUfgm2DWQ.png)

整体流程

![image-20210319145912449](https://i.loli.net/2021/03/19/XqE9UvTKH1k7I3x.png)

