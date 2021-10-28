

1.http状态码？

分类：

1xx:服务器收到请求，但是服务器还没返回

2xx:请求成功 200

3xx:重定向 302 你来我这不行 我告诉你其他地方你去那

4xx：客户端错误 404请求了不存在的地址 401表示请求未授权 403表示禁止访问

5xx: 500 服务器错误

400 客户端参数错误

401 没有登陆

403 没有权限

500 服务器内部错误 无法完成请求

502 错误网关 服务器作为网关或者代理出错

503 服务器目前无法使用

504 网关或者代理服务器超时

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



#### `GET`

`GET`请求会`显示`请求指定的资源。一般来说`GET`方法应该只用于数据的读取，而不应当用于会产生副作用的`非幂等`的操作中。

`GET`会方法请求指定的页面信息，并返回响应主体，`GET`被认为是不安全的方法，因为`GET`方法会被网络蜘蛛等任意的访问。



#### `HEAD`

`HEAD`方法与`GET`方法一样，都是向服务器发出指定资源的请求。但是，服务器在响应`HEAD`请求时**不会回传资源的内容部分**，即：响应主体。这样，我们可以不传输全部内容的情况下，就可以获取服务器的**响应头信息**。`HEAD`方法常被用于客户端查看服务器的性能。



#### `POST`

`POST`请求会 向指定资源提交数据，请求服务器进行处理，如：表单数据提交、文件上传等，请求数据会被包含在请求体中。`POST`方法是`非幂等`的方法，因为这个请求可能会创建新的资源或/和修改现有资源。



#### `PUT`

`PUT`请求会身向**指定资源位置**上传其最新内容，`PUT`方法是`幂等`的方法。通过该方法客户端可以将指定资源的最新数据传送给服务器取代指定的资源的内容。



#### `DELETE`

`DELETE`请求用于请求服务器删除所请求`URI`（统一资源标识符，Uniform Resource Identifier）所标识的资源。`DELETE`请求后指定资源会被删除，`DELETE`方法也是`幂等`的。



#### `CONNECT`

`CONNECT`方法是`HTTP/1.1`协议预留的，**能够将连接改为管道方式的代理服务器。**通常用于[SSL](http://itbilu.com/other/relate/N16Uaoyp.html)**加密**服务器的链接与**非加密的**HTTP代理服务器的通信。



#### `OPTIONS`

`OPTIONS`请求与`HEAD`类似，一般也是用于客户端查看服务器的性能。 这个方法会请求服务器返回该资源所支持的**所有HTTP请求方法**，该方法会用来代替资源名称，向服务器发送`OPTIONS`请求，可以测试服务器功能是否正常。JavaScript的[XMLHttpRequest](http://itbilu.com/javascript/js/VkiXuUcC.html)对象进行`CORS`跨域资源共享时，就是使用`OPTIONS`方法发送嗅探请求，以判断是否有对指定资源的访问权限。 

- 它用于获取当前`URL`所支持的方法。如果请求成功，会有一个`Allow`的头包含类似`“GET,POST”`这样的信息

#### `TRACE`

`TRACE`请求服务器回显其收到的请求信息，该方法主要用于HTTP请求的测试或诊断。



**`HTTP/1.1`之后增加的方法**

在`HTTP/1.1`标准制定之后，又陆续扩展了一些方法。其中使用中较多的是 `PATCH` 方法：

#### `PATCH`

`PATCH`方法出现的较晚，它在2010年的[RFC 5789](http://tools.ietf.org/html/rfc5789)标准中被定义。`PATCH`请求与`PUT`请求类似，同样用于资源的更新。二者有以下两点不同：

- 但`PATCH`一般用于资源的部分更新，而`PUT`一般用于资源的整体更新。
- 当资源不存在时，`PATCH`会创建一个新的资源，而`PUT`只会对已在资源进行更新。

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