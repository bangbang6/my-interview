#### 

## 1.区别

this.$**router**访问路由器

this.$**route**访问当前路由 

所以我们watch{$route}可以监听当前路由变化

## 2.动态路由

#### 1.可以通过$route.params来访问

#### 2.动态路由:/user/:id 

例如从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染**同个组件**，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。

#### 3.404页面应该放到最后面

```js
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

## 3.声明式路由和编程式路由

![image-20210320140047742](https://i.loli.net/2021/03/20/YZK2XBemwV1iTQL.png)

## 4.push 方法

### 1.query和params区别 

query是加问号，通过.query获取 ，加问号一般用于**传参数**

params是加斜杠   通过.params 获取 ，加斜杠一般是用于**动态路由**，需要匹配/user/:userId才能访问指定路由



![image-20210320140509965](https://i.loli.net/2021/03/20/eNTxI8kzmtcy1j9.png)

## 5.重定向:

redict:

![image-20210320141447655](https://i.loli.net/2021/03/20/KvuAqHCSkPeIiXf.png)

**注意：**注意[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)并没有应用在跳转路由上，而仅仅应用在其目标上。在下面这个例子中，为 `/a` 路由添加一个 `beforeEnter` 守卫并不会有任何效果。

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```

## 6.导航守位

### 1.全局守卫

##### ![image-20210320141802448](https://i.loli.net/2021/03/20/eAFLd3uTZm29XDV.png)

### 2.独享守卫

只有访问/foo时候触发这个守卫

![image-20210320142212384](https://i.loli.net/2021/03/20/u7pbkzDv8HWB21f.png)

## 3.组件内守卫

![image-20210320142324105](https://i.loli.net/2021/03/20/xweUgIGRVfKYvQE.png)

![image-20210320142534051](https://i.loli.net/2021/03/20/vmnRBPTChoQUEgF.png)



## 7.设置路由切换动画



![image-20210320142747488](https://i.loli.net/2021/03/20/7eSfLropGhzmDvB.png)

![image-20210320142644345](https://i.loli.net/2021/03/20/LBWfPJUt5S3amkh.png)