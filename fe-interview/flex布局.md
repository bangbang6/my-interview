## 1.随着屏幕宽度变化的多栏布局

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>water</title>
  <style>
    .wrapper{
      display: flex;
      text-align: center;
      flex-wrap:wrap
    }
    .wrapper > *{
      padding: 10px;
      flex:1 100%; /* 没人站一份 每份100% */
      
    }

    .header{
      background-color: red;
    }
    .footer{
      background-color: green;
    }
    .main{
      background-color: aqua;
    }
    .nav{
      background-color: blueviolet;
    }
    .ads{
      background-color: lightcoral;
    }
    @media all and (min-width:700px) {
      .aside{
        flex:1 0 0;/* 第一个是放大即占比的比例 第二个是收缩的比例 0 是不收缩 第三个是占比 0 就是不占比 剩余空间100%让浏览器自动按照flex的第一个参数分配   */
      }
    }
    @media all and (min-width:800px) {
      .main{
        flex:3 0 0;/* 自动按照权重分配 */ /* 之前设置的100%变成啦0 */
        order:2
      }
      .nav{
        order:1
      }
      .ads{
        order: 3;
      }
      .footer{
        order: 4;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header"></div>
    <div class="main">
      <p>asdhofhodvbascnakkkkkkkkcank</p>
    </div>
    <div class="aside nav"></div>
    <div class="aside ads"></div>
    <div class="footer"></div>
  </div>
</body>
</html>
```

**flex**:第一个参数为放大比例(即剩余空间的占比)，第二个参数为缩小比例(即在剩余空间不足下这个元素优先缩小)，第三个参数指占宽度多少 浏览器分配完这个宽度才会去分配剩余空间给设置啦占比的其他元素

flex:1表示什么

```js
/* 一个值, 无单位数字: flex-grow */
flex: 2;

/* 一个值, width/height: flex-basis */
flex: 10em;
flex: 30px;
flex: min-content;

/* 两个值: flex-grow | flex-basis */
flex: 1 30px;

/* 两个值: flex-grow | flex-shrink */
flex: 2 2;

/* 三个值: flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;
```

**flex:布局的width是无效的，且grow属性都是根据浏览器算完flex-basis后的宽度来分配**

**shrink**只要设置不为0，则你设置他的flex-basis就不进入开始的计算(相当于没设置这个宽度)，因为他是可以压缩的，所以设置的宽度可以压缩，所以他的宽度是后面分配的,他的实际宽度就不=flex-basis,

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .container{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    .first{
      flex:1 0 20%;
     
      background-color: red;
    }
    .third{
      flex:1 0 30% ; /* 会被挤到后面去 因为没有剩余空间啦 超过了100% 不会给他分配空间*/  /*新的一行又是整个的100%给你分配 但是前两个元素可以在第一行放下 所以第二行就这一个元素 此时这个元素是30%但是剩余空间只有这个元素的flex:1 所以就100%都是这个元素*/
      
      background-color: blue;

    }
    .second{
      flex:1 0 80%;
     
      background-color: green;

    }
  </style>
</head>
<body>
  <div class="container">
    <div class="first">1</div>
    <div class="second">2</div>
    <div class="third">3</div>
  </div>

</body>
</html>
```

```css
  .first{
      flex:1 0 20%;
     
      background-color: red;
    }
    .third{
     
      flex:1;
      background-color: blue;

    }
    .second{
      flex:1;
     
     
      background-color: green;

    }
//实现的效果是这个元素先分配20% 剩下80%再这三个元素一起分配 所以第一个元素由46%多
```

```html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>shrink</title>
  <style>
    .container{
      width: 100%;
      display: flex;
      /* flex-wrap: wrap; */
    }
    .first{
      flex:0 1 65%;
     
      background-color: red;
    }
    .third{
     
      flex:1 0 65%;
      background-color: blue;

    }
    .second{
      flex:0 0 20%;
     
     
      background-color: green;

    }
  </style>
</head>
<body>
  <div class="container">
    <div class="first">1</div>
    <div class="second">2</div>
    <div class="third">3</div>
  </div>

</body>
</html>
```



## 2.双飞翼布局 两侧固定宽度 中间响应式

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .container{
      width: 100%;
      display: flex;
      /* flex-wrap: wrap; */
    }
    .first{
      flex:0 0 100px;
     
      background-color: red;
    }
    .third{
     
      flex:0 0 100px; /* 绝对不能写1 因为1会去和second分配100%-200px的剩余空间 */

      background-color: blue;

    }
    .second{
      flex:1;
      background-color: green;
     
      

    }
  </style>
</head>
<body>
  <div class="container">
    <div class="first">1</div>
    <div class="second">2</div>
    <div class="third">3</div>
  </div>

</body>
</html>
//如果中间过大 95%; 那么就会挤出去 除非设置wrap
```

**总结**:

设置了growth=1 那么实际宽度=flex-basis的宽度+剩余空间分配的宽度

设置shrink=1 那么宽度=剩余空间分配的宽度的shrink=1所有元素一起压缩 

前提是growth优先级高于shrink 执行growth就不会执行shrink