## 1.tree shaking

1.上下文未用到的代码

2.所有代码都必须基于es6 import 和export  

3.mode='production‘自动就有tree-shaking

```js
new TerserPlugin(/* ... */), //这个plugin去tree-shaking
```

原理  webpack内先注释没用到的 然后TerserPlugin去掉这些注释的代码

缺点:我们可能会修改全局作用域 比如修改window上的属性和方法 这个是在export体现不出来的 如果shake掉的话，代码出问题

解决方法 sideeffects 告诉webpack哪些东西有副作用不能去掉(文件列表)

![image-20210601185317372](https://i.loli.net/2021/06/01/HIUa23ER9mNYcd5.png)

因为css一般都不是export /import 但是都得用到，或者你自己知道的影响全局作用域的js文件

4.babel配置  modules: false

```js
module.exports = {
    presets: [
        [
            '@babel/preset-env',//babel插件的集合
            {
                modules: false,//!保留es6模块话化语法 不要把es6的转成别的低级的模块化语法 以防止无法tree-shaking
                "targets": {
                    "browsers": [">0.25%"]
                },
                "useBuiltIns": "usage",
                "bugfixes": true
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        "@babel/plugin-transform-runtime",
    ]
};
```

## 2.js压缩

![image-20210601185640072](https://i.loli.net/2021/06/01/BLHfzsmqhZGdXw3.png)

terser-webpack-plugin比之前二点uglifyjs更好 而且生产模式下就有啦这个插件

## 3.作用域提升

![image-20210601185937559](https://i.loli.net/2021/06/01/yrW2BZG8E6FgNcU.png)

没启用作用域提升，我们要导入依赖模块取名字 然后再调用依赖的模块

启用啦作用域提升 webpack会分析依赖分析 会合并这个依赖文件到这个文件，直接取这个值

![image-20210601190125713](https://i.loli.net/2021/06/01/qDyuzHckrX3eR5w.png)

生产模式自动开启啦作用域提升

## 4.babel7配置

1.配置polyfill 引入 babel/polyfill 这个包兼容浏览器所有的api 比如include weakmap 但是我们又不需要那么多兼容 我们可能只要一个函数兼容 这时候再babel里面加上这个就行

```js
"useBuiltIns": "usage",
```

2.辅助函数 每当我们声明一个类的时候都会创建一个辅助函数_classCallcheck 这个就是实现类的一些继承方法，如果我们所有的类共用这个函数就会达到减少很多代码的效果 "@babel/plugin-transform-runtime",开启

```js
"@babel/plugin-transform-runtime",
```

![image-20210601192639034](https://i.loli.net/2021/06/01/5lFT9wHJ6BmOW2y.png)

3.根据浏览器取选择 支持越多浏览器 代码越多

## 5.webpack打包速度优化

#### 1.noparse:

有些库不用递归解析，比如外部的大库(因为他们不要引入别的库) 被忽略的库不能有模块化编写 既不能有Import require define 比如loadsh/jquery

```js
module.exports = {
  //...
  module: {
    noParse: /jquery|lodash/,
  },
};
```



#### 2.dllplugin

我们把一个库提取出来作为引用 动态链接库 每次构建时候不需要重复构建直接用之前的引用 避免打包时候对不变的库重复的构建  比如react react-dom

webpack.dll.config.js 作用生成dll文件

```js

const path = require("path");
const webpack = require("webpack");
module.exports = {
    mode: "production",
    entry: {
        react: ["react", "react-dom"],
    },
    output: {
        filename: "[name].dll.js",
        path: path.resolve(__dirname, "dll"),
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            name: "[name]",
            path: path.resolve(__dirname, "dll/[name].manifest.json")
        })
    ]
};

```

webpack.config.js 使用dll文件 使用对应的描述符文件即可

```js
 
      new DllReferencePlugin({
            manifest: require(`${__dirname}/dll/react.manifest.json`)
        })
```

应用场景:开发环境用的多

后面采用autodllplugin

```js
module.exports = {
  // ......
  plugins: [
        // 第 2 步：配置要打包为 dll 的文件
        new AutoDllPlugin({
            inject: true, // 设为 true 就把 DLL bundles 插到 index.html 里
            filename: '[name].dll.js',
            context: path.resolve(__dirname, '../'), // AutoDllPlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
            entry: {
                react: [
                    'react',
                    'react-dom'
                ]
            }
        })
  ]
}
```

在后面直接用[HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin) 代替了dllplugin 因为效果更好

## 6.生成环境优化

1.代码拆分



```js
 entry: {
        app: './src/index.jsx',
        test:'./src/test.js'
    },
```

两个entry webpack会分别从这两个entry开头递归分析export和Import的依赖关系 形成两个Bundle

**splitchunks**提取公共代码，以及分离业务代码和公共代码，部分代码改变只会改变对应的bundle

```js
optimization: {
        splitChunks: {
            cacheGroups: {//分组
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,//提取第三方库为单独的bundle
                    minSize: 0,
                    minChunks: 1,
                    priority: 10,
                    chunks: 'initial'
                },
                common: {
                    name: 'common',//提取业务公共代码 名字叫common
                    test: /[\\/]src[\\/]/,
                    chunks: 'all',//all(静态引入和动态引入都考虑 比如suspense引入的组件也考虑) async(异步加载的考虑) initial 同步加载
                    minSize: 0,
                    minChunks: 2//公共的chunks数 只是被共同引入两次的chunk才会打包进来
                }
            }
        }
    },
```

上面是同步加载 下面是异步加载

![image-20210601200151341](https://i.loli.net/2021/06/01/8mn37CUow6jpdyS.png)

## 7.基于webpack的资源压缩

**minification**

![image-20210601200851821](https://i.loli.net/2021/06/01/HvAra51No3KJBPk.png)

```js
  new UglifyJsPlugin(/* ... */),//js
        new MiniCssExtractPlugin({//从js文件中提取出一个css文件
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash:8].css',
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: ['default', {discardComments: {removeAll: true}}],
            },
            canPrint: true
        }),//css的提取(从js文件中提取出一个css文件)和优化css
      new HtmlWebpackPlugin({
            template: 'template.html',
        }),//html
```

```js
{
  collapseWhitespace: true,//清除html空白
  keepClosingSlash: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,//取除默认属性
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true
}
```

## 8.webpack资源持久化缓存

1.每个静态资源文件有一个唯一的hash值 只要内容没变就不变且唯一 修改内容后才会变 contentHash 充分利用浏览器缓存，且保证不会使用新的html和旧js文件 不一致的情况

```js
new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',//直接entry出来的bundle
            chunkFilename: '[id].[contenthash:8].css',//splitchunks拆分出来的bundle 比如js是一个splitchunks出的Bundle 这个js文件里面的css文件也被提取出来 作为单独的bundle [id].[contenthash:8].css
        }),
   output: {
        path: `${__dirname}/build`,
        filename: '[name].[hash].bundle.js',//直接entry出来的bundle
        chunkFilename: '[name].[chunkhash:8].bundle.js'//splitchunks拆分出来的bundle
    },
```

重点关注filename和chunkFilename的区别

## 9.监测和分析

1.webpack chart :可视化分析出每一部分由什么组成

2.source-map-explorer:对Build下所有的js进行分析(要开source-map)

3.速度：speed-measure-webpack-plugin 会告诉所有的loader和Plugin的耗时 以及调用顺序

![image-20210601203054385](https://i.loli.net/2021/06/01/awhNZsqeHxrG4YA.png)

## 10.React按需加载

suspense返回的组件就是按需加载的组件  和react-router结合使用

```react
function App {
	return <suspense fallback='<div>loading</div>'>
	<xxx>
</suspense>    
}

    
<Route component = {App}></Route>
```

我们不需要拆分的太细 因为太细我们需要发很多请求 反而影响性能

