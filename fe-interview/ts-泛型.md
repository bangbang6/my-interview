### 1.定义

泛型是一种参数化的数据类型 

特点：1.定义时候不确定类型 但是使用的时候明确类型的一个东西  2. 编译的时候会进行类型检查

interface type class function都可以用泛型

### 2.使用

一般是A-Z的一个字母 或者一个语义化单词

### 3.泛型为什么不可以用object替代

1.object你什么类型的对象都可以加进去 泛型你就只能加入customer类型的对象

2.object你只能针对对象类型(后续会讲解Object和object的区别) 泛型是什么类型都可以比如string

3.泛型可以通过点自动提示属性 object不可以

### 3.泛型为什么不可以用any替代

1.any你什么类型的对象都可以加进去 泛型你就只能加入customer类型的对象

2.泛型可以通过点自动提示属性 any不可以

3.any不可以在编译阶段检测出调用属性等错误，泛型可以 any类型的对象可以调用任何属性即使这个属性不纯在

```js
let a:any
a.a
a.b
都可以
```

### 4.object 和 Object区别(有一个大写)

1.object专指明对象类型 Object可以是number,string类型

2.object没有属性可以点,Object有一些原生属性 比如toString



![image-20211021212958067](https://i.loli.net/2021/10/21/IEcps7Nn2AZ3TLF.png)

### 5.Object是所有类型的父类 那他和unkown有什么区别

区别就是Object是一个确定的类型 但是unkown是不确定类型 所以Object是有方法和属性的

```ts
let a:Object = new Customer() //有种多态的感觉 OBject是所有的父类
```

### 6.泛型约束

泛型约束就是把泛型可以当所有的数据类型缩小

##### extends

```ts
class container<T extends object>{ //!可以是object类型也可以是他子集
  name!:T
  show(){
    return this.name
  }
}


//let c = new container<string>() //!string不属于object子集 所有不可以传string
let c = new container<object>() //!string不属于object子集 所有不可以传string


type objtype = {username:string,age:number}
let obs:objtype = {username:"bang",age:10}
let objs= obs as object //!类型断言 也可以不断延 这里是像告诉大家这个类型是Objecy类型子集
let c2 = new container<objtype>() //!string不属于object子集 所有不可以传string

```

##### keyof

获取所有的属性的联合类型 

如果是类就是获取类的public属性和public方法即实例的属性和方法 不能获取static静态属性 

```ts
class People<T extends object,K extends keyof T>{
  
  constructor(public detailArr:T,public key:K){

  }
  setVal(val:T[K]){
    this.detailArr[this.key] = val
  }
  getVal(){
    return this.detailArr[this.key]
  }
}
let  p = new People<{username:string,age:number},"username">({username:"bang",age:10},"username")
console.log(p.getVal())
p.setVal('liao')
console.log(p.getVal())

export {}
```



如果你没有这种约束那你的p.getVal()是点不出来username的 会报错

我们可以as any 一下 这样因为any类型点所有属性都可以不报错

```ts
class People2<T extends any,K extends any>{
  
  constructor(public detailArr:any,public key:any){

  }
  setVal(val:any){
    this.detailArr[this.key] = val
  }
  getVal(){
    return this.detailArr
  }
}
let  p2 = new People<{username:string,age:number},"username">({username:"bang",age:10},"username")
console.log((p2.getVal()as any).username)
p2.setVal('liao')
console.log(p2.getVal())

export {}
```

### 7.泛型接口

1.接口既可以被继承也可以当作一个类型 但是所有属性都得复现

```ts
//!使用找个List类的必须要用通过add属性是个函数 和n是个数字
interface List {
  add(ele:string):void
  n:number
}
//!add(ele:string):void 就相当于 add:(ele:string)=>void  定义add属性为一个函数 然后这个函数类型是参数string返回值是void  和普通的属性一样 这个属性是函数而已

//!implements 一个接口 我们就必须实现add和添加n属性
class Linklist implements List {
  add(ele: string): void {
    throw new Error("Method not implemented.");
  }
  n!: number;

}

//! 一个接口当作类型 我们就必须实现add和添加n属性
let l:List = {
  n:1,
  add:(ele)=>{
    return ele
  }
} 
```

2.函数参数要想用泛型 必须函数或者类名也用泛型

![image-20211026111708796](https://i.loli.net/2021/10/26/uvx81iwN7SFRldq.png)

函数用泛型

```ts
interface List2<T> {
  
}

class Test {
  rent<T extends object>(arr:List2<T>){

  }
}
```

类用泛型

```ts
interface List2<T> {
  
}

class Test<T extends object> {
  rent(arr:List2<T>){

  }
}
```

不然你的T都不是从哪里传过来 而且会就近原则

ps  string | number类型是可以强制转换成string的 反之同理 相当于父子关系可以互相转换

```ts
let a!:string|number 
a as string

let b!:string
b as string|number 
```



**原理：为什么父类可以转成子类 比如 string | number可以转成string 因为我们后面可能会使用string的方法比如slice 如果不能断言成string的话那么就会编译报错 其实我们知道这里是string类型 所以我们需要断言成string类型 当真实运行时候是number类的话 这里就会报错  也没关系**

