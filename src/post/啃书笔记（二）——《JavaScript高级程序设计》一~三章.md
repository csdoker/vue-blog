读完上一本DOM编程艺术后，认识了一些网页常见的DOM操作，那么接下来就该对JavaScript语言本身进行一个系统的学习了。要全面学习JavaScript，最快的办法还是读书，所以我选择了这本《JavaScript高级程序设计》，因为它在业内被誉为前端必读的经典书籍之一，而且也算入门的必备书了，非常有细细研读的价值。

<!--more-->

## 第一章：JavaScript简介
第一章的前半段主要对JavaScript的历史进行了简单回顾，后半段介绍了它的版本以及和ECMAScript的关系。
历史介绍方面没什么好讲的，读者可自行翻阅，后半段JavaScript实现部分的内容可用一张图作为概括：

![JavaScript实现](https://i.loli.net/2017/11/07/5a0110aeb73ff.png)

## 第二章：在HTML中使用JavaScript
### script元素
在通过&lt;script&gt;标签嵌入JavaScript代码时，代码中不能出现“&lt;/script&gt;”字符串，通过转义字符解决：
```html
<script type="text/javascript">
    function sayScript(){
        alert("<\/script>");
    }
</script>
```

### 延迟脚本
defer属性表明脚本会被延迟到整个页面都解析完毕后再运行（浏览器遇到&lt;/html&gt;标签之后）
```html
<script type="text/javascript" defer="defer" src="example1.js"></script>
```
> 注：defer属性只适用于外部脚本文件

### 异步脚本
指定async属性的目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容
```html
<script type="text/javascript" async src="example1.js"></script>
```
> 注：async属性只适用于外部脚本文件

### 在XHTML中的用法
在XHTML中小于号（<）会被当做一个开始标签来解析，可以用相应的HTML实体来替换代码中的小于号：
```html
<script type="text/javascript">
function compare(a, b) {
    if (a &lt; b) {
        alert("A is less than B");
    } else if (a > b) {
        alert("A is greater than B");
    } else {
        alert("A is equal to B");
    }
}
</script>
```
或者利用CDATA片段，它表示文档中的特殊区域：
```html
<script type="text/javascript">
//<![CDATA[
function compare(a, b) {
    if (a < b) {
        alert("A is less than B");
    } else if (a > b) {
        alert("A is greater than B");
    } else {
        alert("A is equal to B");
    }
}
//]]>
</script>
```
> 注释CDATA可以确保在不兼容XHTML的浏览器中也能正常使用

### noscript元素
利用&lt;noscript&gt;在不支持JavaScript的浏览器中显示替代的内容：
```html
<noscript>
    <p>本页面需要浏览器支持（启用）JavaScript。</p>
</noscript>
```

## 第三章：基本概念
### 标识符
标识符指变量、函数、函数参数、属性的名字，规则如下：
- 第一个字符必须是一个字母、下划线 `_` 或一个美元符号 `$`
- 其他字符可以是字母、下划线、美元符号或数字

> 注：不能把关键字、保留字、true、false和null用作标识符

### 变量
用var操作符定义的变量将成为定义该变量的作用域中的局部变量：
```javascript
function test(){
    var message = "hi"; // 局部变量
}
test();
alert(message); // 错误！
```
省略var后，message就成了全局变量：（不推荐的做法）
```javascript
function test(){
    var message = "hi"; // 全局变量
}
test();
alert(message); // "hi"
```
> 在严格模式下，不能定义名为`eval`或`arguments`的变量，否则会导致语法错误。

### 数据类型
基本数据类型：
`Undefined`、`Null`、`Boolean`、`Number`、`String`

复杂数据类型：
`Object`

#### typeof
使用操作符`typeof`可以检测给定变量的数据类型，返回的字符串结果及解释如下：

undefined | boolean | string | number | object     | function
----------|---------|--------|--------|------------|---------
未定义    | 布尔值  | 字符串 | 数值   | 对象或null | 函数

> 调用`typeof null`会返回`object`，因为特殊值`null`被认为是一个空的对象引用

#### undefined
只声明但未初始化变量或者初始化为undefined，变量的类型都将为undefined：
```javascript
var message;
alert(message == undefined); // true

var message = undefined;
alert(message == undefined); // true
```
变量未声明时，使用typeof操作符后返回的结果也将为undefined：
```javascript
var message; // 这个变量声明之后默认取得了undefined值
// 下面这个变量并没有声明
// var age;
alert(typeof message); // "undefined"
alert(typeof age); // "undefined"
```

#### Null
null值表示空对象指针，也就是说null也是一个对象：
```javascript
var car = null;
alert(typeof car); // "object"
```
如果定义的变量准备用来保存对象，就应该明确的让变量初始化为null，这样可以与默认初始化的undefined值区分开：
```javascript
if (car != null){
// 对car对象执行某些操作
}
```
undefined值派生自null：
```javascript
alert(null == undefined); // true
```

#### Boolean
true、false和数字值不同，true不一定等于1，false不一定等于0

区分大小写，True和False不是Boolean值

可以对任何数据类型的值调用Boolean()函数，它总会返回一个Boolean值：

数据类型 | 转换为true的值 | 转换为false的值
---------|----------------|----------------
Boolean  | true           | false
String   | 任何非空字符串 | ""（空字符串）
Number   | 任何非零数字值 | 0和NaN
Object   | 任何对象       | null
Undefined| n/a            | undefined

#### Number
##### 整数
数值字面量格式可以是十进制、八进制或十六进制整数：
```javascript
var intNum = 55; // 整数
var octalNum1 = 070; // 八进制的 56
var octalNum2 = 079; // 无效的八进制数值——解析为 79
var octalNum3 = 08; // 无效的八进制数值——解析为 8
var hexNum1 = 0xA; // 十六进制的 10
var hexNum2 = 0x1f; // 十六进制的 31
```
JavaScript中可以保存+0和-0这两种数值，并且它们相等：
```javascript
+0 == -0 // true
```

##### 浮点数
ECMAScript会不失时机地将浮点数值转换为整数值：
```javascript
var floatNum1 = 1.; // 小数点后面没有数字——解析为 1
var floatNum2 = 10.0; // 整数——解析为 10
```
极小或者极大的数值可以用e表示法：
```javascript
var floatNum1 = 3.125e7; // 等于 31250000
var floatNum2 = 3e-17 // 等于 0.00000000000000003
```
浮点数值的最高精度是17位小数，浮点数值计算会产生舍入误差的问题：
```javascript
0.1 + 0.2 // 等于 0.30000000000000004
```

##### MIN_VALUE、MAX_VALUE
ECMAScript能够表示的最小数值与最大数值：
```javascript
Number.MIN_VALUE // 5e-324
Number.MAX_VALUE // 1.7976931348623157e+308
```

##### Infinity
超过数值范围的值会被转化为-Infinity（负无穷）或者Infinity（正无穷）
```javascript
Number.NEGATIVE_INFINITY = -Infinity
Number.POSITIVE_INFINITY = Infinity
```
使用`isFinite()`可以确定一个数值是否在最大和最小数值之间：
```javascript
var result = Number.MAX_VALUE + Number.MAX_VALUE;
alert(isFinite(result)); // false
```

##### NaN
在ECMAScript中，0除以0返回NaN，正数和负数除以0返回Infinity和-Infinity
除此之外，它还有两个特点：
> 任何涉及NaN的操作都会返回NaN
> NaN与任何值都不相等，包括它本身

利用`isNaN()`可以判断一个参数是否“不是数值”，它会尝试将这个值转化为数值：
```javascript
alert(isNaN(NaN)); // true
alert(isNaN(10)); // false（10 是一个数值）
alert(isNaN("10")); // false（可以被转换成数值 10）
alert(isNaN("blue")); // true（不能转换成数值）
alert(isNaN(true)); // false（可以被转换成数值 1）
```

##### 数值转换
`Number()`可以用于任何数据类型，`parseInt()`和`parseFloat()`则专门用于将字符串转化为数值，`Number()`的转换规则如下：
- 如果是Boolean值，true和false将分别被转换为1和0
- 如果是数字值，只是简单的传入和返回
- 如果是null值，返回0
- 如果是undefined，返回NaN
- 如果是字符串，遵循以下原则：
 1. 如果字符串中只包含数字（包括前面带正号或负号的情况），则将其转换为十进制数值，即 "1"会变成 1，"123"会变成 123，而"011"会变成11（注意：前导的零被忽略了）
 2. 如果字符串中包含有效的浮点格式，如"1.1"，则将其转换为对应的浮点数值（同样，也会忽略前导零）
 3. 如果字符串中包含有效的十六进制格式，例如"0xf"，则将其转换为相同大小的十进制整数值
 4. 如果字符串是空的（不包含任何字符），则将其转换为 0
 5. 如果字符串中包含除上述格式之外的字符，则将其转换为 NaN
- 如果是对象，则调用对象的valueOf()方法，然后依照前面的规则转换返回的值。如果转换
的结果是NaN，则调用对象的toString()方法，然后再次依照前面的规则转换返回的字符
串值

`Number()`转换的例子如下：
```javascript
var num1 = Number("Hello world!"); // NaN
var num2 = Number(""); // 0
var num3 = Number("000011"); // 11
var num4 = Number(true); // 1
```
`parseInt()`的转换规则如下：
- 转换字符串时，更多的是看其是否符合数值模式，它会忽略字符串前面的空格，直至找到第一个非空格字符
- 如果第一个字符不是数字字符或者负号，返回NaN
- 如果第一个字符是数字字符，parseInt()会继续解析第二个字符，直到解析完所有后续字符或者遇到了一个非数字字符
- 如果字符串中的第一个字符是数字字符，parseInt()也能够识别出各种整数格式

`parseInt()`转换的例子如下：
```javascript
var num1 = parseInt("1234blue"); // 1234
var num2 = parseInt(""); // NaN
var num3 = parseInt("0xA"); // 10（十六进制数）
var num4 = parseInt(22.5); // 22
var num5 = parseInt("070"); // 56（八进制数）
var num6 = parseInt("70"); // 70（十进制数）
var num7 = parseInt("0xf"); // 15（十六进制数）
```
解析像八进制字面量的字符串时，ECMAScript3和5存在分歧，因此需要指定转换时使用的基数：
```javascript
var num = parseInt("0xAF", 16); // 175
var num1 = parseInt("AF", 16); // 省略0x后就必须指定基数
var num2 = parseInt("AF"); // NaN
```
`parseFloat()`的转换规则如下：
- 从第一个字符（位置0）开始解析每个字符。而且一直解析到字符串末尾，或者解析到遇见一个无效的浮点数字字符为止（字符串中的第一个小数点是有效的，而第二个小数点就是无效的了，因此它后面的字符串将被忽略）
- 始终都会忽略前导的零

典型示例：
```javascript
var num1 = parseFloat("1234blue"); // 1234（整数）
var num2 = parseFloat("0xA"); // 0
var num3 = parseFloat("22.5"); // 22.5
var num4 = parseFloat("22.34.5"); // 22.34
var num5 = parseFloat("0908.5"); // 908.5
var num6 = parseFloat("3.125e7"); // 31250000
```

#### String
String数据类型包含的转义序列如下：

字面量 | 含义
-------|-----
\n     | 换行
\t     | 制表
\b     | 空格
\r     | 回车
\f     | 进纸
\&#92; | 斜杠
\'     | 单引号
\"     | 双引号
\xnn   | 以十六进制代码 nn 表示的一个字符（其中n为0～F）。例如，\x41表示"A"
\unnnn | 以十六进制代码nnnn表示的一个Unicode字符（其中n为0～F）。例如，\u03a3表示希腊字符Σ

数值、布尔值、对象和字符串值都有`toString()`方法，null和undefined值没有这个方法。
在调用数值的这个方法时，可以指定输出数值的基数：
```javascript
var num = 10;
alert(num.toString()); // "10"
alert(num.toString(2)); // "1010"
alert(num.toString(8)); // "12"
alert(num.toString(10)); // "10"
alert(num.toString(16)); // "a"
```
转型函数String()可以将任何类型的值转换为字符串，转换规则如下：
- 如果值有toString()方法，则调用该方法（没有参数）并返回相应的结果
- 如果值是null，则返回"null"
- 如果值是undefined，则返回"undefined"

```javascript
var value1 = 10;
var value2 = true;
var value3 = null;
var value4;
alert(String(value1)); // "10"
alert(String(value2)); // "true"
alert(String(value3)); // "null"
alert(String(value4)); // "undefined"
```

#### Object
利用new操作符来创建一个对象的实例：
```javascript
var o = new Object();
```
Object是所有对象的基础，它具有如下属性和方法：
- constructor：保存着用于创建当前对象的函数。对于前面的例子而言，构造函数`constructor`就是Object()
- hasOwnProperty(propertyName)：用于检查给定的属性在当前对象实例中（而不是在实例的原型中）是否存在。其中，作为参数的属性名（propertyName）必须以字符串形式指定（例如：o.hasOwnProperty("name")）
- isPrototypeOf(object)：用于检查传入的对象是否是传入对象的原型
- propertyIsEnumerable(propertyName)：用于检查给定的属性是否能够使用for-in语句来枚举。与hasOwnProperty()方法一样，作为参数的属性名必须以字符串形式指定
- toLocaleString()：返回对象的字符串表示，该字符串与执行环境的地区对应
- toString()：返回对象的字符串表示
- valueOf()：返回对象的字符串、数值或布尔值表示。通常与toString()方法的返回值
相同

### 操作符
#### 一元递增和递减
前置递增和递减操作时，变量的值都是在语句被求值以前改变的：
```javascript
var age = 29;
var anotherAge = --age + 2;
alert(age); // 输出 28
alert(anotherAge); // 输出 30
```
后置递增和递减操作是在包含它们的语句被求值之后才执行的：
```javascript
var num1 = 2;
var num2 = 20;
var num3 = num1-- + num2; //  等于 22
var num4 = num1 + num2; // 等于 21
```
在应用于不同的值时，递增和递减操作符遵循下列规则：
- 在应用于一个包含有效数字字符的字符串时，先将其转换为数字值，再执行加减1的操作。字符串变量变成数值变量
- 在应用于一个不包含有效数字字符的字符串时，将变量的值设置为NaN。字符串变量变成数值变量
- 在应用于布尔值false时，先将其转换为0再执行加减1的操作。布尔值变量变成数值变量
- 在应用于布尔值true时，先将其转换为1再执行加减1的操作。布尔值变量变成数值变量
- 在应用于浮点数值时，执行加减1的操作
- 在应用于对象时，先调用对象的valueOf()方法以取得一个可供操作的值。然后对该值应用前述规则。如果结果是NaN，则在调用toString()方法后再应用前述规则。对象变量变成数值变量

示例如下：
```javascript
var s1 = "2";
var s2 = "z";
var b = false;
var f = 1.1;
var o = {
    valueOf: function() {
        return -1;
    }
};
s1++; // 值变成数值 3
s2++; // 值变成 NaN
b++; // 值变成数值 1
f--; // 值变成 0.10000000000000009（由于浮点舍入错误所致）
o--; // 值变成数值-2
```

#### 一元加和减
对非数值应用一元加和减操作符时，会向会像Number()转型函数一样对这个值执行转换：
```javascript
var s1 = "01";
var s2 = "1.1";
var s3 = "z";
var b = false;
var f = 1.1;
var o = {
    valueOf: function() {
        return -1;
    }
};
s1 = +s1; // 值变成数值 1
s2 = +s2; // 值变成数值 1.1
s3 = +s3; // 值变成 NaN
b = +b; // 值变成数值 0
f = +f; // 值未变，仍然是 1.1
o = +o; // 值变成数值-1
```
一元减操作符应用时，和一元加一样，不过最后会将得到的数值转换成负数：
```javascript
var s1 = "01";
var s2 = "1.1";
var s3 = "z";
var b = false;
var f = 1.1;
var o = {
    valueOf: function() {
        return -1;
    }
};
s1 = -s1; // 值变成了数值-1
s2 = -s2; // 值变成了数值-1.1
s3 = -s3; // 值变成了 NaN
b = -b; // 值变成了数值 0
f = -f; // 变成了-1.1
o = -o; // 值变成了数值 1
```

#### 位操作符
##### 按位非
操作数的负值减1：
```javascript
var num1 = 25; // 二进制 00000000000000000000000000011001
var num2 = ~num1; // 二进制 11111111111111111111111111100110
alert(num2); // -26
```

##### 按位与
两个数值的对应位都是1时才返回1，任何一位是0，结果都是0：
```javascript
var result = 25 & 3;
alert(result); // 1
```
25 = 0000 0000 0000 0000 0000 0000 0001 1001
3 = 0000 0000 0000 0000 0000 0000 0000 0011
AND = 0000 0000 0000 0000 0000 0000 0000 0001

##### 按位或
有一个位是1的情况下就返回1，而只有在两个位都是0的情况下才返回0：
```javascript
var result = 25 | 3;
alert(result); // 27
```
25 = 0000 0000 0000 0000 0000 0000 0001 1001
3 = 0000 0000 0000 0000 0000 0000 0000 0011
OR = 0000 0000 0000 0000 0000 0000 0001 1011

##### 按位异或
两个数值对应位上只有一个1时才返回1，如果对应的两位都是1或都是0，则返回0：
```javascript
var result = 25 ^ 3;
alert(result); // 26
```
25 = 0000 0000 0000 0000 0000 0000 0001 1001
3 = 0000 0000 0000 0000 0000 0000 0000 0011
XOR = 0000 0000 0000 0000 0000 0000 0001 1010

##### 左移
将数值的所有位向左移动指定的位数：
```javascript
var oldValue = 2; // 等于二进制的 10
var newValue = oldValue << 5; // 等于二进制的 1000000，十进制的 64
```

##### 有符号的右移
将数值向右移动，但保留符号位（即正负号标记）：
```javascript
var oldValue = 64; // 等于二进制的 1000000
var newValue = oldValue >> 5; // 等于二进制的 10 ，即十进制的 2
```

##### 无符号右移
以0来填充空位，而不是像有符号右移那样以符号位的值来填充空位，并且无符号右移操作符会把负数的二进制码当成正数的二进制码：
```javascript
var oldValue = -64; // 等于二进制的 11111111111111111111111111000000
var newValue = oldValue >>> 5; // 等于十进制的 134217726
```

#### 布尔操作符
##### 逻辑非
逻辑非操作符首先会将它的操作数转换为一个布尔值，然后再对其求反：
```javascript
alert(!false); // true
alert(!"blue"); // false
alert(!0); // true
alert(!NaN); // true
alert(!""); // true
alert(!12345); // false
```
同时使用两个逻辑非操作符，实际上就会模拟`Boolean()`转型函数的行为：
```javascript
alert(!!"blue"); // true
alert(!!0); // false
alert(!!NaN); // false
alert(!!""); // false
alert(!!12345); // true
```

##### 逻辑与
有一个操作数不是布尔值的情况下，逻辑与操作就不一定返回布尔值：
- 如果第一个操作数是对象，则返回第二个操作数
- 如果第二个操作数是对象，则只有在第一个操作数的求值结果为true的情况下才会返回该对象
- 如果两个操作数都是对象，则返回第二个操作数
- 如果有一个操作数是null，则返回null
- 如果有一个操作数是NaN，则返回NaN
- 如果有一个操作数是undefined，则返回undefined

如果第一个操作数能够决定结果，那么就不会再对第二个操作数求值：
```javascript
var found = true;
var result = (found && someUndefinedVariable); // 这里会发生错误
alert(result); // 这一行不会执行

var found = false;
var result = (found && someUndefinedVariable); // 不会发生错误
alert(result); // 会执行（"false"）
```

##### 逻辑或
如果有一个操作数不是布尔值，逻辑或也不一定返回布尔值：
- 如果第一个操作数是对象，则返回第一个操作数
- 如果第一个操作数的求值结果为false，则返回第二个操作数
- 如果两个操作数都是对象，则返回第一个操作数
- 如果两个操作数都是null，则返回null
- 如果两个操作数都是NaN，则返回NaN
- 如果两个操作数都是undefined，则返回undefined

如果第一个操作数的求值结果为true，就不会对第二个操作数求值了：
```javascript
var found = true;
var result = (found || someUndefinedVariable); // 不会发生错误
alert(result); // 会执行（"true"）

var found = false;
var result = (found || someUndefinedVariable); // 这里会发生错误
alert(result); // 这一行不会执行
```

#### 乘性操作符
##### 乘法
在处理特殊值的情况下，乘法操作符遵循下列特殊的规则：
- 如果操作数都是数值，执行常规的乘法计算，即两个正数或两个负数相乘的结果还是正数，而如果只有一个操作数有符号，那么结果就是负数。如果乘积超过了ECMAScript数值的表示范围，则返回Infinity或-Infinity
- 如果有一个操作数是NaN，则结果是NaN
- 如果是Infinity与0相乘，则结果是NaN
- 如果是Infinity与非0数值相乘，则结果是Infinity或-Infinity，取决于有符号操作数
的符号
- 如果是Infinity与Infinity相乘，则结果是Infinity
- 如果有一个操作数不是数值，则在后台调用Number()将其转换为数值，然后再应用上面的规则

##### 除法
除法操作符对特殊的值也有特殊的处理规则：
- 如果操作数都是数值，执行常规的除法计算，即两个正数或两个负数相除的结果还是正数，而如果只有一个操作数有符号，那么结果就是负数。如果商超过了ECMAScript数值的表示范围，则返回Infinity或-Infinity
- 如果有一个操作数是NaN，则结果是NaN
- 如果是Infinity被Infinity除，则结果是NaN
- 如果是零被零除，则结果是NaN
- 如果是非零的有限数被零除，则结果是Infinity或-Infinity，取决于有符号操作数的符号
- 如果是Infinity被任何非零数值除，则结果是Infinity或-Infinity，取决于有符号操作数的符号
- 如果有一个操作数不是数值，则在后台调用Number()将其转换为数值，然后再应用上面的规则

##### 求模
求模操作符会遵循下列特殊规则来处理特殊的值：
- 如果操作数都是数值，执行常规的除法计算，返回除得的余数
- 如果被除数是无穷大值而除数是有限大的数值，则结果是NaN
- 如果被除数是有限大的数值而除数是零，则结果是NaN
- 如果是Infinity被Infinity除，则结果是NaN
- 如果被除数是有限大的数值而除数是无穷大的数值，则结果是被除数
- 如果被除数是零，则结果是零
- 如果有一个操作数不是数值，则在后台调用Number()将其转换为数值，然后再应用上面的规则

#### 加性操作符
##### 加法
如果两个操作符都是数值，执行常规的加法计算，然后根据下列规则返回结果：
- 如果有一个操作数是NaN，则结果是NaN
- 如果是Infinity加Infinity，则结果是Infinity
- 如果是-Infinity加-Infinity，则结果是-Infinity
- 如果是Infinity加-Infinity，则结果是NaN
- 如果是+0加+0，则结果是+0
- 如果是0加0，则结果是0
- 如果是+0加0，则结果是+0

如果有一个操作数是字符串：
- 如果两个操作数都是字符串，则将第二个操作数与第一个操作数拼接起来
- 如果只有一个操作数是字符串，则将另一个操作数转换为字符串，然后再将两个字符串拼接起来

> 如果有一个操作数是对象、数值或布尔值，则调用它们的toString()方法取得相应的字符串值。
> 对于undefined和null，则分别调用String()函数并取得字符串"undefined"和"null"。

##### 减法
与加法操作符类似，减法操作符在处理各种数据类型转换时，同样需要遵循一些特殊规则：
- 如果两个操作符都是数值，则执行常规的算术减法操作并返回结果
- 如果有一个操作数是NaN，则结果是NaN
- 如果是Infinity减Infinity，则结果是NaN
- 如果是-Infinity减-Infinity，则结果是NaN
- 如果是Infinity减-Infinity，则结果是Infinity
- 如果是-Infinity减Infinity，则结果是-Infinity
- 如果是+0减+0，则结果是+0
- 如果是+0减0，则结果是0
- 如果是0减0，则结果是+0
- 如果有一个操作数是字符串、布尔值、null或undefined，则先在后台调用Number()函数将其转换为数值，然后再根据前面的规则执行减法计算。如果转换的结果是NaN，则减法的结果就是NaN
- 如果有一个操作数是对象，则调用对象的valueOf()方法以取得表示该对象的数值。如果得到的值是NaN，则减法的结果就是NaN。如果对象没有valueOf()方法，则调用其toString()方法并将得到的字符串转换为数值

```javascript
var result1 = 5 - true; // 4，因为 true 被转换成了 1
var result2 = NaN - 1; // NaN
var result3 = 5 - 3; // 2
var result4 = 5 - ""; // 5，因为"" 被转换成了 0
var result5 = 5 - "2"; // 3，因为"2"被转换成了 2
var result6 = 5 - null; // 5，因为 null 被转换成了 0
```

#### 关系操作符
当关系操作符的操作数使用了非数值时，也要进行数据转换或完成某些奇怪的操作：
- 如果两个操作数都是数值，则执行数值比较
- 如果两个操作数都是字符串，则比较两个字符串对应的字符编码值
- 如果一个操作数是数值，则将另一个操作数转换为一个数值，然后执行数值比较
-  如果一个操作数是对象，则调用这个对象的valueOf()方法，用得到的结果按照前面的规则执行比较。如果对象没有valueOf()方法，则调用toString()方法，并用得到的结果根据前面的规则执行比较
- 如果一个操作数是布尔值，则先将其转换为数值，然后再执行比较

要真正按字母表顺序比较字符串，就必须把两个操作数转换为相同的大
小写形式（全部大写或全部小写）：
```javascript
var result = "Brick".toLowerCase() < "alphabet".toLowerCase(); //false
```
任何操作数与NaN进行关系比较，结果都是false：
```javascript
var result1 = NaN < 3; //false
var result2 = NaN >= 3; //false
```

#### 相等操作符
##### 相等和不相等
"=="和"!="都会先转换操作数，然后再比较它们的相等性。在转换不同的数据类型时，相等和不相等操作符遵循下列基本规则：
- 如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false转换为0，而true转换为1
- 如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值
- 如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法，用得到的基本类型值按照前面的规则进行比较

这两个操作符在进行比较时则要遵循下列规则：
- null和undefined是相等的
- 要比较相等性之前，不能将null和undefined转换成其他任何值
- 如果有一个操作数是NaN，则相等操作符返回false，而不相等操作符返回true 。重要提示：即使两个操作数都是NaN，相等操作符也返回false；因为按照规则，NaN不等于NaN
- 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回true；否则，返回false

下表列出了一些特殊情况及比较结果：

表达式 | 值
-------|-----
null == undefined | true
"NaN" == NaN | false
5 == NaN | false
NaN == NaN | false
NaN != NaN | true
false == 0 | true
true == 1 | true
true == 2 | false
undefined == 0 | false
null == 0 | false
"5"==5 | true

##### 全等和不全等
"==="和"!=="在比较之前不转换操作数，它们只在两个操作数未经转换就相等或不相等的情况下返回true：
```javascript
var result1 = ("55" == 55); //true，因为转换后相等
var result2 = ("55" === 55); //false，因为不同的数据类型不相等

var result1 = ("55" != 55); //false，因为转换后相等
var result2 = ("55" !== 55); //true，因为不同的数据类型不相等
```
> null==undefined会返回true，因为它们是类似的值；但null === undefined会返回false，因为它们是不同类型的值。

#### 条件操作符
variable = boolean_expression ? true_value : false_value;

#### 逗号操作符
在用于赋值时，逗号操作符总会返回表达式中的最后一项：
```javascript
var num = (5, 1, 4, 8, 0); // num 的值为 0
```

### 语句
#### if语句
```javascript
if (condition) statement1 else statement2
```
其中的condition（条件）可以是任意表达式，对这个表达式求值的结果不一定是布尔值。ECMAScript 会自动调用Boolean()转换函数将这个表达式的结果转换为一个布尔值。

#### for语句
ECMAScript中不存在块级作用域，因此在循环内部定义的变量也可以在外部访问到：
```javascript
var count = 10;
for (var i = 0; i < count; i++) {
    alert(i);
}
alert(i); // 10
```

#### for-in语句
```javascript
for (var propName in window) {
    document.write(propName);
}
```
ECMAScript对象的属性没有顺序，如果表示要迭代的对象的变量值为null或undefined，将不执行循环体。

#### label语句
```javascript
start: for (var i = 0; i < count; i++) {
    alert(i);
}
```

#### break和continue语句
它们可以和label语句联用：
```javascript
var num = 0;
outermost:
for (var i=0; i < 10; i++) {
    for (var j=0; j < 10; j++) {
        if (i == 5 && j == 5) {
            break outermost;
        }
        num++;
    }
}
alert(num); //55

var num = 0;
outermost:
for (var i=0; i < 10; i++) {
    for (var j=0; j < 10; j++) {
        if (i == 5 && j == 5) {
            continue outermost;
        }
        num++;
    }
}
alert(num); //95
```

### 函数
严格模式对函数有一些限制：
- 不能把函数命名为eval或arguments
- 不能把参数命名为eval或arguments
- 不能出现两个命名参数同名的情况

ECMAScript函数不能像传统意义上那样实现重载，因为其参数是由包含零或多个值的数组来表示的：
```javascript
function addSomeNumber(num){
    return num + 100;
}
function addSomeNumber(num) {
    return num + 200;
}
var result = addSomeNumber(100); // 300
```
如果在ECMAScript中定义了两个名字相同的函数，则该名字只属于后定义的函数。
通过检查传入函数中参数的类型和数量并作出不同的反应，可以模仿方法的重载：
```javascript
function doAdd() {
    if(arguments.length == 1) {
        alert(arguments[0] + 10);
    } else if (arguments.length == 2) {
        alert(arguments[0] + arguments[1]);
    }
}
doAdd(10); //20
doAdd(30, 20); //50
```
