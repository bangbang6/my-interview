# ts可以通过一定的运算返回一个新的类型 所以叫做类型编程 

**总结:type就像let一样一直获取新的类型变量** **infer最关键相当于函数参数啦** <>就像函数的()一个是传入泛型当参数 一个是传入参数 <>中泛型约束extends就是相当于参数的类型



## 1.获取promise<T>的泛型值

```ts
type GetValue<T> = T extends Promise<infer P>?P:never

type promiseType = Promise<number>

type res = GetValue<promiseType> *////!res = any
```



## 2.实现pop函数

```ts
type pop<T extends Array<any>> = T extends [...infer Rest,infer R]? Rest:never



type popResr = pop<[1,2,3]> *//!popResr = [1, 2]
```



## 3.实现shift函数

```ts
//!实现trim
type trimLeft<T extends string> = T extends `${' ' | '\t'}${infer Rest}` ?trimLeft<Rest>:T
type trimRight<T extends string> = T extends `${infer Rest}${' ' | '\t'}` ?trimRight<Rest>:T



type trim = trimLeft<trimRight<'  123  '>>//'123'
```

## 4.实现replace

```ts
//!实现replace
type replace<origin extends string,template extends string,end extends string> = origin extends `${infer Left}${template}${infer Right}`?`${Left}${end}${Right}`:origin


type replaceRes = replace<'my name is bang','bang','zhen'> //"my name is zhen"
```

## 5.获取参数类型

```ts
//!获取参数类型
type funcType<T> = T extends (...args:infer R)=>any?R:never
type ft = (name:string,age:number)=>void
type funRes = funcType<ft> //! [name: string, age: number]
```

## 6.获取参数返回值

```ts
//!获取参数返回值
type funType2<T extends Function> = T extends (...args:any)=>infer R?R:never
type ft2 = (name:string,age:number)=>string[]
type funRe2s = funType2<ft2> //!string[]
```

## 7.看一遍

```ts
type GetValue<T> = T extends Promise<infer P>?P:never
type promiseType = Promise<number>
type res = GetValue<promiseType> ////!res = any
type pop<T extends Array<any>> = T extends [...infer Rest,infer R]? Rest:never

type popResr = pop<[1,2,3]> //!popResr = [1, 2]
type shift<T extends Array<any> > = T extends [infer R ,...infer Rest]?Rest:never
type shiftRes = shift<[2,3,1]>
type trimLeft<T extends string> = T extends `${' ' | '\t'}${infer Rest}` ?trimLeft<Rest>:T
type trimRight<T extends string> = T extends `${infer Rest}${' ' | '\t'}` ?trimRight<Rest>:T
type trim = trimLeft<trimRight<'  123  '>>//'123'
type replace<origin extends string,template extends string,end extends string> = origin extends `${infer Left}${template}${infer Right}`?`${Left}${end}${Right}`:origin


type replaceRes = replace<'my name is bang','bang','zhen'> //"my name is zhen"
type funcType<T extends Function> = T extends (...args:infer R)=>any?R:never
type ft = (name:string,age:number)=>void
type funRes = funcType<ft> //! [name: string, age: number]
type funType2<T extends Function> = T extends (...args:any)=>infer R?R:never
type ft2 = (name:string,age:number)=>string[]
type funRe2s = funType2<ft2> //!string[]
```

##### 1.type就像let一样一直获取新的类型变量

##### 2.infer最关键相当于函数参数啦

##### 3.<>就像函数的()一个是传入泛型当参数 一个是传入参数

##### 4.<>中泛型约束extends就是相当于参数的类型