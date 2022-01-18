## 元组（Tuple）

元组类型与数组类型非常相似，表示一个已知元素数量和类型的数组，各元素的类型不必相同。但是类型和个数必须一致

```ts
let x: [string, number];
x = ['hello', 10, false] // Error
x = ['hello'] // Error
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
```

元组的定义 一个record而已 定义好对应Index的类型

```ts
interface Tuple extends Array<string | number> {
  0: string;
  1: number;
  length: 2;
}
```

元组直接用数组表示即可

```ts
let testTuple = [7,'seven']
let testTuple:[number,string] = [7,'seven']
```

  



## object的key

```ts
function getValue(obj: object, key: string) {
  return obj[key] // error
}
```

关键是要让编辑器知道key是obj上的属性，想起来keyof

```ts
function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key] // ok
}
```





## 多重泛型约束

果我们的泛型需要被约束，它只被允许实现以下两个接口的类型呢？

```ts
interface FirstInterface {
  doSomething(): number
}

interface SecondInterface {
  doSomethingElse(): string
}
class Demo<T extends FirstInterface, SecondInterface> {
  private genericProperty: T

  useT() {
    this.genericProperty.doSomething()
    this.genericProperty.doSomethingElse() // 类型“T”上不存在属性“doSomethingElse”
  }
}
class Demo<T extends FirstInterface, T extends SecondInterface> { // 标识符“T”重复
  ...
}
```



应该写成

```ts
interface ChildInterface extends FirstInterface, SecondInterface {

}
class Demo<T extends ChildInterface> {
  private genericProperty: T

  useT() {
    this.genericProperty.doSomething()
    this.genericProperty.doSomethingElse()
  }
}
```

或者交叉泛型

```ts
interface FirstInterface {
  doSomething(): number
}

interface SecondInterface {
  doSomethingElse(): string
}

class Demo<T extends FirstInterface & SecondInterface> {
  private genericProperty: T

  useT() {
    this.genericProperty.doSomething() // ok
    this.genericProperty.doSomethingElse() // ok
  }
}

```

## 构造函数类型

```ts
function factory<T>(type: T): T {
  return new type() // This expression is not constructable.  因为type不是构造函数类型
}

```

函数前加new 才是构造函数类型

```ts
function factory<T>(type: {new(): T}): T {
  return new type() // ok
}
```

## 双重断言

```ts
interface Person {
	name: string;
	age: number;
}
  
const person = 'xiaomuzhu' as Person; // Error 因为string和people不符合包含的断言条件
```

断言成any

```td
interface Person {
	name: string;
	age: number;
}

const person = 'xiaomuzhu' as any as Person; // ok
```

## in

`x in y` 表示 x 属性在 y 中存在

```ts
class Person {
	name = 'xiaomuzhu';
	age = 20;
}

class Animal {
	name = 'petty';
	color = 'pink';
}

function getSometing(arg: Person | Animal) {
	if ('age' in arg) {
		console.log(arg.color); // Error
		console.log(arg.age); // ok
	}
	if ('color' in arg) {
		console.log(arg.age); // Error
		console.log(arg.color); // ok
	}
}
```

## 字面量类型守卫

```ts
type Foo = {
  kind: 'foo'; // 字面量类型
  foo: number;
};

type Bar = {
  kind: 'bar'; // 字面量类型
  bar: number;
};

function doStuff(arg: Foo | Bar) {
  if (arg.kind === 'foo') {
    console.log(arg.foo); // ok
    console.log(arg.bar); // Error
  } else {
    console.log(arg.foo); // Error
    console.log(arg.bar); // ok
  }
}
```

## 类型系统

#### 1.对于成员的对象/类/接口都是多的可以赋值给少的

```ts
class Person {
    constructor(public weight: number, public name: string, public born: string) {

    }
}

interface Dog {
    name: string
    weight: number
}

let x: Dog

x = new Person(120, 'cxk', '1996-12-12') // OK
let aa:Dog = {
  name:'as',
  weight:456
}
let y:Person = aa //!报错
```

#### 2.函数兼容性不是看参数名字而是而类型 

##### 1.参数然后是少的可以给多的，和对象形式的相反



```ts
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error 不能将类型“(b: number, s: string) => number”分配给类型“(a: number) => number”。
```

##### 2.返回值是number可以给void 但是父的不能给子的 

函数的替代品个人觉得可以用协变和逆变来理解，函数的参数是逆变的，返回值是协变的。

```ts

function doSomething():number {
  return 1
}
function callMeMaybe(callback: () =>void) {
  callback();
}
callMeMaybe(doSomething) //ok
```

```ts
function doSomething():string|number {
  return 1
}
function callMeMaybe(callback: () =>string) {
  callback();
}
callMeMaybe(doSomething) //error
```

```ts
function handler(arg: string) {
  // ....
}

function doSomething(callback: (arg1: string, arg2: number) => void) {
  callback('hello', 42);
}

// 很多人的预期是这里会报错,因为doSomething要求的回调函数是有两个参数的,但是handler只有一个参数
doSomething(handler); //函数参数少的可以给多的
```



#### 3.类的讲究

1.类的话仅仅只有实例成员和方法会相比较，构造函数和静态成员不会被检查:

```ts
class Animal {
  feet: number;
  constructor(name: string, numFeet: number) {}
}

class Size {
  feet: number;
  constructor(meters: number) {}
}

let a: Animal;
let s: Size;

a = s; // OK
s = a; // OK
```

2.私有的和受保护的成员必须来自于相同的类: 只能extends 一样的名字都不行

```ts
class Animal {
  protected feet: number;
}
class Cat extends Animal {}

let animal: Animal;
let cat: Cat;

animal = cat; // ok
cat = animal; // ok

class Size {
  protected feet: number;
}

let size: Size;

animal = size; // ERROR
size = animal; // ERROR
```

#### 4.c与ts在类型上最大的区别

C# 采用的是 Nominal Type System（标明类型系统）就是直接**表明他是什么类型**

TypeScript 考虑到 JavaScript 本身的灵活特性，采用的是结构类型系统 就是**属性兼容**即可

#### 5.如何防止两种类型在结构上兼容？

添加一个 「brand」 成员:

```ts
interface ScreenCoordinate {
  _screenCoordBrand: any;//「brand」
  x: number;
  y: number;
}
interface PrintCoordinate {
  _printCoordBrand: any; //「brand」
  x: number;
  y: number;
}
function sendToPrinter(pt: PrintCoordinate) {
  // ...
}
function getCursorPos(): ScreenCoordinate {
  return { x: 0, y: 0 };
}
// 报错
sendToPrinter(getCursorPos());
```



#### ps:这个和类型转换和类型断言都不一样 这两个是只要是子集就能相互转换

```ts
let obj3 = new Parent()
let obj4 = <Son>obj3 //!可以相互转换

let t1 = mys as objtype  //!可以相互断言 因为public的属性是子集！
```





## type和Interface的区别

1.interface 只能用于定义对象类型，而 type 的声明方式除了对象之外还可以定义交叉、联合、原始类型等，类型声明的方式适用范围显然更加广泛。



2.interface 方式可以实现接口的 extends 和 implements， interface 可以实现接口合并声明 ，type可以被继承但是不可以继承别人

```ts

//!声明合并
interface a{
  name:string
}
interface a{
  num:number
}
let mm:a = {
  name:'xx',
  num:1

}
```

```ts
type a22 implements a{

}//!报错 改成class a22即可
```

type可以被implements 

```ts

type guaji = {
  name:string
}
class aa231 implements guaji{
  name!:string
}
```

## 装饰器

#### 开启装饰器

javaScript 中我们需要 Babel 插件 `babel-plugin-transform-decorators-legacy` 来支持 decorator,

而在 Typescript 中我们需要在 `tsconfig.json` 里面开启支持选项 `experimentalDecorators`.

```
// tsconfig.json
"experimentalDecorators": true
```

## React和ts结合

#### 安装

```shell
create-react-app my-app --scripts-version=react-scripts-ts
```

[react-scripts-ts](https://www.npmjs.com/package/react-scripts-ts)是一系列适配器，它利用标准的create-react-app工程管道并把TypeScript混入进来。  **已经废弃用下面这种**

或者

```shell
npx create-react-app my-app --template typescript

```

#### 使用

1.合成事件的具体事件类型可以先写一个看报错信息得到 比如你不知道onchange的e的类型 两种方法

​		（1）先写成string 下面这里九报错 你就知道是ChangeEvent类型

​		（2）点进去看d.ts文件

![image-20220110151700137](https://s2.loli.net/2022/01/10/HrFAp3kx4i51BKW.png)

![image-20220110151502793](https://s2.loli.net/2022/01/10/HPd5t1E3SnesbMu.png)

其实其他的比如dom元素类型都可以采用这两个方法知道具体什么类型

比如你的ref放到input上面 private inputRef = React.createRef() 初始化时候没给泛型 下面就会报错不能unknown给htmlinputelement

![image-20220110151934424](https://s2.loli.net/2022/01/10/WKBbZwCY36JjdiG.png)

```ts
import  React from "react";
interface Iprops{
  handleSubmit:(value:string)=>void
}
interface Istate{
  itemText:string
}
class Todo extends React.Component<Iprops,Istate>{
  private inputRef = React.createRef<HTMLInputElement>()

  constructor(props:Iprops){
    super(props)
    this.state = {
      itemText:""
    }
  }
  updateValue(e:React.ChangeEvent<HTMLInputElement>){
    this.setState({
      itemText:e.target.value
    })
  }
  handleSubmit(e:React.FormEvent<HTMLFormElement>){
    this.props.handleSubmit(this.state.itemText)
  }
  render() {
      return (
        <form onSubmit={this.handleSubmit.bind(this)} >
          <input ref={this.inputRef} value={this.state.itemText} onChange={this.updateValue.bind(this)}></input>
        </form>
      )
  }
}
export default Todo
```

#### 一个难点

```ts
import * as React from 'react'

interface State {
    itemText: string
}

type Props = {
    handleSubmit: (value: string) => void
    children: React.ReactNode
} & Partial<typeof todoInputDefaultProps>

const todoInputDefaultProps = {
    inputSetting: {
        maxlength: 20,
        placeholder: '请输入todo',
    }
}

export const createPropsGetter = <DP extends object>(defaultProps: DP) => {
    return <P extends Partial<DP>>(props: P) => {
        type PropsExcludingDefaults = Omit<P, keyof DP>
        type RecomposedProps = DP & PropsExcludingDefaults

        return (props as any) as RecomposedProps
    }
}

const getProps = createPropsGetter(todoInputDefaultProps)

export class TodoInput extends React.Component<Props, State> {

    public static defaultProps = todoInputDefaultProps

    constructor(props: Props) {
        super(props)
        this.state = {
            itemText: ''
        }
    }

    public render() {
        const { itemText } = this.state
        const { updateValue, handleSubmit } = this
        const { inputSetting } = getProps(this.props)

        return (
            <form onSubmit={handleSubmit} >
                <input maxLength={inputSetting.maxlength} type='text' value={itemText} onChange={updateValue} />
                <button type='submit' >添加todo</button>
            </form>
        )
    }

    private updateValue(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ itemText: e.target.value })
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!this.state.itemText.trim()) {
            return
        }

        this.props.handleSubmit(this.state.itemText)
        this.setState({itemText: ''})
    }

}

```

```ts
export const createPropsGetter = <DP extends object>(defaultProps: DP) => {
    return <P extends Partial<DP>>(props: P) => {
        type PropsExcludingDefaults = Omit<P, keyof DP>
        type RecomposedProps = DP & PropsExcludingDefaults

        return (props as any) as RecomposedProps
    }
}
```

**解析**

createPropsGetter这个函数 我们要知道P extends Partial<DP> 表示p可以有比DP还多的属性 因为是extends 其实这个就是把

Props中 Partial<typeof todoInputDefaultProps> 这部分是由默认值的 所以可以不是必须外部传入 现在把这部分改成必须的类型

Omit<P, keyof DP> 其中p是所有的props类型  keyof DP是我们已经给了默认值的类型即inputSetting 这样去掉就是handleclick和children

然后并上dp即inputSetting 那么之前的可选的inputSetting就变成必选的啦

举个简单的例子

```ts
interface test{
  name:string,
  age?:number
}
function testFun<T extends test>(params:T) {
  console.log('params.',params.age);
}

testFun({name:"asad",newA:'asd'})
```

虽然是extends的约束 但是可以新增属性 

```ts
interface test{
  name?:string,
  age?:number
}
function testFun<T extends test>(params:T) {
  console.log('params.',params.age);
}

testFun({name:'asdas',age:123,newA:"asda"})
//但是全部删掉只有新增的就会报错
testFun({newA:"asda"})
```

![image-20220110180249068](https://s2.loli.net/2022/01/10/JWhxOycN3pKVYaT.png)

## 类型编程

#### 实现选择可读属性

抓住可读属性的类型有undified

```ts
interface People  {
  id: string
  name: string
  age?: number
  from?: string
}
type NullableKeys<T> = {[K in keyof T]-?:undefined extends T[K]?K:never}[keyof T]
type testU = NullableKeys<People>
```

![image-20220110203245745](https://s2.loli.net/2022/01/10/89vZOfy6EdVI3eQ.png)

如果不加 **-？**把属性变成必选的话，因为有？号所以属性值肯定会有undifined

![image-20220110203718123](https://s2.loli.net/2022/01/10/nYj8RxS9li7Jb5p.png)

这样取出具体的value值的时候除了never会消除，但是会多undifined

![image-20220110203815085](https://s2.loli.net/2022/01/10/lOPowVCyWJfHpAq.png)

#### 实现选择函数类型的属性字段

```ts
type GetFunctionKey<T extends object>= { [K in keyof T]-?:T[K] extends Function?K:never}[keyof T]
type testiii = GetFunctionKey<People>
```

#### 获取构造函数参数

```ts
type GetConstructorType<T extends new (...args:any[])=>any> = T extends new (...args:infer R)=>any?R:never
type sahdoasidh = GetConstructorType<typeof TestClass> //!TestClass不是构造函数类型 typeofTestClass才是构造函数类型
```

#### 元组转联合类型

```ts
type Elementof<T> = T extends Array<infer R>?R:never
type TTuple = [string, number];
type asdas = Elementof<TTuple>//! string | number
```

因为元组的泛型类型就是他们里面所有类型的联合类型

#### 并集转交集

```ts
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type Result = UnionToIntersection<string | number> //!string & number
```

函数参数是逆变 所以是交集 其他都是并集 比如返回值类型

## Compute

`Compute`的作用是将交叉类型合并成一个对象.即

```ts
type Compute<A extends any> =
    A extends Function
    ? A
    : { [K in keyof A]: A[K] }

type R1 = Compute<{x: 'x'} & {y: 'y'}>
```

![image-20220118092455956](https://s2.loli.net/2022/01/18/nyXhBpZEx9GlCbs.png)

## Merge

```ts
type Merage2<T,P> = {
  [key in keyof T | keyof P]:key extends keyof T & keyof P?T[key] | P[key]:key extends keyof T?T[key]:key extends keyof P?P[key]:never
}
type O1 = {
  name: string
  id: number
}

type O2 = {
  id: string
  from: string
}

type Rw2=Merage2<O1,O2>
```

![image-20220118093723093](https://s2.loli.net/2022/01/18/8ihQC3axqA5sgzL.png)

```ts
type Merge<O1 extends object, O2 extends object> =
    Compute<O1 & Omit<O2, keyof O1>>
```

## Intersection

取T和P的交集

```ts
type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };

// Expect: { age: number; }
type DuplicatedProps = Intersection<Props, DefaultProps>;
```

```ts
type Intersection<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>;

```

## Mutable

将 `T` 的所有属性的 `readonly` 移除

```
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

## Overwrite

`Overwrite<T, U>`顾名思义,是用`U`的属性覆盖`T`的相同属性.

```ts
type Props = { name: string; age: number; visible: boolean };
type NewProps = { age: string; other: string };

// Expect: { name: string; age: string; visible: boolean; }
type ReplacedProps = Overwrite<Props, NewProps>
type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T> //U中比T多的 以及他们的交集
> = Pick<I, keyof I>
```

## 巧用Omit

有时候我们需要复用一个类型，但是又不需要此类型内的全部属性，因此需要剔除某些属性，这个时候 `Omit` 就派上用场了。

```
interface User {
    username: string
    id: number
    token: string
    avatar: string
    role: string
}
type UserWithoutToken = Omit<User, 'token'>
```

这个方法在 React 中经常用到，当父组件通过 props 向下传递数据的时候，通常需要复用父组件的 props 类型，但是又需要剔除一些无用的类型。

## 运用Record

`Record` 是 TypeScript 的一个高级类型，但是相关的文档并不多，所以经常被人忽略，但是是一个非常强大的高级类型。

Record 允许从 Union 类型中创建新类型，Union 类型中的值用作新类型的属性。

举个简单的例子，比如我们要实现一个简单的汽车品牌年龄表，一下写法貌似没有问题。

```ts
type Car = 'Audi' | 'BMW' | 'MercedesBenz'

const cars = {
    Audi: { age: 119 },
    BMW: { age: 113 },
    MercedesBenz: { age: 133 },
}
```

虽然这个写法没问题，但是有没有考虑过类型安全的问题？

比如：

- 我们忘记写了一个汽车品牌，他会报错吗？
- 我们拼写属性名错误了，它会报错吗？
- 我们添加了一个非上述三个品牌的品牌进去，他会报错吗？
- 我们更改了其中一个品牌的名字，他会有报错提醒吗？

上述这种写法统统不会，这就需要 Record 的帮助。

```ts
type Car = 'Audi' | 'BMW' | 'MercedesBenz' 
type CarList = Record<Car, {age: number}>//Car作为 p in 的后面的内容 {age: number}作为冒号后面的内容

const cars: CarList = {
    Audi: { age: 119 },
    BMW: { age: 113 },
    MercedesBenz: { age: 133 },
}
```

## 巧用类型约束

在 .tsx 文件里，泛型可能会被当做 jsx 标签

```ts
const toArray = <T>(element: T) => [element]; // Error in .tsx file.
```

加 extends 可破

```ts
const toArray = <T extends {}>(element: T) => [element]; // No errors.
```

## 编译

### 基础选项

- lib：用于指定在编译过程中需要包含进来的库文件，比如需要编译一些与浏览器 Dom 相关的代码，就需要引入 DOM 库，如果需要编译 ES2015 相关的一些代码，比如 Proxy、Reflect 等，就需要引入 ES2015 的库，如果需要引入一些尚在提案阶段的代码，比如 asynciterable、bigint，那么就要 esnext 库
- target：基础选项中的 target 用于指定编译后的目标代码，比如我们想编译为 ES5 或者 ES2015
- module：用于我们指定模块的标准，比如 amd、umd、commonjs、esnext 等等

### 类型检查

- strict: 用于指定是否启动所有类型检查，如果设为true则会同时开启下面这几个严格类型检查，默认为false
- noImplicitAny: 如果我们没有为一些值设置明确的类型，编译器会默认认为这个值为any，如果noImplicitAny的值为true的话。则没有明确的类型会报错。
- strictNullChecks：在严格的 null 检查模式下， null 和 undefined 值不包含在任何类型里，只允许用它们自己和 any 来赋值
- strictPropertyInitialization：确保类的非 undefined 属性已经在构造函数里初始化，若要令此选项生效，需要同时启用 `--strictNullChecks`
- strictBindCallApply：对 bind call apply 更严格的类型检测，比如如下可以检测出 apply 函数参数数量和类型的错误：
- alwaysStrict：始终以严格模式解析并为每个源文件生成 "use strict"语句，开启这个选项是一个好习惯，这可以帮助我们规避很多 JavaScript 遗留的一些怪异现象

### 额外检测选项

- noUnusedLocals：当一个变量声明，但未使用则抛错
- noUnusedParameters：当一个参数声明后没使用，也报错
- noImplicitReturns：当函数的有的返回路径没有返回值时报错
- noImplicitThis：当 this 为 any 类型的时候报错
- noFallthroughCasesInSwitch：当 `switch` 中没有使用 break 跳出时报错

### 模块解析选项

模块解析非常常用，我们有时候要用到路径别名的时候就需要对模块解析选项进行配置。

- baseUrl：解析非相对模块名的基准目录，设置 baseUrl 来告诉编译器到哪里去查找模块，所有非相对模块导入都会被当做相对于 baseUrl
- paths：路径映射，使用 paths 的前提是 baseUrl 必须被指定，比如我们要映射 `src/Views` 目录，如何映射取决于 baseUrl 是什么，比如 baseUrl 为 `./`，那么：

```ts
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "views": ["src/Views"] // 此处映射是相对于"baseUrl"
    }
  }
}
```

- types: 如果指定了types，只有被列出来的包才会被包含进来,比如：

```
{
   "compilerOptions": {
        "types" : ["node", "lodash", "express"]
   }
}
```

- rootDirs: rootDirs可以指定一个路径列表，列表里的内容会在运行时被合并
- typeRoots: 默认所有可见的 "@types" 包会在编译过程中被包含进来，`node_modules/@types` 文件夹下以及它们子文件夹下的所有包都是可见的,但是如果指定了typeRoots，只有typeRoots下面的包才会被包含进来

这些指定的会被包进来编译解析

### Source Map 选项

- sourceRoot：指定TypeScript源文件的路径，以便调试器定位
- sourceMap：生成相应的 .map文件
- inlineSources：将代码与sourcemaps生成到一个文件中，要求同时设置了 --inlineSourceMap或 --sourceMap属性

### 实验选项

控制是否开启一些实验性质的语法。

- experimentalDecorators： 启用实验性的ES装饰器，在装饰器章节我们提到过
- emitDecoratorMetadata：给源码里的装饰器声明加上设计类型元数据，这个在我们 Reflect.Metadata 的章节也提到过

## eslint

```ts
eslint --init
```

- How would you like to use ESLint? **To check syntax, find problems, and enforce code style**

- What type of modules does your project use? **JavaScript modules (import/export)**

- Which framework does your project use? **None of these**

- Does your project use TypeScript? **Yes**

- Where does your code run? **Browser, Node**

- How would you like to define a style for your project? **Use a popular style guide**

- Which style guide do you want to follow? **Airbnb **严格程度Airbnb > Google > Standard

- What format do you want your config file to be in? **JavaScript**

- Would you like to install them now with npm? y

     

  

```ts
//.eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
  },
};

```

### env

这个配置项用于指定环境，每个环境都有自己预定义的全局变量，可以同时指定多个环境，不矛盾。

```
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    mocha: true,
    jquery: true,
  },
```

### extends

extends 属性值可以是一个字符串或字符串数组，数组中每个配置项继承它前面的配置。

比如我们的 `extends` 就继承了 Airbnb 的配置规则。

```
  extends: [
    'airbnb-base',
  ]
```

在继承了其他配置规则后我们依然可以对继承的规则进行修改、覆盖和拓展

- 改变继承的规则级别而不改变它的选项：
  - 基础配置："eqeqeq": ["error", "allow-null"]
  - 派生的配置："eqeqeq": "warn"
  - 最后生成的配置："eqeqeq": ["warn", "allow-null"]
- 覆盖基础配置中的规则的选项
  - 基础配置："quotes": ["error", "single", "avoid-escape"]
  - 派生的配置："quotes": ["error", "single"]
  - 最后生成的配置："quotes": ["error", "single"]

### globals

脚本在执行期间访问的额外的全局变量。

这就需要 globals 这个配置项：

```
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
```

比如我们我们需要一个全局变量 `Atomics`，在 globals 配置项声明后还需要设置一个值，这个值代表了此全局变量是可以被修改的还是只读的，如果是可写的，那么值为 `writable`，否则为 `readonly`。

### parser

ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器。

由于我们的项目是 TypeScript 的，所以就用上了 TypeScript 团队与 ESLint 联合发布的 `typescript-eslint` 解析器，

### parserOptions

parser 解析代码时的配置参数

```ts
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  }
```

比如我们可以指定 ECMAScript 版本，默认是5，在我们这里是用了最新的 ES2018。

比如我们可以指定资源类型，使用 script 还是 ECMAScript模块，我们这里指定了 module，也就是 ECMAScript 模块。

如果你还想使用额外的语言特性还可以再添加一个 `ecmafeatures` 对象，如下：

```
  parserOption: {
    ecmafeatures: {
      //允许在全局作用域下使用return语句
      globalReturn: false,
      //启用全局strict模式（严格模式）
      impliedStrict: false,
      //启用JSX
      jsx: false,
      //启用对实验性的objectRest/spreadProperties的支持
      experimentalObjectRestSpread: false
    }
  }
```

### plugins

ESLint 支持使用第三方插件 可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 `eslint-plugin-` 前缀。

很多人容易混淆plugin与extend， 两者的区别是，extend 提供的是 eslint 现有规则的一系列预设，而 plugin 则提供了除预设之外的自定义规则，当你在 eslint 的规则里找不到合适的的时候，就可以借用插件来实现了。很多比较大的团队由于项目的特殊性，会对 ESLint 进行特殊定制，借助的就是 plugins 进行自定义规则。

### rules

我们通常情况下是使用社区比较刘的配置集

有一些配置集比较松散比如：Standard，有一些配置集非常严苛比如：Airbnb，这个时候我们就需要进行二次拓展或者关闭一些不必要的选项，就需要用 rules 选项进行覆盖或者修改

## 测试Jest

我们在项目的根目录下初始化 jest：

```shell
jest --init
```

我们会被问到三个问题，我的选择如下：

- Choose the test environment that will be used for testing? **node**
- Do you want Jest to add coverage reports? **y**
- Automatically clear mock calls and instances between every test? **y**

第一个问题需要我们选择测试执行环境，有浏览器和 Node 两个选项，我们这次在简单的 Node 环境下测试，所以选择了 node。

第二个问题问我们是否需要测试覆盖率报告，通常情况下这个报告很重要，使我们整体测试情况的写一个报告，我选择了“是”。

第三个问题问我们是否在测试结束后帮我们自动清除一些模拟的实例等等，我选择了“是”，避免这些东西影响我们的下次测试。

比如 `clearMocks: true` 就是我们刚才的问题中用于清除模拟残留的配置，`coverageDirectory: 'coverage'` 就是我们刚才选择的测试覆盖率报告的配置，`testEnvironment: 'node'` 是我们刚才选择的测试环境。

我们如果想要在 TypeScript 中使用，需要进一步的配置

```ts
{
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json',
    'jsx',
    'node',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
}
```

- `moduleFileExtensions`: 模块文件扩展名，当你去引入一个模块并没有指定拓展名的时候，它会依次尝试去添加这些扩展名去拟引入模块文件
- `transform`: 一种转换器配置, 由于 Jest 默认的转换器不支持 TypeScript，因此需要 ts-jest 工具把 `.ts` 和 `.tsx` 文件内容转换成 js，因为我们现在基本上也都是用 ts 去编写测试代码，所以要配置转换器
- `testMatch`： 设置识别哪些文件是测试文件（glob形式）

## 环境搭建

### Jest搭建

```ts
npm i jest @types/jest ts-jest -D
```

- jest: Jest 单元测试框架
- @types/jest: Jest 是由 JavaScript 编写的(目前已经宣布之后会采用 TypeScript 开发),`@types/jest` 是为 jest 添加类型声明的 npm 包
- **ts-jest: 本身是一个 TypeScript 预处理器,它可以帮助我们可以用 TypeScript 编写 jest 相关测试代码**    关键插件不然只能写js

随后我们在项目的根目录创建文件`jest.config.js`:

```
module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
}
```

- roots: 让我们指定测试的根目录,通常情况下我们建议设置为 `src/`
- transform: 这里我们使用 `ts-jest` 来测试 `tsx/ts` 文件

接着我们在 `package.json` 下修改如下:

```
  "scripts": {
    ...
    "test": "jest",
    "test:c": "jest --coverage",
    "test:w": "jest --watchAll --coverage"
  },
```

- jest: 是运行测试,jest 会寻找在 `src/` 目录下所有符合要求的文件进行测试
- jest --watchAll: 是以监控模式监控所有符合要求的文件

### Eslint搭建

```ts
npm i eslint eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

- eslint: 代码检查工具
- [eslint-plugin-react](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fyannickcr%2Feslint-plugin-react%23list-of-supported-rules): 使得eslint支持react框架
- @typescript-eslint/parser: 让 eslint 可以解析 TypeScript  **关键 不然只能由js可以解析** 相当于ts官方做了一个桥梁
- [@typescript-eslint/eslint-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftypescript-eslint%2Ftypescript-eslint%2Ftree%2Fmaster%2Fpackages%2Feslint-plugin%23supported-rules): 使得 eslint 支持 TypeScript 相关规则  **关键 eslint支持ts的规则** 比如类型定义 这些都是额外定义的规则 不是extend 里面已经定义好的规则

在 `package.json` 添加如下:

```
  "scripts": {
    ...
    "lint": "eslint \"src/**\"",
    "lint:f": "eslint \"src/**\" --fix "
  },
```

- `npm run lint`: 检测`src/`项目的代码
- `npm run lint:f`: 检测`src/`项目的代码并**自动修复**