## **1.AMD**:

全称是Asynchronous Module Definition，即异步模块加载机制

通过`define`来定义一个模块，使用`require`可以导入定义的模块。

```js
//a.js
//define可以传入三个参数，分别是字符串-模块名、数组-依赖模块、函数-回调函数
define('a',['jquery'],function(){
    return 1;
})

// b.js
//数组中声明需要加载的模块，可以是模块名、js文件路径
require(['a'], function(a){
    console.log(a);// 1
});

```

对于依赖的模块，AMD推崇**依赖前置，提前执行**。也就是说，在`define`方法里传入的依赖模块(数组)，会在一开始就下载并执行。

## **2.CMD**

```JS
//a.js
/*
* define 接受 factory 参数，factory 可以是一个函数，也可以是一个对象或字符串，
* factory 为对象、字符串时，表示模块的接口就是该对象、字符串。
* define 也可以接受两个以上参数。字符串 id 表示模块标识，数组 deps 是模块依赖.
*/
define(function(require, exports, module) {
  var $ = require('jquery');

  exports.setColor = function() {
    $('body').css('color','#333');
  };
});

//b.js
//数组中声明需要加载的模块，可以是模块名、js文件路径
seajs.use(['a'], function(a) {
  $('#el').click(a.setColor);
});

```

CMD推崇**依赖就近，延迟执行**。也就是说，只有到`require`时依赖模块才执行 对比amd AMD的依赖数组是一开始就下载 cmd的require('jquery')是在执行的时候再去下载jquery

## 3.Commonjs

服务端 不是异步加载(AMD和CMD都是异步 不过一个是开始就加载 一个是执行到的时候才加载) 只有加载完才会执行后面的操作

#### CommonJS的特点

- **所有代码都运行在模块作用域，不会污染全局作用域**；  一个文件一个作用域
- 模块是同步加载的，即只有加载完成，才能执行后面的操作；
- 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存；
- CommonJS输出是值的拷贝(即，`require`返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值)。



## 4.es6 module

#### ES6 Module的特点(对比CommonJS)

- CommonJS模块是**运行时加载**，ES6 Module是**编译**时输出接口,所以es6 module可以tree-shaking
- CommonJS输出是值的**浅拷贝**，ES6 Module输出的是值的**引用**，被输出模块的内部的改变**会影响引用的改变**；
- CommonJS `this`指向当前模块，ES6 Module `this`指向`undefined`;
- ES6 Module 对比CommonJS 还一个优点是 他可以解决重复引用的问题 不过commonjs会返回缓存结果

**ps**

es6 - 动态只读引用 即原来的变化新的也会变化 只读表示不可以修改

comoonjs - 静态拷贝 即原来的变化新的也不会变 因为一直返回第一次的缓存 拷贝是指值是浅拷贝

![image-20210308145836766](https://i.loli.net/2021/06/16/qhi6PRgcYFd12B4.png)
