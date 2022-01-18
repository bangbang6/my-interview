## 1.装饰器综合

```ts
import 'reflect-metadata'
//!装饰器执行顺序 1.属性装饰器-》2.方法参数装饰器->3.方法装饰器-》4.类装饰器
function  Inject(key1:string) {
  return (targetClassPrototype:any,key:string)=> {
    let propClass = Reflect.getMetadata("design:type",targetClassPrototype,key) //获取内置元数据 比如属性对应的类型
    console.log(propClass,propClass);
  }
}
function  RequestMethodDecorator(path:string) {
  return (targetClassPrototype:any,methodname:string,dataProps:PropertyDescriptor)=>{
    Reflect.defineMetadata('reqPath',path,targetClassPrototype,methodname) //自定义元数据 k-v对 到原型对象的name属性上

  }
}
function ControllerDecorator<T extends {new (...arg:any):any} >(targetClass:T) {
  console.log('tst',targetClass.prototype); //!{ login: [Function] } 没有enter属性
  
  Object.keys(targetClass.prototype).forEach(name=>{
    const path = Reflect.getMetadata('reqPath',targetClass.prototype,name)
  })
}
@ControllerDecorator
class UserService {
  @RequestMethodDecorator('/login')
  public login(){//!这个在原型上  这种定义转到js中就是 UserService.prototype.login = 'xxx

  }
  public enter?:string  //!这个不会在原型上  这种定义转到js中就是 this.enter = 'xxx  不是原型对象种 而是通过子类调用父类构造函数类来复制this.enter = super.enter来继承
  constructor(){
    console.log('enter');
  }
}
class UserController{
  @Inject('userService')
  private userService ?:UserService
}
```

## 2.参数装饰器+构造函数装饰器

```ts
function  metaDecorator(key:string) {
  return (targetClassPrototype:any,methodname:string,index:number)=>{
    console.log(targetClassPrototype,methodname,index); //metaClass { loginZ: [Function] } loginZ 0   index表示第几个参数
  }
}
function  constrotDecorator(key:string) {
  return (target:any,methodname:string,index:number)=>{
    console.log(target,methodname,index); //[Function: metaClass] undefined 0  和别人不一样的是构造函数装饰器第一个参数不是原型对象 而是类
    let arr = Reflect.getMetadata('design:paramtypes',target)//!拿到所有的参数的类型
    console.log('arr',arr);//!arr [ [Function: UserService] ]
  }
}
class metaClass {
  loginZ(@metaDecorator('名字') name:UserService){

  }
  constructor(@constrotDecorator('user') private user:UserService){

  }
}
```

## 3.参数装饰器实战 实现创建实例和使用分离 实现调用serivice的login

```ts
class Collection {
  static collection:Collection = new Collection() //单例设计模式
  private collectionMap = new Map<string,any>()
  public set(key:string,value:any){
    this.collectionMap.set(key,value)
  }
  public get(key:string){
    return this.collectionMap.get(key)
  }
  private constructor(){

  }
}
@ControllerDecorator
class UserService {
  @RequestMethodDecorator('/login')
  public login(){//!这个在原型上  这种定义转到js中就是 UserService.prototype.login = 'xxx
    console.log('login');
  }
  public enter?:string  //!这个不会在原型上  这种定义转到js中就是 this.enter = 'xxx  不是原型对象种 而是通过子类调用父类构造函数类来复制this.enter = super.enter来继承
  constructor(){
    console.log('enter');
  }
}
class UserController{
  @Inject('userService')
  private userService ?:UserService
}
function  metaDecorator(key:string) {
  return (targetClassPrototype:any,methodname:string,index:number)=>{
    console.log(targetClassPrototype,methodname,index); //metaClass { loginZ: [Function] } loginZ 0   index表示第几个参数
  }
}
function  constrotDecorator(key:string) {
  return (target:any,methodname:string,index:number)=>{
    console.log(target,methodname,index); //[Function: metaClass] undefined 0  和别人不一样的是构造函数装饰器第一个参数不是原型对象 而是类
    let arr = Reflect.getMetadata('design:paramtypes',target)//!拿到所有的参数的类型
    console.log('arr',arr);//!arr [ [Function: UserService] ]
    let userSeriveInstance =new arr[0]()//创建实例
Collection.collection.set(key,userSeriveInstance)
  }
}
class metaClass {
  loginZ(@metaDecorator('名字') name:UserService){

  }
  constructor(@constrotDecorator('userService') private user?:UserService){

  }
  login(){
   let userServiceInstance =  Collection.collection.get('userService')//使用实例
   userServiceInstance.login()
  }
}

let ina = new metaClass()
ina.login()
```

## 4.所有装饰器综合实战

执行顺序:属性装饰器->第一个方法参数装饰器->第一个方法参数器i->第二个方法参数装饰器->第二个方法参数器->构造函数装饰器->类装饰器

我们从源码也可以看到效果，第一个方法有两个装饰器，从后往前执行装饰器 所以还是参数装饰器先执行

![image-20211222151058515](https://s2.loli.net/2021/12/22/5m1WNySlFeJIkBr.png)

## 5.元数据

元数据就是附加在类或者类方法或者类属性或者类参数上的k-v键值对  已达到完成某种业务功能的目的 比如请求对应的path走到对应controller的方法





定义的重载函数用法

![image-20211222160854524](https://s2.loli.net/2021/12/22/Tyox3AXDPhRdwYZ.png)

### 1.对象上定义元数据

```ts
import 'reflect-metadata'


let obj = {
  user:'bang'
}
//!在对象上定义元数据
Reflect.defineMetadata('objectKey',"key-val",obj)
// resd1 true
// resd2 false
// res key-val
console.log('resd1',Reflect.hasMetadata('objectKey',obj));
console.log('resd2',Reflect.hasMetadata('objectKe12y',obj));

const res = Reflect.getMetadata('objectKey',obj)
console.log('res',res);
```

### 2.直接在类或者方法上定义元数据

![image-20211222161455879](https://s2.loli.net/2021/12/22/ZzlLwKTmvPQ38GD.png)

### 3.自有的元数据 不可以从父类来拿

**hasOwnMetaData**  这个只有自己类的属性上的元数据才能true

**hasMetaData** 这个如果是父类的属性通过原型链继承下来 也还能找到父类原型链的对应属性的元数据

eat是父类chinesePeople的方法 我们定义啦importInfo这个元数据

![](https://s2.loli.net/2021/12/22/XwphuvNrb3ePy1A.png)

### 4.获取某对象所有元数据 以及内置的三个元数据讲解

![image-20211222162548585](https://s2.loli.net/2021/12/22/nduPL6VRBA1zGUY.png)

![image-20211222162526139](https://s2.loli.net/2021/12/22/o8QMi3Ay4qFUduz.png)

最后打印出来五个元数据，前三个是内置的元数据 分别是该函数返回值类型 函数参数类型 和该方法本身的类别

属性上只有一个内置元数据 ’design:type‘ 方法有三个

![image-20211222162611499](https://s2.loli.net/2021/12/22/tIDuQ45xdyM2JZs.png)

讲一下这三个内置元数据

![image-20211222164506216](https://s2.loli.net/2021/12/22/7WJ8EYaDHyzAslg.png)







## 6.依赖注入-创建和使用分离

```ts
function  Inject(key1:string) {
  return (targetClassPrototype:any,key:string)=> {
    let propClass = Reflect.getMetadata("design:type",targetClassPrototype,key) //获取内置元数据 比如属性对应的类型
    console.log(propClass,propClass);
      let instance = new propClass()
      collection.set(key1,instance)//保存实例对象key值为传进来的string
      
  }
}
class UserController{
  @Inject('userService')
  private userService ?:UserService
  login(){
      let instance:userService = collection.get('userService')
  }
}
```



## 7.nest中复杂的泛型语法

### 1.get

![image-20211223174517358](https://s2.loli.net/2021/12/23/IMkPLvXS1htZ6YR.png)

get函数是IRouterMatcher的类型 主要有很多泛型在<>里面 然后括号里面是参数 第一个参数是path,后面就是执行的函数类型是RequestHandler这个函数类型同样接受几个泛型

```ts
export interface IRouterMatcher<
    T,
    Method extends 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any
> {
    <
        Route extends string,
        P = RouteParameters<Route>,
        ResBody = any,
        ReqBody = any,
        ReqQuery = ParsedQs,
        Locals extends Record<string, any> = Record<string, any>
    >(
        // tslint:disable-next-line no-unnecessary-generics (it's used as the default type parameter for P)
        path: Route,
        // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
        ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    <
        Path extends string,
        P = RouteParameters<Path>,
        ResBody = any,
        ReqBody = any,
        ReqQuery = ParsedQs,
        Locals extends Record<string, any> = Record<string, any>
    >(
        // tslint:disable-next-line no-unnecessary-generics (it's used as the default type parameter for P)
        path: Path,
        // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
        ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    <
        P = ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = ParsedQs,
        Locals extends Record<string, any> = Record<string, any>
    >(
        path: PathParams,
        // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
        ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    <
        P = ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = ParsedQs,
        Locals extends Record<string, any> = Record<string, any>
    >(
        path: PathParams,
        // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
        ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
    ): T;
    (path: PathParams, subApplication: Application): T;
}

```



### 2.接口的函数类型重载

上面IRouterMatcher 其实就是接口的函数类型 因为里面的函数都没名字 但是里面有很多函数重载 都是用这个接口的名字

### 3.少参数的函数可以传给多参数的函数类型

```ts
export interface RequestHandler<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
> {
    // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2)
    (
        req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
        res: Response<ResBody, Locals>,
        next: NextFunction,
    ): void;
}
```

这个是RequestHandler的类型 我们发现使用时候中间件(req,res,next)可以使用这个类型 而最终的接口函数比如tsetfunL也能使用(req,res) 为什么呢 next又没打问号 因为少参数的函数可以传给多参数的函数类型

```ts
import express, { Request, RequestHandler,Response } from 'express'
const app = express()
const router = express.Router()

let tsetfunL:RequestHandler=(req:Request,res:Response)=>{
  console.log('enter');
  res.end('asss')
}
app.use(router)
router.get('/info',tsetfunL)
app.listen(8123);
```

### 4.接口当中的this

```ts
export interface Response<
    ResBody = any,
    Locals extends Record<string, any> = Record<string, any>,
    StatusCode extends number = number
> extends http.ServerResponse,
        Express.Response {
    status(code: StatusCode): this;
    send(body:string):this;
    
  }
```

this表示当前接口类型 此处就是Response类型 

![image-20211224092907835](https://s2.loli.net/2021/12/24/cb2vWTYhu8RjaqK.png)

返回this就能级联调用 res.status('xxx').send('xxx')

### 5.自动推导泛型

```ts
 interface IRouterMatcher2<
    
    Method extends 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any
> {
    <
        Route extends string,
        P = RouteParameters<Route>,
        ResBody = any,
        ReqBody = any,
        
    >(
        // tslint:disable-next-line no-unnecessary-generics (it's used as the default type parameter for P)
        path: Route,
        // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
        
    ): void;
}
let get:IRouterMatcher2 = (path)=>{

}
get('food/:id/:prioce')
```

当都没传泛型的时候 Route，p,ResBody,ReqBody只能通过推导或者默认值来确定  P,ResBody,ReqBody都有默认值 Route没有 Route是根据Path传进来的类型推导 比如这时候你传'food/:id/:prioce'那么Route就是推导为'food/:id/:prioce' 而不是string 那么'food/:id/:prioce'这个又被传入RouteParameters<Route>，RouteParameters就能解析'food/:id/:prioce'拿到这两个动态参数

如果

```ts
get<string>('food/:id/:prioce')
```

那么Route就不会推导，而是直接为string，那么RouteParameters<Route>中就没有具体的路径从而解析不出来动态参数

### 6.去尾 巧用infer

```ts
type RemoveTail<S extends string, Tail extends string> = S extends `${infer P}${Tail}` ? P : S;


type RemoveTest = RemoveTail<'abc/:id/:name',':name'> //RemoveTest='abc/:id/

//p就是除了尾部的name的前面的字符串 因为具体的	·字符串也能是类型 tail就是你传进去想去尾的部分

```

```ts
type GetRouteParameter<S extends string> = RemoveTail<
    RemoveTail<RemoveTail<S, `/${string}`>, `-${string}`>,
    `.${string}`
>;


//`-${string}` 表示’-‘后面的所有字符串 不是指定的字符串
//`/${string}` 表示’/‘后面的所有字符串
```

这个类似**函数**了 就是当type有泛型的时候就很像一个函数执行一段逻辑然后返回一个新的类型

### 7.递归解析params

```ts
export type RouteParameters<Route extends string> = string extends Route
    ? ParamsDictionary
    : Route extends `${string}(${string}`
        ? ParamsDictionary //TODO: handling for regex parameters
        : Route extends `${string}:${infer Rest}`
            ? (
            GetRouteParameter<Rest> extends never
                ? ParamsDictionary
                : GetRouteParameter<Rest> extends `${infer ParamName}?`
                    ? { [P in ParamName]?: string }
                    : { [P in GetRouteParameter<Rest>]: string }
            ) &
            (Rest extends `${GetRouteParameter<Rest>}${infer Next}`
                ? RouteParameters<Next> : unknown)
            : {};
```

