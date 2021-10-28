## 1.原型对象

修改原型对象？ 其实没修改 哈哈哈

![image-20211011153957524](https://i.loli.net/2021/10/11/5OJd927oz1LNZU4.png)

![image-20211011154013857](https://i.loli.net/2021/10/11/muUwADrqNcKfM9B.png)

直接换原型 之前的对象实例已经指向啦之前的对象 不会变 新创建的实例会变

![image-20211011154226181](https://i.loli.net/2021/10/11/K92yJBvt7aA6Ybo.png)

![image-20211011154311708](https://i.loli.net/2021/10/11/ZUBSFVQ18Ram6lE.png)

## 2.ts的环境搭建

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

#### 7.继承

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

#### 8.类型断言  是对对象as一下

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

#### 9.类型转换 尖括号 是对对象尖括号一下

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

#### 10.类型转换和类型断言遵守一下规则

**1.除了继承关系 普通类关系也可以互相断言，只要满足下面条件**

**2.两个类的public属性都是一样的或者一个是一个的子集 这两个类都可以互相转换 如果不是子集就不能相互转换**

**3.如果接口继承类 那么这两个也能相互转换**

**4.如果接口不继承类，如果类的公开属性和接口属性是一样或者一个是一个子集 那么他们也能相互转换**

**5.type和接口一样遵守3，4也可以被类implments**

**6.要不相互直接能转换，要不相互之间都不能转换，不存在一个可以转成一个，反过来不可以的**

只要准售类型转换和断言的规则的也就能实现这种写法，这时候parent就是people类型了而不是Ameicanpeople类型 但是实例还是AmericanPeople实例

```ts
let parent:People = new AmericanPeople()  //可以自定义类型时候写父类 因为parent和AmericanPeople可以转换
```



#### 11.类型守卫

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

#### 12.多态  适用于重写方法

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

#### 13.抽象类

抽象类就是不能实例的类得换成抽象类  比如人是没有实例的 因为他不是一个特定的人 只有具体的中国人才可以实例

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





#### 14.自定义守卫

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





#### 15.readonly 和const

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

#### 16.可变元组

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


interface funInterface {
  (n:number,str:string):any
}
let myTest:funInterface = (n:number,str:string){
  
}
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
interface funInterface {
  (n:1,str:string):any,
  (n:2,str:string):any,
  
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



