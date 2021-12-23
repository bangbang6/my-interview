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

