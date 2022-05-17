# 引入

## 1.JS 可以在页内和页外引入

### 1.1 在 body 的最后页内引入

```
<script>
        // js代码
</script>
```

### 1.2 外部引入

> 在文件外面 新建一个文件 XXX.js 然后使用 script 标签的 scr 属性进行导入

```
<script scr="./index.js">
  //JS代码
</script>
```

# 变量

> 通过 var **关键字**去声明一个**变量名**`a`，让计算机在内存中开辟一个空间，然后在这个空间中存放一个数据，这个数据是 2

```
// 声明并赋值

var a = 2;

// 可以多个 变量声明和赋值 写一行；

var b = 3, c = 4;

// 先声明，后赋值

var b;
b = 5;
```

**注意：在编程的世界，一个等号是赋值;**

## 赋值规范

> **语义化**

1. 变量命名必须以字母、下划线”_”或者”$”为开头。其他字符可以是字母、_、美元符号或数字。
2. 变量名中不允许使用空格和其他标点符号，首个字不能为数字。
3. 变量名长度不能超过 255 个字符。
4. 变量名区分大小写。(javascript 是区分大小写的语言)
5. 变量名必须放在同一行中
6. 不能使用脚本语言中保留的关键字、保留字、true、false 和 null 作为标识符。

```
 var box = 10;
```

# 浏览器的输入输出

## 输出

### console.log()

> 控制台调试 js 代码

```
// 打印输出
console.log(123)


var number = 12
// 打印输出12
console.log(number)
```

> 通过`console.log()`可以在浏览器中打印输出内容，内容是放在括号里面，**注意**：如果你的内容是变量，一定要注意这个变量有没有被声明

### alert()

> 浏览器的提示框,如不按下确定，代码则停止执行

```
// 括号里面的内容会显示出来
// alert展示面向的是用于，而console.log 展示面对的则是开发人员


alert(123);
```

## 输入

### prompt()

> 主要用于获取用户输入的内容，而括号里面的内容是显示给用户的提示文本

```

// 弹出一个输入框让用户输入
prompt("今天是几号？")


// 输出用户输入的数据

var i = prompt('今天是几号？')
console.log(i)
```

# 数据类型

> 不同的数据类型，在内存中的大小是不一样的，计算机会自动识别出这些类型并自动分配出最好的地方来存放这些数据
> **所有数据类型都是大写开头**

-   简单数据类型
    -   Number (数字类型)
    -   String (字符串类型)
    -   Boolean (布尔类型)
    -   undefined
    -   null

> 可以使用`typeof()`方法来判断数据类型

-   语法： typeof 变量 或 typeof(变量)

## Number (数字类型)

> 整数、浮点数（小数）和 NaN 三种数字类型

-   整数
-   浮点数
-   NaN

```

  // 整数
  var num = 12;

  // 浮点数
  var num_two = 3.14;
```

### NaN

> Number 类型中有一个特殊的的数字

-   NaN -- not a number 它也是一个数字类型

```
// 当出现这种非正常数值相减的时候，会出现NaN
// NaN的所有计算最终都是NaN
console.log(12 - 'abc')
```

### isNaN()

```
// isNaN(变量) -- 功能： 判断当前变量是不是一个非数字
var num = 2;
var c = isNaN(num);
// 如果num是数字，那么 isNaN方法 返回的则是false
// 如果num不是数字，那么 isNaN方法 返回的则是true
console.log(c);
```

### 数据类型的转换

#### Number()方法 转换为数字类型

```
var demo = prompt('请输入你的年龄')
console.log(demo + 100)
// 将demo从string 改成 number
console.log(Number(demo) + 100)
```

#### parseInt()方法 转换为数字类型

```
var demo = prompt('请输入你的年龄')
console.log(demo + 100)
// 将demo从string 改成 number
console.log(parseInt(demo) + 100)
```

-   如果是数字开头，截取非数字内容 （不管后面还有没有数字）
-   如果是非数字开头，直接变成 NaN
-   parseInt()会自动取整

```

console.log(parseInt('3.1415926')) // 3
console.log(parseInt('3.8415926')) // 3
console.log(parseInt('123rem')) // 123
console.log(parseInt('rem123')) // NaN
```

#### parseFloat()

> 将字符串转换为浮点数，除了保留小数点以外的操作不同，其余都是跟 parseInt()一样的

-   如果是数字开头，截取非数字内容 （不管后面还有没有数字）
-   如果是非数字开头，直接变成 NaN
-   parseInt()会自动取整

#### 通过 - \* 来进行 隐式转换

```
console.log("12" * 1 + 10)  // 输出 22
console.log("12" - 1 + 10)  // 输出 22
```

## 字符串

-   有带双引号的文字叫做字符串
-   字符串用于显示输出中英文的
-   如不带引号，则浏览器默认当变量解析

```
console.log("这是字符串")
```

### 转换数据类型

#### .toString() 方法

> 将数字变成字符串

```
var num = 12
console.log(num.toString())

```

#### String() 方法

> 将数字变成字符串

```
var num = 12

var str1 = String(num)

console.log(typeof str1)
```

## Boolean (布尔值)

> 布尔值非真即假，布尔值的类型转换，只要字符串中有东西，不管是什么，都会转成 true

> 在 number 中，只有是数字为 0 的情况下才为 true，否则为 false

-   布尔值只有两个值
    -   true
    -   false

### Boolean() 方法

> 可以转换为布尔值

```
var a = 1
console.log(Boolean(a))
```

## nudefined null

> nudefined 和 null 严格上来说都是对象

-   nudefined 字面意思就是：未定义的值，这个值得语义是，希望表示一个变量最原始得状态，而非人为操作得结果

```
 var a = nudefined
            console.log(Boolean(a))  // false
            console.log(Number(a))
            // nudefined 转成 number 是 NaN

            console.log(String(a))  // nudefined
            console.log(a)    // nudefined

            console.log(typeof String(a))  // String
            console.log(typeof a)  // nudefined

```

-   null 是人为将这个变量设置为空

```
 var a = null
            console.log(Boolean(a)) // false
            console.log(Number(a))
            // null 转成 number 是 0

            console.log(String(a)) // null
            console.log(a)  // null

            console.log(typeof String(a))  // String
            console.log(typeof a)  // object

```
