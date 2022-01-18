

### 1.原型对象

修改原型对象？ 其实没修改 哈哈哈

![image-20211011153957524](https://i.loli.net/2021/10/11/5OJd927oz1LNZU4.png)

![image-20211011154013857](https://i.loli.net/2021/10/11/muUwADrqNcKfM9B.png)

直接换原型 之前的对象实例已经指向啦之前的对象 不会变 新创建的实例会变

![image-20211011154226181](https://i.loli.net/2021/10/11/K92yJBvt7aA6Ybo.png)

![image-20211011154311708](https://i.loli.net/2021/10/11/ZUBSFVQ18Ram6lE.png)

### 2.ts的环境搭建

#### 1.tsc --init 初始化tsconfig.json文件 配置都有英文说明

 ![image-20211011155610879](https://i.loli.net/2021/10/11/L4U9mCfD1OWei6q.png)

#### 2.tsc 命令

在目录下根据rootdir去编译下面所有的ts文件转成js文件

![image-20211011155725216](https://i.loli.net/2021/10/11/hg5QHIny7C2wjcE.png)

在tsconfig.json里面去配置outdir和rootdir

#### 3.ts-node 

让node直接运行ts代码 无需先用tsc将ts转成js代码

#### 4.nodemon 自动检查js代码发生改变去自动运行， 

nodemon 和ts-node一起用实现ts修改也能自动监测自动运行

nodemon --watch src/ 表示检查src目录下的文件

-e ts 表示Nodemon准备监听ts后缀的文件

--exec ts-node ./src/project/index.ts 表示检查src下任何文件变化都要重新执行index.ts文件

在package.json里面配置 npm run dev即可

```json
"dev": "nodemon --watch src/ -e ts --exec ts-node ./src/index.ts"
```

#### 5.parcel打包支持浏览器运行ts文件

本地安装parcel和ts

![image-20211011164635412](https://i.loli.net/2021/10/11/CI16NowluR2JPxQ.png)

```js
<script src="./src/index.ts"></script> //HTM就能直接使用ts文件
```

#### 6.类型报错原因和解决方法分析

##### 1.无法取值对象属性

```typescript
type MessageType = 'image' |  'audio'  | string  //!type就是定义一种类型 类似定义出一个boolean只能是true  false   定义一个三选一的数据类型 如果前两个都不是的话 还可以是string类型 就是消息可以是图片和音频和其他类型就这样
type Message = {
  id:number;
  type:MessageType;
  sendmessage:string
}//!定义一个对象数据类型

let obj:Message = {
  id:1,
  type:'df',
  sendmessage:'xxx'
}
let obj2:Message = {
  id:2,
  type:'image',
  sendmessage:'xxx2'
}

let messages:Array<Message> = [
  obj,obj2
] 

function getMessage(val:string|number):Message|undefined|Message[]{
  if(typeof val === 'number'){
    return messages.find(msg=>msg.id===val)
  }else{
    return messages.filter(msg=>msg.type===val)
  }
}
//!重要
//let obj1 = getMessage(1)  //无法推导出真正的类型Message 而是三个类型都有 所有不能直接读取sendmessage属性 //!因为编译环境下还没运行ts是不可能知道的 只有运行时候才知道
//!必须进行类型转换 转成Message类型 但是不能乱转 只能转成Message|undefined|Message[] 这三个中的一个 不能转string
let obj1 = (<Message>getMessage(1))
console.log(obj1.sendmessage)
console.log(getMessage('image'))
```

##### 2.可能是Undfided

直接加！ 表示肯定有值 比如是Message |  undifined 的类型 加！表示肯定不是undifined啦

##### 3.重载 可以找到具体函数的类型 而不是枚举 

```ts
type MessageType = 'image' |  'audio'  | string  //!type就是定义一种类型 类似定义出一个boolean只能是true  false   定义一个三选一的数据类型 如果前两个都不是的话 还可以是string类型 就是消息可以是图片和音频和其他类型就这样
type Message = {
  id:number;
  type:MessageType;
  sendmessage:string
}//!定义一个对象数据类型

let obj:Message = {
  id:1,
  type:'df',
  sendmessage:'xxx'
}
let obj2:Message = {
  id:2,
  type:'image',
  sendmessage:'xxx2'
}

let messages:Array<Message> = [
  obj,obj2
] 
function getMessage(val:number):Message
function getMessage(val:MessageType):Message[]
function getMessage(val:MessageType | number):Message|undefined|Message[]{
  if(typeof val === 'number'){
    return messages.find(msg=>msg.id===val)
  }else{
    return messages.filter(msg=>msg.type===val)
  }
}
//!重要
//let obj1 = getMessage(1)  //无法推导出真正的类型Message 而是三个类型都有 所有不能直接读取sendmessage属性 //!因为编译环境下还没运行ts是不可能知道的 只有运行时候才知道
//!必须进行类型转换 转成Message类型 但是不能乱转 只能转成Message|undefined|Message[] 这三个中的一个 不能转string
let obj1 = (<Message>getMessage(1))
console.log(obj1.sendmessage)
console.log(getMessage('image'))


//函数重载就直接能找到
console.log(getMessage(1).sendmessage)
```

##### 4.unknow 和 any区别

**unknow是所有的父类但是不是子类**

**any既是所有的父类也是子类**

```ts
function getMessage(val:MessageType | number,count:unknown=1):Message|undefined|Message[]{
  if(typeof val === 'number'){
    return messages.find(msg=>msg.id===val)
  }else{
    return messages.filter(msg=>msg.type===val).slice(count) //报错 不能把unkonw赋值给number| undifined
  }
}
```

因unkonw可以是父类 所有函数参数中传什么给他都行 但是传给slice时候必须要number | undifined 这时候就不满足 因为他不是子类 不满足这个交叉或关系 any就行

```ts
let z:unknown =3
let k:number =z //也会报错 unkonw不是Number类型
```

```ts
let value: unknown;
//unkown是所有类型的父集 所以可以赋值任何类型 
value = true;             // OK
value = 1;                // OK
value = "Hello World";    // OK
value = Symbol("type");   // OK
value = {}                // OK
value = []                // OK
let value: unknown;
//unkonwn不是任何的子集 所以他上面没有这些属性 
value.foo.bar;  // ERROR
value();        // ERROR
new value();    // ERROR
value[0][1];    // ERROR
```

我们看到,这就是 `unknown` 与 `any` 的不同之处,虽然它们都可以是任何类型,但是当 `unknown` 类型被确定是某个类型之前,它不能被进行任何操作比如实例化、getter、函数执行等等。 	起到一个保护作用

### 7.继承

**总结:子类会继承父类public的属性和方法 可以重写 如果没重写就用父类的**

**因为就和原生继承一样 子类会沿着原型链往上找属性 当本身没有这个属性时候就去父类找 所以就有子类可以继承父类的public的属性和方法**，

**重写就相当于在本身实例里面新增一个一样名字的属性，那么找的时候子类就有就不去找父类**

子类重写方法可以通过super.xxx调用父类被重写的方法 super不能访问父类属性 直接this即可 因为有原型链继承

```ts
class Vercel {
  total:number = 0
  buys:number = 3
  constructor(public brand:string,public vercelNo:string,public days:number,public deposit:number){

  }
  public calcRent(){
    console.log('父类租车')
  }
  public payDespoit(){

  }
  public safeShow(){

  }
}


class Car extends Vercel{
  constructor(brand:string,vercelNo:string, days:number,deposit:number,public type:number){ //独有属性type
    super(brand,vercelNo,days,deposit)//表示父类构造函数
  }
  public calcRent():number{
    super.calcRent()
    return this.days * (this.type === 1?100:200)*this.buys
  }//!重写calcRent 每个类计算租车的方法不一样
}


let c1 = new Car('大奔','666',2,1000,1)
console.log('c1.calcRent()',c1.calcRent());
```

### 8.类型断言  是对对象as一下

##### 1.子类和父类可以互相转换 不存在子类比父类小的关系 没有父类包含子类的关系 而是可以互相转换的同等关系

```ts
class Parent {
  eat(){

  }
}
class Son extends Parent {
  study(){

  }
}

let obj3 = new Parent()
let obj4 = obj3 as Son //断言返回一个新的son对象

let o3 = new Son()
let o4 = o3 as Parent //断言成父类也可以
```

父类断言成子类可以调用子类的方法study 否则不能调用study

obj4是有study obj3没有study

### 9.类型转换 尖括号 是对对象尖括号一下

```ts
class Parent {
  eat(){

  }
}
class Son extends Parent {
  study(){

  }
}

let obj3 = new Parent()
let obj4 = <Son>obj3 



```

obj4可以调用study obj不可以

### 10.类型转换和类型断言遵守一下规则

**1.除了继承关系 普通类关系也可以互相断言，只要满足下面条件**

**2.两个类的public属性都是一样的或者一个是一个的子集 这两个类都可以互相转换 如果不是子集就不能相互转换**

**3.如果接口继承类 那么这两个也能相互转换**

**4.如果接口不继承类，如果类的公开属性和接口属性是一样或者一个是一个子集 那么他们也能相互转换**

**5.type和接口一样遵守3，4也可以被类implments**

**6.要不相互直接能转换，要不相互之间都不能转换，不存在一个可以转成一个，反过来不可以的**

只要准售类型转换和断言的规则的也就能实现这种写法，这时候parent就是people类型了而不是Ameicanpeople类型 但是实例还是AmericanPeople实例

举例

```ts
let parent:People = new AmericanPeople()  //可以自定义类型时候写父类 因为parent和AmericanPeople可以转换
```

```ts
let mys = {
  username:'bang'
}
type objType = {username:string,age:1}
let t1 = mys as objtype  //!可以相互断言 因为public的属性是子集！
```



### 11.类型守卫

在语句的块级作用域缩小变量的一种类型推断的行为

为什么**typeof** array都打出object

```
typeof [] // 'object'
```

因为let a = [] 相当于执行 let a = new Array([]) 而new的底层原理是

```js
let obj = new Object()
obj.__proto__ = a
fn.call(obj.[aguments])
```

最底层都是Object 只是改变了原型对象的指向 所以都是打印Object





**object.prototype.toString.call()** 可以判断出基础类型和对象类型 比如array date等 但是他判断不出来你自己定义出来类  只有用instanceof 能够判断自定义函数或者类创建的数据变量类型

```ts
class Parent {
  eat(){

  }
}
let p  = new Parent()
object.prototype.toString.call(p) //[object object]  出不来parent
```

### 12.多态  适用于重写方法

```ts
class Customer {
  checkWeiGui(vercel:Vercel){ //!多态 这个写Vercel可以传入所有子类对象都可以 
    if(vercel instanceof Car){
      vercel.zuiJia(true)
    }else if(vercel instanceof Bus){
      vercel.caozai(true)
    }//!子类独有的方法还是得Instanceof去类型守卫
    console.log(vercel.calcRent())//!重写的方法适合用多态  子类有calcRent方法重写
    
  }

}
let cus = new Customer()
let c1:Car = new Car('大奔','666',2,1000,1)
let b1 = new Bus('66号','666',2,22,12)

cus.checkWeiGui(c1) //传入car 是Vercel子类

console.log('b1.calcRent()',b1.calcRent());
```

### 13.抽象类

#### 抽象类就是不能实例的类得换成抽象类  比如人是没有实例的 因为他不是一个特定的人 只有具体的中国人才可以实例

```ts
abstract class People{
  abstract eat():void //可以有抽象方法 但是必须子类也得实现 抽象函数不可以有具体实现 然后写的是函数签名
  
  step(n:number){
    console.log('n',n);
  }//!也可以有真实的方法
  constructor(public name:string){
    console.log('父类构造')
  }//!抽象类可以有钩爪函数 但是可以有constructor
}


class chinesePeople extends People {
  eat(): void {
    console.log("用叉子吃")
  }
  constructor(name:string,public age:number){
    super(name)
    console.log('子类给猴枣')
  }
}

//let p = new People() //!抽象类不能实例 但是可以有构造函数 子类可以调用父类的钩爪函数 子类来初始化实例

let chi = new chinesePeople('bang',32)

```





### 14.自定义守卫

有两个作用 一个是返回true/false 你什么函数逻辑都可以 只是必须返回true/false 这是限制  第二个就是额外的函数功能 它可以把你参数自定义为一个类型(但必须是你定义参数的类型的子集），方便后续调用直接可以调用对应类型方法

```ts

interface Ref{
  value:any
}
function isRef(r:any):r is Ref {
  return Math.random()>0.5
}
function unRef(r:any){
  if(isRef(r)){
    console.log(r.value) //能自动点出一个value属性
  }else{
    console.log(1)
  }
}

unRef({
  value:3
})
```

isRef这个函数就是自定义守卫 可以由别的逻辑返回true/false 但是同时又增加一个功能就是把r设为Ref类型





### 15.readonly 和const

1.readonly是加在属性 **class/interface/type** )上的 也可以加在参数对象变量的属性上 其他都不行  const是定义变量用的 

```ts
function testRead( readonly num:  number){ //参数如果不是对象就不行

}
function testRead(params:{readonly num:number}) { //!这种可以
  params.num++
}

interface testR{
  readonly name:string
  readonly age:number
}
type testR2 {
  readonly name:string
  readonly age:number
}

class People {
  readonly bus:string='111'
}
//批量
type Foo = {
  bar: number;
  bas: number;
};

type FooReadonly = Readonly<Foo>;
//!需要注意的是，Readonly 只对它当前修饰的属性有效，并不会对嵌套属性产生影响: 可以修改age.test
interface testR3{
  readonly name:string
  readonly age: {
    test:number
  }
}
export {}
```

2.readonly在数组方面必须放在类型前面 和as const 一一对应 const 数组是可以改变其中某个元素的 除非加as const 关键字

```ts


const arr5 = [1,2,'se']
//arr5 = [2,4,'12'] //这样不可以修改
arr5[0]=3 //这样可以修改 

const arr6= [2,3,'asd'] as const
// arr6[0]=1//!这样也不能修改


function showArr(arr:readonly (string|number) []){ //readonly是在类型上的 不是arr参数前名的
  console.log(arr)
}

showArr(arr6) //as const 的类型必须用readonly来接住
```

### 16.可变元组

```ts
let [x,y]:[number,...any] = [1,'adasd',23423] //rest表示可变元组
```

如果加拉as const 则对应类型要是readonly加到类型数组前面

```ts
let [x,y]:readonly [number,...any] = [1,'adasd',23423] as const //rest表示可变元组
```



### 17.函数类型

```ts
type funType = (n:number,str:string)=>any


interface funInterface<T> {
  (n:number,str:string):any
}
let myTest:funInterface = (n:number,str:string){
  
}
type funType2 = <T>(n:T,str:string)=>any //泛型函数类型
interface funInterface2<T> {
  (n:number,str:string):any
}////泛型函数类型第二种写法
```

两种定义函数类型的方法 注意第二种 一般Interface是一个对象比如

```ts
interface text{
  eat:(n:number,str:string)=>any
}
```

这样的话 eat才是个函数类型 而不是funInterface 所以必须这样用

```ts
interface text{
  eat:(n:number,str:string)=>any
}
let myTest:text['eat'] = (n:number,str:string){

}
```

现在我们就想interface的名字就是函数类型 那么就必须

```ts
interface funInterface {
  (n:number,str:string):any
}
```

这就可以理解为funInterface是个函数类型 他的参数是冒号前面的，返回值是冒号后面的

参数默认取值可以重载  参数类型必须一样 只是可以取不同的参数值当作类型 然后函数执行的时候可以根据判断(但是感觉没啥用)

```ts
interface funInterface {  //interface改成type也行
  (n:1,str:string):any,
  (n:2,str:string):any,
  
}
 type funInterface ={
  (str:string,n:1):any,
  (str:string,n:2):any,
  
}

interface text{
  eat:(n:number,str:string)=>any
}
let t:funInterface = function(n:number,str:string){
  if(n===1){
    
  }else if(n===2){
    
  }
}
```



### 18.构造函数类型

没有具体的函数名 但是有new 这个new不是创建对象 而是表示后面的函数类型是个构造函数类型

```ts
let constructor:new (n:number)=>any
```

这是普通函数类型 我们还可以用接口函数的定义类型来定义构造函数类型 就是加个new而已

```ts
type constructorType2={   //或者Interface
  new(n:number):any
}
```

类的名字就是该类的构造函数的对象

```ts
class Bank{
  constructor(public n:number){
    console.log('1',1);
  }
}

type constructorType=new (...arg:any)=>any

let constr1:constructorType = Bank //constr1=Bank都是这个类的构造函数 类型是一个构造函数类型constructorType


type constructorType=new (s:string)=>any

let constr1:constructorType = Bank //报错 string类型构造函数不能给number类型的构造函数 
```

作为函数参数也有这两种写法 归根接底就是因为函数类型有两种写法

```ts
class Bank{
  constructor(public n:number){
    console.log('1',1);
  }
}

type constructorType=new (n:number)=>any
type constructorType2={
  new(n:number):any
}

let constr1:constructorType2 = Bank
new constr1(2)



let createFactory = (constructor:new (n:number)=>any){
  console.log(constructor.name)//表示钩爪函数的名字 所有构造函数都有这个属性

  new constructor(1)

}


let createFactory2 = (constructor:{new (n:number):any}){
    new constructor(1)

}

createFactory(Bank)
createFactory2(Bank)
```

为了拿到返回值的对象变量可以点出n而不是any类型 改造成泛型工厂函数 因为可能是别的类做T而不是单单的Bank

我们定义的构造函数类型也可以加上泛型 然后具体定义对应类的构造函数

```ts
class Bank{
  static str:string='22'
  constructor(public n:number){
    console.log('1',1);
  }
}

type constructorType<T>=new (n:number)=>T
type constructorType2<T>={
  new(n:number):T
}

let constr1:constructorType2<Bank> = Bank
new constr1(2)


function createFactory<T>(constructor:new (n:number)=>T){
  console.log(constructor.name)//表示钩爪函数的名字 所有构造函数都有这个属性
  return new constructor(1)
}


function createFactory2<T>(constructor:{new (n:number):T}){
  return new constructor(1)
  
}

createFactory<Bank>(Bank).n
createFactory2(Bank)
```

### 19.交叉 联合类型

**交叉类型**就是两个类型所有的属性的类型  **必须包含所有的属性 ** 相当于加起来  相当于类型1并且类型2则全部都要

```ts
type obj1 = {username:string,age:number}
type obj2 = {phone:string,age:number}
type obj3 = obj1 & obj2  //!obj3应该是 {username:string,age:number，phone:string}
let jiaocha:obj1&obj2 = { 
  username:'1',
  age:2,
  phone:'4'
}//!必须有三个 少一个都不是
```

**联合类型** 满足联合的其中一个就行或者其中的一个类型加上另外的一个类型种的部分属性  相当于类型1或者类型2则其中一个

```ts
type obj1 = {username:string,age:number}
type obj2 = {phone:string,age:number}
type obj3 = obj1 & obj2  //!obj3应该是 {username:string,age:number，phone:string}
let jiaocha:obj1&obj2 = { 
  username:'1',
  age:2,
  phone:'4'
}//!必须有三个 少一个都不是
jiaocha.age
jiaocha.username
jiaocha.phone //交叉类型全部能点出三个属性
let union:obj1|obj2={
  username:"1",
  age:2
}

let union3:obj1|obj2={
  username:"1",
  age:2,
  phone:'213'
}//这样也可以 
union.age //联合类型只能点出两个类型共有的属性
```

联合类型重载

```ts

type Button= {
  size:number,
  link:string
}
type Link={
  href:string,
  title:string
}
type Href = {
  location:string,
  type:string
}

function cross<T extends object,U extends object>(obj1:T,obj2:U):T&U
function cross<T extends object,U extends object,X extends object>(obj1:T,obj2:U,obj3:X):T&U&X
function cross<T extends object,U extends object,X extends object>(obj1:T,obj2:U,obj3?:X){
  let obj = {} as object
  let combine=obj as T & U
  
  Object.keys(obj1).forEach(key=>{
    combine[key] = obj1[key]
  })
  Object.keys(obj2).forEach(key=>{
    combine[key] = obj2[key]
  })
  if(obj3){
    let combine2 = combine as T & U & X
    Object.keys(obj3).forEach((key:string)=>{
      combine2[key] = obj3[key]
    })
    return combine2
  }
  return combine
}


```





### 20.infer

infer是出现在extends的条件语句种以占位符出现的用来修饰某一**数据类型**的关键字，没修饰的数据类型等到使用时候才能被推断出来

#### 1.infer出现的位置

​	1.出现在extends条件语句后的**函数类型**的参数类型上    extends后面一定是函数类型  目的:拿到函数参数类型

```ts
type inferResult<T> = T extends (param:infer P)=>any?P:number

type functionType = (str:string)=>any

type result = inferResult<functionType>
```

​	**P一定是？后第一个 不能和number换位置**	

​	2.出现在extends条件语句后的**函数类型**的返回值类型上	extends后面一定是个函数类型  目的：拿到函数的返回类型

```ts
type inferResult<T> = T extends (param:string)=> infer P?P:string

type functionType = (str:string)=>number

type result = inferResult<functionType>
```

**P一定是？后第一个 不能和string换位置**	

可以有多个infer但是W和P必须在问号后第一个位置

```ts

type inferResult<T> = T extends (param:string,m:infer W)=> infer P?P&W:string

type functionType = (str:string,m:number)=>number

type result = inferResult<functionType>
```

3.出现在类型的泛型具体化类型上

```ts

 type A<T> = T extends Set<infer E>?E:number
let test = "asada"
 type res = A<Set<typeof test> >
```

和函数差不多 只是这时候获取的Set接口的传入的泛型的类型

#### 2.infer和泛型的区别 

1.泛型可出现在类/接口上 但是Infer只能出现在extends关键字后

2.infer后的数据类型不用提前定义就能使用 他保护后面的类型使得调用的时候才知道这个类型是啥 **infer就是占位符型的关键字**

#### 3.真实应用场景

##### unref源码

![image-20211201100800159](https://i.loli.net/2021/12/01/F4jZELYvl1iWdDm.png)

```TS
T extends Ref<infer V>?V:T
```

并不是约束T只能传Ref的实例 而是表示返回值类型要看T是不是Ref实例来返回不同的类型 调用unref时候的T可以传任何类型

### 21.extract -提炼

```ts
type Extract<T,U> = T extends U?T:never
```



#### 1.父子类

T extends U 不仅仅是继承 T的属性是U的属性的子集即可 不能U的属性是T的属性的子集 这里是类型转换的要求不一样	

```ts
type a = Extract<ChinesePeople,People>  //ChinesePeople
type a = Extract<People,ChinesePeople>  //never  除非people和chinesePeople属性一样 那么证明chinesePeople没新增子集的属性 才会返回People
```

#### 2.联合类型

```ts
type test = Extract<string,string | number > //返回string类型
```

因为是子集

```ts
type tes2t = Extract<string|number,string > //也是string类型
```

会先拿string和string判断发现是true 那么返回string 在拿number去比较 false 最后两个结果string|never联合起来就是string

```ts
type tes2t = Extract<string|number,string|number|symbol  > //string|number
type tes2t = Extract<string|number|symbol,string|number  > //string|number
```

会拿string去和string|number比较 在拿number和string|number比较再拿symbol和string|number比较 最后string|number|never即string|number

**规则就是** 会先拿string和string判断发现是true 那么返回string 在拿number去比较 false 最后两个结果string|never联合起来就是string

#### 3.函数

```ts

type fun1 = (one:number)=>string
type fun2 = (one:number,two:string)=>string

type test2323 = Extract<fun1,fun2>   //fun1
type test23232 = Extract<fun2,fun1>   //never
```

fun1参数是fun2参数的子集就符合extends

```ts
type fun1 = (one:number)=>string
type fun2 = (one:number)=>string|number

type test2323 = Extract<fun1,fun2>   //fun1
type test23232 = Extract<fun2,fun1>   //never
```

fun1的返回值是fun2的返回值的子集就符合extends

```ts
type fun1 = (one:number)=>string
type fun2 = (one:number,two:string)=>string|number

type test2323 = Extract<fun1,fun2>   //fun1
type test23232 = Extract<fun2,fun1>   //never
```

同时是子集也可以

#### 4.使用场景

可以简化泛型约束

```ts
function cross<T extends object ,U extends object>(obj1:T,obj2:U){

}
cross('sss','vvv') //不是object类型报错
```

写在T extends object 很麻烦

```ts
function cross<T  ,U >(obj1:Extract<T,object>,obj2:Extract<U,object>){

}
cross('sss','vvv') //不是object类型报错
```

把约束写在参数类型上 这样如果不是Object类型就是Never就会报错

```ts
//最终版 把Extract单独提取出来省的写那么多
type crossType<T> = Extract<T,object>
function cross<T  ,U >(obj1:crossType<T>,obj2:crossType<U>){

}
cross('sss','vvv') //不是object类型报错
```

### 21.exclude-排除

```ts
type Extract<T,U> = T extends U?never:T
```

刚好和Extract相反

```ts
type test1 = Exclude<'aa'|'bb'|'cc'|'dd','aa'|'bb'|'cc'>  //‘dd'

```

规则和Extract一样 'aa'去和'aa'|'bb'|'cc' 比较符合则是never 最后'dd'不符合'aa'|'bb'|'cc' 返回’dd' 最后‘dd’|never就是‘dd'

```ts
type test2 = Exclude<'aa'|'bb'|'cc'|'dd','aa'> //'bb'|'cc'|'dd
```

这样写就是**排除**的效果 比如 aa 去和aa比较返回never bb去和aa比较是宝宝 最后就是'bb'|'cc'|'dd

**可以实现T中有而U中没有的属性**

```ts
type test2 = Exclude<keyof Worker,keyof Student> //返回这两个类worker比student多的属性
```

**这个规则其实就是联合类型结合extends的判断规则 而不是这两个规则**

```ts
string | number | object extends string | number | symbol
```

返回值就是 先string去看看是不是extends string | number | symbol  再看 number extends string | number | symbol 再看 object extends string | number | symbol 最后一个是never其他都是自己 所以 string | number

### 21.record

**keyof any** 就是这三个类型的联合类型string|number|symbol

```ts
type oneAntType = keyof any //!string|number|symbol
```

**number和string 到底是值还是类型**

```ts
type oneType<K> = K extends keyof any ? K:never

type mt = oneType<4>  //返回4 因为4是一种类型且extends number是true
let n = 2
//type mt23= oneType<n>  //!报错 因为这是个对象 而不是个类型
type mt2 = oneType<'abc'>  //返回'abv 因为4是一种类型且extends number是true
let str:string = 'as'
//type mt4 = oneType<str>  //!报错 因为这是个对象 而不是个类型
type mt4 = oneType<typeof str>  //返回string
```

**P in K**

```ts
type MyRecord<K> = {
  [P in 'username'|'age'] :string
} //其实就是下面这个 in就是有循环的意思 后面是联合类型的话就是key就是这几个类型
// type MyRecord<K> = {
//   username: string;
//   age: string;
// }


type MyRecord<K> = {
  [P in string] :string
}
//key只要是string就行
let an:MyRecord = {
  'asdasdas':'sadasd'
}
type MyRecord = {
  [P in number] :string
}
//索引是Number类型其实就是数组
let as:MyRecord = ['sadasd','sadas']
```

**Record和Object区别**

Record可以增加索引 但是object不行

```ts
//!这两个写法都会报错 因为都找不到sa这个属性  object上面什么属性都没有 更别说sa属性啦
let testO = {username:"wangwu"}
testO['sa'] = 'xzx'

let testO:object = {username:"wangwu"}
testO['sa'] = 'xzx'
//!也报错 因为Object 虽然有valueof之类的原始方法 但是没有sa属性
let testO:Object = {username:"wangwu"}
testO['sa'] = 'xzx'
```

只有写Record接口 然后定义索引类型才可以加属性

**Record和Map区别**

map更重一点 因为要new 但是map也可以定义索引类型

```ts
let myMap = new Map<string,string>()  //!第一个是key的类型 第二个是value类型
myMap.set('nang','vabnf')
myMap.set(1,'vabnf') //报错因为key只能是string类型
```

**record和interface的区别**

interface 没有 p in k的语法 就是没有迭代循环的语法 只有可以把key通过冒号指定为一个类型的语法

```ts
interface MyRecord2  {
  [P in 'username' | 'age'] :string  //报错
}

//只能是string,number
interface MyRecord2  {
  [P :string] :string  //报错
}
interface MyRecord2  {
  [P :string | number] :string  //报错
}
let a2:MyRecord2 = {
  'asd':"asd",
  12:'asdas'
}
```

record可以完成interface的作用 也能有 p in k 的语法

```
type MyRecord = {
  [P in 'username' | 'age'] :string
}
let a2:MyRecord = {
  'username':"asd",
  "age":'sad'
}
type MyRecord2 = {
  [P in 'us:string | number] :string
}
let a3:MyRecord2 = {
  ' 'asd':"asd",
  12:'asdas'
}
```



### 22.pick快速抓取属性



把某个接口的你想要的属性单独提取出来

```TS
interface Book {
  ISBN:string,
  name:string,
  price:string,
  count:number
}

type Pick2<T,K extends keyof T>={
  [P in K]:T[P]
}

// Type pickType = {
//   ISBN: string;
//   count: number;
// }
type pickType = Pick2<Book,"ISBN"|"count">  
```

### 23.required

把接口的可选属性变成必选属性

```ts
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

```ts
interface  todo{
  name:string,
  time?:string,
  other?:number
}

// type myTest2 = {
//   name: string;
//   time: string;
//   other: number;
// } 都变成了必选
type myTest2 = Required<todo>
```

### 24.partical

//变成全可选属性

```ts
type Partial<T> = {
    [P in keyof T]?: T[P];
};
//变成全可选属性
type myTest21 = {
    name?: string | undefined;
    time?: string | undefined;
    other?: number | undefined;
}
```

### 25.readonly

变成全只读属性

```ts
// type myTest21 = {
//   readonly name: string;
//   readonly time?: string | undefined;
//   readonly other?: number | undefined;
// }
type myTest21 = Readonly<todo>

```

### 26.omit

反向抓取数据

```ts
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

```ts
interface Book {
  ISBN:string,
  name:string,
  price:string,
  count:number
}
// type typeOmit = {
//   name: string;
//   price: string;
//   count: number;
// }
type typeOmit = Omit<Book,'ISBN'>
```

Exclude 就是排除T中有K的属性 Pick就是把这些属性读取出来 所有就是Pick的反向的作用

### 27.ts报错原则

ts在写代码的时候报错一定是类型检查错误 而不是具体内容不兼容错误

![image-20211217093222427](https://s2.loli.net/2021/12/17/PruQx6SvY8niWVU.png)



比如这里类互相赋值报错 就算你知道targetClass的内容是loggerSonclass的子类可以互相赋值 但是在编译期间ts是不知道的 

ts知道的只是类型 你在把一个new (name)=>LoggerSonClass 赋值给一个any类型的对象 肯定报错 我们得把any改成new (...args:any)=>any这通用钩爪函数类型才能类型互相兼容赋值

## 28.函数接口类型重载

```ts
//!第一种定义函数的类型 这里是重载函数的类型
declare interface funcOverload {
  (name:number,age:number):void;
  (name:string,age:number):void

}
//!第二种定义函数的类型 普通的函数类型
type fybc = (name:string,age:number)=>void
//!函数内容 因为是重载函数所以所有的重载前面都得写上
function funcOverload(name:number,age:number):void
function funcOverload(name:string,age:number):void
function funcOverload(name:string | number,age:number){
  if(typeof name === 'string'){
    console.log('string');
  }
}

funcOverload('bang',18)
```

接口形式的函数类型**重载**一般是在d.ts中起到一个描述类型的作用 具体的定义和实现必须要写多个函数

