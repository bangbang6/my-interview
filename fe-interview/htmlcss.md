### 题目

1.选择器顺序

.css选择器分为简单选择器,伪元素选择器和组合选择器。简单选择器又分为标签选择器,...

2.css中权重最高的样式为行内样式,就是以style=“”方式直接加入到H...

3.其次是ID选择器,ID选择器由于每一个ID在代码中只能出现一次,和唯一指向性,...

4.权重处于第三的是类、伪类和属性选择器。

5.权重较低的是标签选择器和伪元素选择器。

![img](https://img2020.cnblogs.com/blog/1864877/202004/1864877-20200408234042787-674324294.png)

2.如何理解html语义化

![image-20210308103952969](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308103952969.png)

机器只认识标签 比如h1是重要内容 ul是列表

3.块级元素/内联元素

![image-20210308104255578](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308104255578.png)

4.盒模型宽度

![image-20210308104821203](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308104821203.png)

![image-20210308104837612](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308104837612.png)

offset = 122px 不加外边距



border-sizing = border-box  那么这个width=100px就是![image-20210308104942573](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308104942573.png)整个的宽度。

5.纵向重叠·

![image-20210308105210561](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308105210561.png)

相邻元素的margin-top和margin-bottom会重叠，空元素也全部会重叠 高度为0 距离为15px

margin-left/right不会重叠 会相加 空元素也不会重叠

6.margin 负值问题

margin-right/margin-bottom 都是在外界看来自己宽度/高度在减少 导致 右侧或者下方移动



![image-20210308105807771](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308105807771.png)

7.bfc

块级格式化上下文

**一块独立的区域 内部的渲染不会影响外部的区域 ** 

比如一个div内部的图片比较大 超出了div高度出去了 这时候给外部的div一个over-flow：hidden,让他bfc，不让内部图片影响别的区域

形成BFC条件

​	1.float 不是None

​	2.position 是absloute 或者fixed

​	3.over-flow 不是visiable

​	4.display是flex 或者inlie-block

8.float

圣杯布局和双飞翼布局

![image-20210308110959477](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308110959477.png)

圣杯布局技巧

padding两边留白

![image-20210308111054395](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308111054395.png)

双飞翼布局技巧

通过margin来两边留白

9.手写clearfix

![image-20210308113243972](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308113243972.png)

10.flex

**align-self  是写在子元素上的属性  是元素在副轴上的位置**

![image-20210308113803459](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308113803459.png)

item:nth-child(2){

​	align-self:center 

}

表示在纵轴上的位置是中心，除了auto，其他都与align-items属性完全一致。

11.relative

只写这个是表示对自身元素的偏移

```css
{
	position:relative;
	right:200
}
相当于自身元素偏移200
```

12.居中 (内部需要居中的元素分为这几类 inline block absolute 而不是针对外面的元素是否是块/行)

![image-20210308114315693](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308114315693.png)

![image-20210308114357514](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308114357514.png)

第三个要先top:50%;left:50%

line-height也可以定义在block元素 当line-height= height时候内部inline元素会垂直居中5

13.line-height如何继承

line-height可以写成 20px/1.5/150% 三种情况  比例都是对应此时元素的font-size

20px直接继承

1.5是继承比例 然后在根据自身元素的font-size去乘

150% 是先在父元素算出具体的px 再去继承这个px

14.响应式

​	1.rem是什么？

​	2.常见方案

相对长度单位 ：都是对应font-size

​	em:相对父元素font-size

​	rem：相对根元素的font-size r就是root 的em 更元素(html）我们可以自己控制，用于响应式

​	2.常见方案

​	![image-20210308120715826](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308120715826.png)

​	3.vw/vh

​		rem具有阶梯型(弊端)

![image-20210308143502130](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308143502130.png)

比如我想368一个font-size 369一个 然而这个就是一个大范围一个font-size

宽度比较

![image-20210308144122371](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308144122371.png)

screen.height 屏幕高度 innerHeight 浏览器高度  clientHeight dom元素实际高度

vh 网页视口高度的1/100

vw 网页视口宽度的1/100

vmax 取两者最大值 vmin两者最小值



14.各种Height区别

clientHeight：包括padding但不包括border、水平滚动条、margin的元素的高度。对于inline的元素这个属性一直是0，单位px，只读元素。

offsetHeight：包括padding、border、水平滚动条，但不包括margin的元素的高度。对于inline的元素这个属性一直是0，单位px，只读元素。

scrollHeight: 因为子元素比父元素高，父元素不想被子元素撑的一样高就显示出了滚动条，在滚动的过程中本元素有部分被隐藏了，scrollHeight代表包括当前不可见部分的元素的高度。而可见部分的高度其实就是clientHeight，也就是scrollHeight>=clientHeight恒成立。在有滚动条时讨论scrollHeight才有意义，在没有滚动条时scrollHeight==clientHeight恒成立。单位px，只读元素。

![image-20210308144746960](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308144746960.png)