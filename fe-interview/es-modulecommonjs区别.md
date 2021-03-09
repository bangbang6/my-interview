es6 module

静态引入，编译时引入  webpack打包时候就知道是什么 不能通过代码变量来控制是否引用 **只有es6 module才能静态分析 实先tree-shaking**   import {xx} from  xx





commonjs

动态引入 执行时候引入 if(a) require('xxx') 有可能引入所以没法tree-shaking

![image-20210308145446540](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308145446540.png)



## 详细区别

1.一个是复制 一个只读

2.一个是静态一个是动态

![image-20210308145836766](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308145836766.png)