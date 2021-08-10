## 1.多路口

entry有两个

```js

entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
```

output用【name】来标识具体哪个 这里是index和other

```js
output: {
      
        filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
    
    },
```

针对每个路口都用HtmlwebpackPlugin插件生成对应的html，**chunks**是这html需要引入的js文件 这个和entry和第3部分抽离出的chunks的name对应上

```js
 new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index']  // 只引用 index.js
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other']  // 只引用 other.js
        })
```

## 2.抽离压缩css文件

一般css文件是打包到js文件里和然后塞到html文件的style上的



现在dev环境不管因为没有打包的文件出来，和之前一样

![image-20210329160037429](https://i.loli.net/2021/03/29/HsYMEb3fiBpNJgn.png)

在pro环境下，使用mini-css-extract-plugin插件 配置项有个css抽离出的文件路径，loader把之前style-loader改成mincssExtraPlugin.loader  好处就是css不变的话 hash也不会变 命中缓存

```js
 // 抽离 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/main.[contentHash:8].css'
        })
```

![image-20210329160058767](https://i.loli.net/2021/03/29/6UgrMtPf8XThVzZ.png)

压缩css

```js
module.exports = {
	optimization: {
        // 压缩 css
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }    
}

```

## 3.抽离公共代码

每个模块都有公共代码的话就会浪费，比如引入loadash.js, 两个模块打包的js文件里里面都有这个模块的压缩代码是不好的(重复)，且一旦改变一点点业务代码导致整个大的文件(包含外部库)打包很亏，明明外部引入的模块没变，不需要重新打包这么多的



在optimization里的splitChunks上

```js
optimization: {
        // 压缩 css
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

        // 分割代码块
        splitChunks: {
            chunks: 'all',
            /**
             * initial 入口 chunk，对于异步导入的文件不处理
                async 异步 chunk，只对异步导入的文件处理
                all 全部 chunk
             */

            // 缓存分组
            cacheGroups: {
                // 第三方模块
                vendor: {
                    name: 'vendor', // chunk 名称
                    priority: 1, // 权限更高，优先抽离，重要！！！ 有个模块同时符合ventor和common则先走vendor
                    test: /node_modules/, //路径命中就走这个抽离
                    minSize: 0,  // 这个模块最小多少才抽离
                    minChunks: 1  // 这个模块最少被复用过几次才抽离
                },

                // 公共的模块
                common: {
                    name: 'common', // chunk 名称
                    priority: 0, // 优先级 //!没有路径所以所有模块都可以走这，但是有个minchunks=2加了限制 标识至少被复用啦两次才打包成这个name的模块
                    minSize: 0,  // 公共模块的大小限制
                    minChunks: 2  // 公共模块最少复用过几次 
                }
            }
        }
```

## 4.异步加载js

![image-20210329172042914](https://i.loli.net/2021/03/29/tCYw2jSydJFnBsq.png)

标识vue和react的都是这个方法  这种import异步加载方法这个是js支持的  这个加载后的文件打包后也是个单独的chunk，和common和venter和index都不是同一个chunk

## 5.react和vue配置

就是用babel-loader 在.babelrc的添加![image-20210329172503135](https://i.loli.net/2021/03/29/CiVx1leYUcu6mnL.png)

因为js文件都走babel-loader 这里就也会先走这个react解析

vue的话就加一个vue-loader处理vue文件

## 6.module,chunk,bundle的区别

module就是源码文件 webpack中什么文件都是Module 在src下

chunk 是多module的合成 比如entry import splitChunks都会生成chunk ，中间部分，不可见

bundle 就是最终的输出js文件 在dist下

```js
 new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index']  // 只引用 index.js
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other']  // 只引用 other.js
        })
```

## 7.性能优化

### 1.**优化打包构建速度** 开发环境 你不想等很久编译过程把

![image-20210329173506750](https://i.loli.net/2021/03/29/7bJgZUqmeFVCjMo.png)

![image-20210329173551533](https://i.loli.net/2021/03/29/N6mnM4za2BxXbWl.png)

#### 1.优化babel-loader

​	1.开启缓存 当es6代码没变 不会去解析

​	2.增加exclude 排除Node_modules modules一般都是解析好的

![image-20210329173641314](https://i.loli.net/2021/03/29/co6EXOtF8Kva3MW.png)

#### 2.ignorePlugin 避免引入无用模块  比如Moment这个库 有好多种语言 但是我们只需要中文

![image-20210329174206621](https://i.loli.net/2021/03/29/CYgiyvAseLo8Iz6.png)

不引入moment的locale目录

我们自己手动import中文这个目录

![image-20210329174320055](https://i.loli.net/2021/03/29/ilzEDCp8Yrwce2M.png)

#### 3.noParse

xx.min.js是已经打包过啦 不需要打包

![image-20210329174426675](https://i.loli.net/2021/03/29/dGJk8Eu5ONtUWiw.png)

#### 4.happyPack

**多进程**打包  因为js单**线程** 我们开启多进程打包 多核cpu 提高打包速度

js的打包开启啦多线程

![image-20210329174848718](../../../typora/images/image-20210329174848718.png)

![image-20210329174854956](../../../typora/images/image-20210329174854956.png)



#### 5.parallerUglifyPlugin 多线程压缩js

parallerUgfyPlugin 只能放到production 因为开发环境不用压缩代码

![image-20210329175016454](https://i.loli.net/2021/03/29/GBkt6aMpqyPlXIu.png)

用法：

![image-20210329175048228](https://i.loli.net/2021/03/29/FkhTfyvEztVJK9Q.png)

**多线程对比**

![image-20210329175331909](https://i.loli.net/2021/03/29/4G7TOBRLczkrijw.png)

#### 6.热跟新

**自动刷新**：所有网页全部刷新，速度较慢，且网页全部刷新，状态丢失 比如vuex会没了 input框之前填了里面变为空

**热更新**：新代码生效，**网页不刷新，状态不丢失**

使用： 修改三个部分

```js
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
```

devserver里    hot: true,

plugin里 new HotModuleReplacementPlugin()

entry

```js
  entry: {
        // index: path.join(srcPath, 'index.js'),
        index: [
            'webpack-dev-server/client?http://localhost:8080/',
            'webpack/hot/dev-server',
            path.join(srcPath, 'index.js')
        ],
        other: path.join(srcPath, 'other.js')
    },
```

热更新是由成本的，我们需要增加热跟新监听的范围

//index.js

![image-20210329184236676](https://i.loli.net/2021/03/29/M9FBhYp5VR2KuQL.png)

​	这里只有math.js修改时热跟新且会促发回调 其他的修改会自动刷新(包括index.js 这段代码写在index中但是不在监听中)



#### 7.Dllplugin 动态链接库

webpack已经内置啦dllplugin

### 2.**优化产出的代码**，生产环境 线上代码

打包后的体积小

合理分包

速度快

**1.小图片采用base64编码** 没必要多网络请求

**2**.bundle加上**contentHash** 命中缓存 前端代码加载会更快

**3.懒加载**

**4**.**提取公共代码** 第三方代码和公共代码 单独打包成一个chunk

5.**ingorePlugin** 缩小代码体积

**6.cdn加速**

![image-20210329185943554](https://i.loli.net/2021/03/29/M89TNzUebRWH5w3.png)

![image-20210329190140980](https://i.loli.net/2021/03/29/9lg3AHuzxkmfWQh.png)

![image-20210329190057542](https://i.loli.net/2021/03/29/iCSDXFQPhIvHL87.png)

所有静态文件（js,css）和图片都会加上这个前缀，我们得把静态文件自己传到cdn上去就行

**7.使用production**

mode:production自动会的配置

1.自动开启代码压缩

2.vue/react 等成熟代码会自动删掉调试代码 如开发环境的warning

3.启动tree-shaking

**8.tree-shaking**  必须用es6 module才会生效 commonjs就不行

```js
//math.js
const sum = ()=>{}
const muti = ()=>{}
//index.js
sum(10,20)
```

打包后依然有muti代码 这是没开启tree-shaking ，开启Mode='production' 后不会把muti这个函数打包进去

**使用**

```js

{
  "presets": [
    ["env", {
      "modules": false  //关键点
    }],
    "stage-2",
    "react"
  ]
}


```

**流程：babel首先处理js文件，真正进行tree-shaking识别和记录的是webpack本身。删除多于代码是在uglify中执行的**

**9.es6 module 和commonjs区别**

es6 是静态引入，编译时候引入  不能写在if中

commonjs 动态引入 执行时候引入

es6 才能静态分析实现tree-shaking  

commonjs 是执行时候才知道这个要不要 你不知道if什么时候执行 所以不能tree-shaking掉

<img src="https://i.loli.net/2021/03/29/CSEBAGz8IjOHf2w.png" alt="image-20210329191407908" style="zoom: 67%;" />











## 题目

### 1.前端为什么要打包和构建

代码相关

1.代码的体积更小，加载更快 (压缩，tree-shaking)

2.编辑高级语言和语法(es6.scss) 提高开发效率

3.完备的兼容性和错误提示(post-css,polyfill,eslintl)

团队部门相关

4.统一的高效开发环境

5.统一的构建流程和产出代码

## 2.loader和plugin区别

loaders是模块转换器 less->css

plugin 是扩展插件 htmlwebpackplugin 

## 3.polyfill和plugin区别

![image-20210329201317777](https://i.loli.net/2021/03/29/8cbs6EV2H4Ml5ut.png)

## 4.为什么proxy不能被polyfill

因为proxy的功能不能用object.definePropety模拟，class是可以被function模拟的，promise是可以被callback模拟

## 5.手写loader https://juejin.cn/post/6888936770692448270

遵循`Webpack`制定的设计规则和结构，输入与输出均为字符串，各个`Loader`完全独立，即插即用。

loader默认导出一个函数，接受匹配到的文件资源字符串和SourceMap，我们可以修改文件内容字符串后再返回给下一个loader进行处理，因此最简单的一个loader如下：

```js
module.exports = function(source, map){ //source就是匹配到的文件的内容
    return source
}
```

导出的`loader函数`不能使用箭头函数，因为很多loader内部的属性和方法都需要通过`this`进行调用

编写一个style-loader：其实就是把css文件内的代码添加到style标签内

```js
function loader(source, map) {
  let style = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style)
  `;
  return style;
}
module.exports = loader;

```

**异步loader**

`style-loader`都是同步操作,我们在处理source时，有时候会进行异步操作，一种方法是通过async/await，阻塞操作执行；另一种方法可以通过loader本身提供的回调函数`callback`。callback就是可以等异步操作结束后再return 第二个参数

```js
//loader/less-loader
const less = require("less");
function loader(source) {
  const callback = this.async();
  less.render(source, function (err, res) {
    let { css } = res;
    callback(null, css); //把css return 出去 有callback 这个Loader就会等这个异步结束调用callback 而不是直接获取return的Undified
  });
}
module.exports = loader;

```

**加载本地loader**

只需要写上路径   loader: './loader/style-loader.js',

**处理参数**

```js
{
  test: /\.(jpg|png|gif|bmp|jpeg)$/,
  use: 'url-loader?limt=1024&name=[hash:8].[ext]'
}
```

外面通过getOptions获取参数对象 这个函数在loader-utils包

获取到参数后，我们还需要对获取到的`options`参数进行完整性校验，避免有些参数漏传，如果一个个判断校验比较繁琐，这就用到另一个官方包`schema-utils`：

```js
const { getOptions } = require("loader-utils");
const { validate } = require("schema-utils");
const schema = require("./schema.json");
module.exports = function (source, map) {
  const options = getOptions(this);
  const configuration = { name: "Loader Name"};
  validate(schema, options, configuration);
  //省略其他代码
}

```

`validate`函数并没有返回值，打印返回值发现是`undefined`，因为如果参数不通过的话直接会抛出`ValidationError`异常，直接进程中断；这里引入了一个`schema.json`，就是我们对`options``中参数进行校验的一个json格式的对应表：

```js
{
    "type": "object",
    "properties": {
        "source": {
            "type": "boolean"
        },
        "name": {
            "type": "string"
        },
    },
    "additionalProperties": false
}

```

**缓存加速**

　　在有些情况下，loader处理需要大量的计算非常耗性能（比如babel-loader），如果每次构建都重新执行相同的转换操作每次构建都会非常慢。

　　因此webpack默认会将loader的处理结果标记为可缓存，也就是说在需要被处理的文件或者其依赖的文件没有发生变化时，它的输出结果必然是相同的；如果不想让webpack缓存该loader，可以禁用缓存：

```js
module.exports = function(source) {
  // 强制不缓存
  this.cacheable(false);
  return source;
};
```

**loader依赖**

在loader中，我们有时候也会使用到外部的资源文件(比如a.txt)，我们需要在loader对这些资源文件进行声明，这些声明信息主要用于使得缓存loader失效，以及在观察模式(watch mode)下重新编译

```js
//loader/banner-loader
const fs = require("fs");
const path = require("path");
const { getOptions } = require("loader-utils");

module.exports = function (source) {
  const options = getOptions(this);
  if (options.filename) {
    let txt = "";
    if (options.filename == "banner1") {
      this.addDependency(path.resolve(__dirname, "./banner1.txt")); //声明依赖 便于后面的loader缓存知道有这个依赖而依赖不变可以缓存
      txt = fs.readFileSync(path.resolve(__dirname, "./banner1.txt"));//加载依赖
    } else if (options.filename == "banner2") {
      this.addDependency(path.resolve(__dirname, "./banner1.txt"));
      txt = fs.readFileSync(path.resolve(__dirname, "./banner1.txt"));
    }
    return source + txt;
  } else if (options.text) {
    return source + `/* ${options.text} */`;
  } else {
    return source;
  }
};

```

## 6.手写Plugin

在 Webpack 运行的**生命周期**中会**广播出许多事件**，Plugin 可以监听这些事件，在合适的时机**通过Webpack提供的API**改变输出结果

plugin本质就是类

**传参**

```js
//plugins/MyPlugin.js
class MyPlugin {
  constructor(options) {
    console.log("Plugin被创建了");
    console.log(options);
    this.options = options;
  }
  apply (compiler) {}
}
//webpack.config.js
module.exports = {
  plugins: [
    new MyPlugin({ title: 'MyPlugin' })
  ],
}


```

`apply`函数，它会在webpack运行时被调用，并且注入`compiler`对象；其工作流程如下：

**webpack启动，执行new myPlugin(options)，初始化插件并获取实例**

**初始化complier对象，调用myPlugin.apply(complier)给插件传入complier对象**

**插件实例获取complier，通过complier监听webpack广播的事件，通过complier对象操作webpack**


compiler不仅有同步的钩子，通过tap函数来注册，还有异步的钩子，通过`tapAsync`和`tapPromise`来注册：

```js
class MyPlugin {
  apply(compiler) {
    //不推荐使用，plugin函数被废弃了
    // compiler.plugin("compile", (compilation) => {
    //   console.log("compile");
    // });
    
    compiler.hooks.done.tap("MyPlugin", (compilation) => { //done 这个Hook是指这个插件注册完成后触发
      console.log("compilation done");
    });
      compiler.hooks.run.tapAsync("MyPlugin", (compilation, callback) => {//run表示插件正在运行时候
      setTimeout(()=>{
        console.log("compilation run");
        callback() //callback 表示异步事件的返回值
      }, 1000)
    });
    compiler.hooks.emit.tapPromise("MyPlugin", (compilation) => { //emit表示输出 asset 到 output 目录之前执行
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          console.log("compilation emit");
          resolve();
        }, 1000)
      });
    });


  }
}

```

`compiler`对象包含了 Webpack 环境所有的的配置信息。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。

`compilation`对象包含了当前的模块资源、编译生成资源、变化的文件等。当运行webpack 开发环境中间件时，**每当检测到一个文件变化，就会创建一个新的 compilation**，从而生成一组新的编译资源。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。

**总结**

compiler 可以获取webpack整个的生命周期 以及webpack的plugin/loader的资源

compilation 是单个文件处理的时候可以获取单个文件的开始和最后输出的状态 和单个文件有关

https://webpack.docschina.org/api/compiler-hooks/#emit 所有的钩子

我们就来尝试一个简单的示例插件，在打包目录生成一个`filelist.md`文件，文件的内容是将所有构建生成文件展示在一个列表中：

```js
class FileListPlugin {
    apply(compiler){
        compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback)=>{
            var filelist = 'In this build:\n\n';
            // 遍历所有编译过的资源文件，
            // 对于每个文件名称，都添加一行内容。
            for (var filename in compilation.assets) {
                filelist += '- ' + filename + '\n';
            }
            // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
            compilation.assets['filelist.md'] = {
                source: function() {
                    return filelist;
                },
                size: function() {
                    return filelist.length;
                }
            };
            callback();
        })
    }
}
module.exports = FileListPlugin


```

