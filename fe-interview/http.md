

1.http状态码？

分类：

1xx:服务器收到请求，但是服务器还没返回

2xx:请求成功 200

3xx:重定向 302 你来我这不行 我告诉你其他地方你去那

4xx：客户端错误 404请求了不存在的地址

5xx: 500 服务器错误

2.最常用的状态码

200 成功 

301 永远重定向 配合location 浏览器自动处理 以后永远直接访问这个新的location地址

302 临时重定向 配合location 浏览器自动处理 下次浏览器还是会访问这个临时地址看是否要重定向  

```
比如 我们在知乎里面跳转到别的外部网址 都是先访问知乎内部的一个网址 然后重定向到别的外部网址
```

304 表示资源未被修改 你之前请求过一样的 没过期直接用缓存的结果

403 没有角色权限  

500 服务器错误bug

504 网关超时 服务器内部在链接其他服务器的时候超时啦



3.http的methods

get 获取数据 

post 新建数据

patch/put 更新数据

delete 删除数据

4.restful api 就是一种api设计方法

**传统api设计 把每个url当作一个功能**

**restfulapi设计 把每个url当作唯一资源**

```js
比如 /getList /deleteItem 这些都是当作功能
现在有啦put,delete 这种东西 我们只要请求一个url
比如 @get /item   @put /item 是方法上去区分获取还是改变 url都是那个item 
```



```
再比如 
传统api设计 /api/list?pageIndex=2 特别像一个函数传入Index=2
现在api /api/list/2 这个就是一个id
```

5.http headers

1.request headers

accept 浏览器可接受的格式

accept-encoding:浏览器接受的压缩算法

connection :keep-alive 依次tcp链接重复用

cookie:同域都会自动带cookie

host:请求的域名

user-agent:UA即浏览器信息

conntent-type 发送数据的格式 application/json



2.response headers

conntent-type 返回数据的格式 application/json,text/html

content-length 返回数据的长度

content-encoding 返回数据的压缩算法

set-cookie 服务端改cookie

​	缓存相关的

Cache-control : expires

expires:if-modified-since

etag:if-none-match

见http-缓存  