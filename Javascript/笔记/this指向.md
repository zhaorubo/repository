# This

> 所有的编程语言中，都会出现 this 方便程序在多种环境下执行。

## 为什么会有 this

> 编程语言中都会有就近原则 this 执行环境上下文（作用域）

## this 的作用

> 方便程序在多种环境下执行。

## this 指向的结论

1. 普通函数在 script 中调用 this 是指向 window
2. 当一个函数在对象内部时，该对象调用该函数，该 this 指向该对象
3. 当一个函数在对象内部，函数赋值给全局变量之后再调用函数
   该 this 指向就指向 window
4. 当一个函数再对象方法中被定义，该函数会被视为普通函数
   回到结论 1 this 指向 window
5. 定时器中的函数中 this 的指向永远是 window
   **总结：谁调用这个函数，this 就指向谁**

## this 指向的改变

> 可以定义 that 来保存 this 指向（不推荐）

### call()

> call(你要改变的目标对象,实参 1,实参 2,....)

```
var city = '广州'
let obj = {
    city: '上海',
    fn(msg,num) {
        console.log(this.city + msg + num)
    }
}

obj.fn('真不错')
// 希望 输出 广州真不错  this指向从obj => window
// call(你要改变的目标对象,实参) 改变this指向
obj.fn.call(window, '真不错',100)
```

### apply()

```
var city = '广州'
let obj = {
    city: '上海',
    fn(msg, num) {
        console.log(this.city + msg + num)
    }
}
 obj.fn.apply(window, ['真不错', 100])
```

### bind()

> bind 方法会返回一个函数，需要再加一个()去执行这个函数才能改变指向

```
var city = '广州'
let obj2 = {
    city: '杭州'
}
let obj = {
    city: '上海',
    fn(msg, num) {
        console.log(this.city + msg + num)
    }
}
obj.fn.bind(obj2, '真不错', 100)()
```

## 箭头函数

### 是什么

> 本质上也是一个函数，是普通函数升级版的写法（更加简洁）

### 语法结构

-   写法一
    -   let 函数名 = (参数) => {函数体}
-   写法二: 当参数只有一个的时候，括号可以省略，当没有参数或者多个参数的时候，括号不可省略
    -   let 函数名 = 参数 => {函数体}
    -   let 函数名 = (参数 1,参数 2,..) => {函数体}
-   写法三: 函数带返回值:return 和 {} 都可以省略
    -   let 函数名 = 参数 => 函数体

```
// 不带返回值
let fn = (a,b) => { console.log(a,b)}
fn(1,2)

let fn1 = a => {console.log(a)}
fn1(2)

// 带返回值
// 不写return也不写{}
let fn = a => a + 3
let b = fn(1)
console.log(b) // 3
// 如果函数内部是多行操作，就不要省略return 和 {}
// 如果函数内部只有一行操作，可以省略
```

### 箭头函数 this 指向

> 箭头函数的定义中 是否存在于某个作用域中，如果在 this 指向该作用域的调用者。如果不在则指向全局

在 js 中判断 this 的方法论：

1. 看到 this，看这个 this 是否在箭头函数中
2. 如果不是箭头函数，遵循: 谁调用指向谁
3. 如果是箭头函数，遵循: 看是否在作用域中，看哪个对象调用该作用域
