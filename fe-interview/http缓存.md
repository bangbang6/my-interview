1.**http缓存策略 ： 强制缓存，协商缓存**

刷新的方式会影响缓存

### 强制缓存

cache-control 服务端返回资源时候如果可以缓存就会加这个字段

![image-20210308093642882](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308093642882.png)

表示改资源可以缓存这莫多秒，这段时间内就是访问本地缓存不会到服务端

![image-20210308093709602](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308093709602.png)

超过设置的时间，重新经过服务器，再次返回cache-control

![image-20210308093917728](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308093917728.png)

cache-control: max-age =xxx/ no-cache(不用强制缓存在本地，让服务器去缓存)  / no-store(服务器的缓存也不要) /private(只能用户做缓存) /public(中间代理也能缓存)

expires也是控制缓存过期,但是被cache-control代替

### 协商缓存（对比缓存） 服务端缓存策略 

1.服务器判断资源是否可以用缓存而不是这个资源缓存到服务端(一般都是缓存到本地)

2.服务器判断客户端资源是否和服务器资源一样 一样返回304 不一样返回200和最新资源（通过资源标识来判断是否一样）

![image-20210308094734270](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308094734270.png)

**资源标识有哪些**

是在response headers中

last-modified 资源最后修改时间

etag 资源唯一标识string 类似人类指纹

这两个能共存 以etag优先

last-modified ：

![image-20210308094920183](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308094920183.png)

if-modefied-since的值就是last-modified的值 也就是最后修改时间 服务器判断收到这个时间和自己里面的时间对比 一样则用缓存 不用则标识服务器改变啦，则重新返回资源和last-modified

etag同理

![image-20210308095158294](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308095158294.png)

if-none-match的值和etag值一样

**etag对应 if-none-match （匹配啦吗）  last-modifed对应if-modified-since (自从上次改变拉马)**

![image-20210308095355254](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308095355254.png)

整体流程

![image-20210308095538455](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\image-20210308095538455.png)

看缓存是否过期？没过期是强制缓存 过期是协商缓存 读取缓存都是在客户端





## 刷新操作对缓存的影响

三种刷新

1.地址输入url，跳转链接，前进后退        =》 强制缓存有效 协商缓存有效     (就都用缓存)

2.点击刷新，f5		=》	强制缓存失效 协商缓存有效 （本地失效 去服务器看看是否变化在返回）

3.强制刷新       =》 缓存都失效 (啥都要新的)