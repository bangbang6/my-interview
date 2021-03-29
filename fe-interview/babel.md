

## 1.基本环境和配置

```js

"devDependencies": {
    "@babel/cli": "^7.7.5",
    "@babel/core": "^7.7.5",
    "@babel/plugin-transform-runtime": "^7.7.5",
    "@babel/preset-env": "^7.7.5"
  },
  "dependencies": {
    "@babel/polyfill": "^7.7.0",
    "@babel/runtime": "^7.7.5"
  }
```

install 以上包 npx babel index.js 就能把这个文件的es6语法输出成es5语法输出





**配置 .babelrc文件** 其实babel就是个空壳 实现功能是用到里面的插件 和webpack一样

babel都是通过plugins把es6高级语法转成低级的 但是太多了 我们就把这些转成preset-env(预设) 这个是一堆plugin的集合

```js

{
	presets:[["@babel/preset-env"]]
	
}
```

常用的presets

![image-20210329193029383](https://i.loli.net/2021/03/29/PD2fREQlYpSeMgt.png)



es6的就在preset-env;react相关的在preset-react;typescript就用preset-typescript

如果还有别的插件就写在plugins里面



## 2.babel-polyfill

polyfill 就是对不同浏览器的情况 做出兼容 比如下面

![image-20210329193332248](https://i.loli.net/2021/03/29/y9f7IZOlN5mwpqE.png)

所有新语法的polyfill 不光是indexOf 就叫**core-js **这个库不支持generate的语法 yield那个用法，所以我们要用regenerator库

babel-polyfill是上面两个集合 所以弃用 我们建议直接用core-js，regenerator





### 3.core-js和preset-env区别

preset-env 知识解析**es6语法** 和一些api无关 比如箭头函数

core-js 是解析**新的api**， 比如promise.resolve 是符合es5语法的(通过点的形式调用属性所有语法就符合) 只是不知道有没有promise 还有数组的includes也是个数组api 都叫新的api

##  4.babel和webpack

babel不能处理模块化 你的import 无法生效 要配置好webpack能把这个import包导入进来

babel-polyfill很大 包括啦core-js和regenerator

```js
import 'babel-polyfill'
```

 我们要按需引入

```js
 "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage", //按需引入babel-polyfill
                "corejs": 3 //版本时三
            }
        ]
    ],
```

配置好后 不用import 'babel-polyfill' 就会自动引入

![image-20210329195036340](https://i.loli.net/2021/03/29/KoyjWbmzGI1SF2f.png)

babel-polyfill缺点 污染全局环境 

polyfill加上啦window.promise=xx来实现对promise的支持,如果之前有定义window.promise=‘xx就有问题，加上啦array.prototype.includes=xx来实现数组的includes方法

## 5.babel-runtime

babel-polyfill缺点 污染全局环境  因为有这个缺点 所以有babel-runtime这个插件

![image-20210329195641670](https://i.loli.net/2021/03/29/Ppq57OcuQDHsmfM.png)

实现效果;

![image-20210329195825452](https://i.loli.net/2021/03/29/RKwZQqVnMbUO1t6.png)

对promise和includes重新命名为_promise _includes 这样就不会有window.promise=xxx冲突

开发第三库建议用run-time