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