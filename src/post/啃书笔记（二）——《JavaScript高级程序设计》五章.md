## 第五章：引用类型
引用类型的值（对象）是引用类型的一个实例，新对象是使用new操作符后跟一个构造函数来创建的，构造函数本身就是一个函数，只不过是出于创建新对象的目的而定义的。

### Object类型
创建Object实例的两种方式：
```javascript
var person = new Object();
person.name = "Nicholas";
person.age = 29;

var person = {
    name : "Nicholas",
    age : 29
};
```
在JavaScript也可以使用方括号表示法来访问对象的属性：
```javascript
alert(person["name"]); //"Nicholas"
alert(person.name); //"Nicholas"
```
方括号语法的优点是可以通过变量来访问属性或者包含会导致语法错误字符的属性名：
```javascript
var propertyName = "name";
alert(person[propertyName]); //"Nicholas"

person["first name"] = "Nicholas";
```

<!--more-->

### Array类型
创建数组的基本方式：
```javascript
var colors = new Array();
var colors = new Array(3); // 创建一个包含 3 项的数组
var names = new Array("Greg"); // 创建一个包含 1 项，即字符串"Greg"的数组
var colors = Array(3); // 省略操作符
var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
var names = []; // 创建一个空数组
var values = [1,2,]; // 不要这样！这样会创建一个包含 2 或 3 项的数组
var options = [,,,,,]; // 不要这样！这样会创建一个包含 5 或 6 项的数组
```
通过设置数组的length属性，可以从数组的末尾移除项或向数组中添加新项：
```javascript
var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors.length = 2;
alert(colors[2]); //undefined

var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors.length = 4;
alert(colors[3]); //undefined

var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors[colors.length] = "black"; // （在位置 3 ）添加一种颜色
colors[colors.length] = "brown"; // （在位置 4 ）再添加一种颜色

var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors[99] = "black"; // （在位置 99 ）添加一种颜色
alert(colors.length); // 100
```

#### 检测数组
对于一个网页，或者一个全局作用域而言：
```javascript
if (value instanceof Array){
    //对数组执行某些操作
}
```
多个全局执行环境：
```javascript
if (Array.isArray(value)){
    //对数组执行某些操作
}
```

#### 转换方法
调用数组的`toString()`、`toLocaleString()`方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串，`valueOf()`返回的还是数组：
```javascript
var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
alert(colors.toString()); // "red,blue,green"
alert(colors.valueOf()); // ["red","blue","green"]
alert(colors); // "red,blue,green"
```
alert要接受字符串参数，所以它会在后台调用`toString()`方法，而`toString()`、`toLocaleString()`会调用了数组每一项的`toString()`、`toLocaleString()`方法：
```javascript
var person1 = {
    toLocaleString : function () {
        return "Nikolaos";
    },
    toString : function() {
        return "Nicholas";
    }
};
var person2 = {
    toLocaleString : function () {
        return "Grigorios";
    },
    toString : function() {
        return "Greg";
    }
};
var people = [person1, person2];
alert(people); //Nicholas,Greg
alert(people.toString()); //Nicholas,Greg
alert(people.toLocaleString()); //Nikolaos,Grigorios
```
使用join()方法，则可以使用不同的分隔符来构建这个字符串：
```javascript
var colors = ["red", "green", "blue"];
alert(colors.join(",")); //red,green,blue
alert(colors.join("||")); //red||green||blue
```

#### 栈方法
push()方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。而pop()方法则从数组末尾移除最后一项，减少数组的length值，然后返回移除的项：
```javascript
var colors = new Array(); // 创建一个数组
var count = colors.push("red", "green"); // 推入两项
alert(count); //2
count = colors.push("black"); // 推入另一项
alert(count); //3
var item = colors.pop(); // 取得最后一项
alert(item); //"black"
alert(colors.length); //2
```
可以将栈方法与其他数组方法连用：
```javascript
var colors = ["red", "blue"];
colors.push("brown"); // 添加另一项
colors[3] = "black"; // 添加一项
alert(colors.length); // 4
var item = colors.pop(); // 取得最后一项
alert(item); // "black"
```

#### 队列方法
shift()它能够移除数组中的第一个项并返回该项，同时将数组长度减1：
```javascript
var colors = new Array(); //创建一个数组
var count = colors.push("red", "green"); //推入两项
alert(count); //2
count = colors.push("black"); //推入另一项
alert(count); //3
var item = colors.shift(); // 取得第一项
alert(item); //"red"
alert(colors.length); //2
```
unshift()与shift()的用途相反，它能在数组前端添加任意个项并返回新数组的长度：
```javascript
var colors = new Array(); //创建一个数组
var count = colors.unshift("red", "green"); // 推入两项
alert(count); //2

count = colors.unshift("black"); // 推入另一项
alert(count); //3
var item = colors.pop(); // 取得最后一项
alert(item); //"green"
alert(colors.length); //2
```

#### 重排序方法
reverse()方法会反转数组项的顺序：
```javascript
var values = [1, 2, 3, 4, 5];
values.reverse();
alert(values); // 5,4,3,2,1
```
sort()方法按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。为了实现排序， sort()方法会调用每个数组项的toString()转型方法，然后比较得到的字符串：
```javascript
var values = [0, 1, 5, 10, 15];
values.sort();
alert(values); //0,1,10,15,5
```
在进行字符串比较时，"10"则位于"5"的前面，于是数组的顺序就被修改了，因此sort()方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面：
```javascript
// 升序
function compare1(value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}
var values = [0, 1, 5, 10, 15];
values.sort(compare1);
alert(values); //0,1,5,10,15

// 降序
function compare2(value1, value2) {
    if (value1 < value2) {
        return 1;
    } else if (value1 > value2) {
        return -1;
    } else {
        return 0;
    }
}
values.sort(compare2);
alert(values); // 15,10,5,1,0
```
对于数值类型：
```javascript
function compare(value1, value2){
    return value2 - value1;
}
```

#### 操作方法
concat()方法可以基于当前数组中的所有项创建一个新数组：
- 如果传递给concat()方法的是一或多个数组，则该方法会将这些数组中的每一项都添加到结果数组中
- 如果传递的值不是数组，这些值就会被简单地添加到结果数组的末尾
- 如果没有给concat()方法传递参数的情况下，它只是复制当前数组并返回副本

```javascript
var colors = ["red", "green", "blue"];
var colors2 = colors.concat("yellow", ["black", "brown"]);
alert(colors); //red,green,blue
alert(colors2); //red,green,blue,yellow,black,brown
```
slice()能够基于当前数组中的一或多个项创建一个新数组，它可以接受一或两个参数，即要返回项的起始和结束位置：
- 如果只有一个参数，slice()方法返回从该参数指定位置开始到当前数组末尾的所有项
- 如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项

```javascript
var colors = ["red", "green", "blue", "yellow", "purple"];
var colors2 = colors.slice(1);
var colors3 = colors.slice(1,4);
var colors4 = colors.slice(-2, -1);
var colors5 = colors.slice(3, 4);
var colors6 = colors.slice(4, 3);
alert(colors2); //green,blue,yellow,purple
alert(colors3); //green,blue,yellow
alert(colors4); // yellow
alert(colors5); // yellow
alert(colors6); // []
```
splice()的主要用途是向数组的中部插入项：
- 删除：指定两个参数，要删除的第一项的位置和要删除的项数
- 插入：提供3个参数：起始位置、0（要删除的项数）和要插入的项
- 替换：指定3个参数：起始位置、要删除的项数和要插入的任意数量的项

```javascript
var colors = ["red", "green", "blue"];
var removed = colors.splice(0,1); // 删除第一项
alert(colors); // green,blue
alert(removed); // red，返回的数组中只包含一项
removed = colors.splice(1, 0, "yellow", "orange"); // 从位置 1 开始插入两项
alert(colors); // green,yellow,orange,blue
alert(removed); // 返回的是一个空数组
removed = colors.splice(1, 1, "red", "purple"); // 插入两项，删除一项
alert(colors); // green,red,purple,orange,blue
alert(removed); // yellow，返回的数组中只包含一项
```

#### 位置方法
indexOf()和lastIndexOf()都接收两个参数：要查找的项和（可选的）表示查找起点位置的索引：
- indexOf()方法从数组的开头（位置0）开始向后查找，lastIndexOf()方法则从数组的末尾开始向前查找
- 两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回-1
- 比较第一个参数与数组中的每一项时，会使用全等操作符

```javascript
var numbers = [1,2,3,4,5,4,3,2,1];
alert(numbers.indexOf(4)); //3
alert(numbers.lastIndexOf(4)); //5
alert(numbers.indexOf(4, 4)); //5
alert(numbers.lastIndexOf(4, 4)); //3
var person = { name: "Nicholas" };
var people = [{ name: "Nicholas" }];
var morePeople = [person];
alert(people.indexOf(person)); //-1
alert(morePeople.indexOf(person)); //0
```

#### 迭代方法
every()和some()，它们都用于查询数组中的项是否满足某个条件：
```javascript
var numbers = [1,2,3,4,5,4,3,2,1];

// every()：传入的函数必须对每一项都返回true，这个方法才返回true
var everyResult = numbers.every(function(item, index, array){
return (item > 2);
});
alert(everyResult); //false

// some()：只要传入的函数对数组中的某一项返回true，就会返回true
var someResult = numbers.some(function(item, index, array){
return (item > 2);
});
alert(someResult); //true
```
filter()利用指定的函数确定是否在返回的数组中包含某一项：
```javascript
var numbers = [1,2,3,4,5,4,3,2,1];
var filterResult = numbers.filter(function(item, index, array){
return (item > 2);
});
alert(filterResult); //[3,4,5,4,3]
```
map()也返回一个数组，而这个数组的每一项都是在原始数组中的对应项上运行传入函数的结果：
```javascript
var numbers = [1,2,3,4,5,4,3,2,1];
var mapResult = numbers.map(function(item, index, array){
return item * 2;
});
alert(mapResult); //[2,4,6,8,10,8,6,4,2]
```
forEach()，它只是对数组中的每一项运行传入的函数：
```javascript
var numbers = [1,2,3,4,5,4,3,2,1];
numbers.forEach(function(item, index, array){
    //执行某些操作
});
```

#### 归并方法
reduce()方法从数组的第一项开始，逐个遍历到最后。而reduceRight()则从数组的最后一项开始，向前遍历到第一项：
```javascript
// 执行求数组中所有值之和的操作
var values = [1,2,3,4,5];
var sum = values.reduce(function(prev, cur, index, array){
return prev + cur;
});
alert(sum); //15

var values = [1,2,3,4,5];
var sum = values.reduceRight(function(prev, cur, index, array){
return prev + cur;
});
alert(sum); //15
```

### Date类型
在调用Date构造函数而不传递参数的情况下，新创建的对象自动获得当前日期和时间：
```javascript
var now = new Date();
```
Date.parse()方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回相应日期的毫秒数，如果直接将表示日期的字符串传递给Date构造函数，也会在后台调用Date.parse()：
```javascript
// Tue May 25 2004 00:00:00 GMT+0800 (中国标准时间)
var someDate = new Date(Date.parse("May 25, 2004"));
var someDate = new Date("May 25, 2004");
```
Date.UTC()方法同样也返回表示日期的毫秒数：
```javascript
// GMT 时间 2000 年 1 月 1 日午夜零时
var y2k = new Date(Date.UTC(2000, 0));
// GMT 时间 2005 年 5 月 5 日下午 5:55:55
var allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55));

// 本地时间 2000 年 1 月 1 日午夜零时
var y2k = new Date(2000, 0);
// 本地时间 2005 年 5 月 5 日下午 5:55:55
var allFives = new Date(2005, 4, 5, 17, 55, 55);
```
Data.now()方法，返回表示调用这个方法时的日期和时间的毫秒数：
```javascript
//取得开始时间
var start = Date.now();
//调用函数
doSomething();
//取得停止时间
var stop = Date.now(),
result = stop – start;
```

#### 继承的方法
Date类型的toLocaleString()方法会按照与浏览器设置的地区相适应的格式返回日期和时间，toString()方法则通常返回带有时区信息的日期和时间，Date类型的valueOf()方法，则根本不返回字符串，而是返回日期的毫秒表示：
```javascript
var date1 = new Date(2007, 0, 1); //"January 1, 2007"
var date2 = new Date(2007, 1, 1); //"February 1, 2007"
(new Date(2007, 0, 1)).valueOf()  // 1167580800000
(new Date(2007, 0, 1)).valueOf()  // 1170259200000
alert(date1 < date2); //true
alert(date1 > date2); //false
```

### RegExp类型
创建一个正则表达式：
```javascript
var expression = / pattern / flags ;

/*
* 匹配字符串中所有"at"的实例
*/
var pattern1 = /at/g;
/*
* 匹配第一个"bat"或"cat"，不区分大小写
*/
var pattern2 = /[bc]at/i;
/*
* 匹配所有以"at"结尾的 3 个字符的组合，不区分大小写
*/
var pattern3 = /.at/gi;
```
模式中使用的所有元字符都必须转义：
```javascript
/*
* 匹配第一个"bat"或"cat"，不区分大小写
*/
var pattern1 = /[bc]at/i;
/*
* 匹配第一个" [bc]at"，不区分大小写
*/
var pattern2 = /\[bc\]at/i;
/*
* 匹配所有以"at"结尾的 3 个字符的组合，不区分大小写
*/
var pattern3 = /.at/gi;
/*
* 匹配所有".at"，不区分大小写
*/
var pattern4 = /\.at/gi;
```
使用RegExp构造函数创建正则表达式：
```javascript
/*
* 匹配第一个"bat"或"cat"，不区分大小写
*/
var pattern1 = /[bc]at/i;
/*
* 与 pattern1 相同，只不过是使用构造函数创建的
*/
var pattern2 = new RegExp("[bc]at", "i");
```
正则表达式字面量始终会共享同一个RegExp实例，而使用构造函数创建的每一个新RegExp实例都是一个新实例：
```javascript
var re = null, i;
for (i=0; i < 10; i++){
    re = /cat/g;
    re.test("catastrophe");
}
for (i=0; i < 10; i++){
    re = new RegExp("cat", "g");
    re.test("catastrophe");
}
```

#### RegExp实例属性
通过实例属性可以取得有关模式的各种信息：
```javascript
var pattern1 = /\[bc\]at/i;
alert(pattern1.global); //false
alert(pattern1.ignoreCase); //true
alert(pattern1.multiline); //false
alert(pattern1.lastIndex); //0
alert(pattern1.source); //"\[bc\]at"
var pattern2 = new RegExp("\\[bc\\]at", "i");
alert(pattern2.global); //false
alert(pattern2.ignoreCase); //true
alert(pattern2.multiline); //false
alert(pattern2.lastIndex); //0
alert(pattern2.source); //"\[bc\]at"
```

#### RegExp实例方法
exec()是专门为捕获组而设计的，exec()接受一个参数，即要应用模式的字符串，然后返回包含第一个匹配项信息的数组；或者在没有匹配项的情况下返回null：
```javascript
var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?/gi;
var matches = pattern.exec(text);
alert(matches.index); // 0
alert(matches.input); // "mom and dad and baby"
alert(matches[0]); // "mom and dad and baby"
alert(matches[1]); // " and dad and baby"
alert(matches[2]); // " and baby"
```
test()接受一个字符串参数，在模式与该参数匹配的情况下返回true；否则，返回false：
```javascript
var text = "000-00-0000";
var pattern = /\d{3}-\d{2}-\d{4}/;
if (pattern.test(text)){
    alert("The pattern was matched.");
}
```

#### RegExp构造函数属性
```javascript
var text = "this has been a short summer";
var pattern = /(.)hort/g;
/*
* 注意：Opera 不支持 input、lastMatch、lastParen 和 multiline 属性
* Internet Explorer 不支持 multiline 属性
*/
if (pattern.test(text)){
alert(RegExp.input); // this has been a short summer
alert(RegExp.leftContext); // this has been a
alert(RegExp.rightContext); // summer
alert(RegExp.lastMatch); // short
alert(RegExp.lastParen); // s
alert(RegExp.multiline); // false
}
```

### Function类型
函数是对象，因此函数名实际上也是一个指向函数对象的指针，不会与某个函数绑定：
```javascript
function sum(num1, num2){
return num1 + num2;
}
alert(sum(10,10)); //20
var anotherSum = sum;
alert(anotherSum(10,10)); //20
sum = null;
alert(anotherSum(10,10)); //20
```

#### 没有重载
```javascript
function addSomeNumber(num){
    return num + 100;
}
function addSomeNumber(num) {
    return num + 200;
}
var result = addSomeNumber(100); //300
```
这个例子中声明了两个同名函数，而结果则是后面的函数覆盖了前面的函数，等同于：
```javascript
var addSomeNumber = function (num){
    return num + 100;
};
addSomeNumber = function (num) {
    return num + 200;
};
var result = addSomeNumber(100); //300
```

#### 函数声明与函数表达式
解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在的代码行：
```javascript
alert(sum(10,10));
function sum(num1, num2){
    return num1 + num2;
}

alert(sum(10,10)); // unexpected identifier
var sum = function(num1, num2){
    return num1 + num2;
};
```

#### 作为值的函数
不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回：
```javascript
function callSomeFunction(someFunction, someArgument){
    return someFunction(someArgument);
}
function add10(num){
    return num + 10;
}
var result1 = callSomeFunction(add10, 10);
alert(result1); //20
function getGreeting(name){
    return "Hello, " + name;
}
var result2 = callSomeFunction(getGreeting, "Nicholas");
alert(result2); //"Hello, Nicholas"
```
可以从一个函数中返回另一个函数：
```javascript
function createComparisonFunction(propertyName) {
    return function(object1, object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 < value2){
            return -1;
        } else if (value1 > value2){
            return 1;
        } else {
            return 0;
        }
    };
}

var data = [{name: "Zachary", age: 28}, {name: "Nicholas", age: 29}];
data.sort(createComparisonFunction("name"));
alert(data[0].name); //Nicholas
data.sort(createComparisonFunction("age"));
alert(data[0].name); //Zachary
```

#### 函数内部属性
arguments.callee拥有这个arguments对象的函数，利用它可以解除函数体内的代
码与函数名的耦合状态：
```javascript
function factorial(num){
    if (num <=1) {
        return 1;
    } else {
        return num * arguments.callee(num-1)
    }
}
var trueFactorial = factorial;
factorial = function(){
    return 0;
};
alert(trueFactorial(5)); //120
alert(factorial(5)); //0
```
this引用的是函数据以执行的环境对象：
```javascript
window.color = "red";
var o = { color: "blue" };
function sayColor(){
    alert(this.color);
}
sayColor(); //"red"
o.sayColor = sayColor;
o.sayColor(); //"blue"
```
caller保存着调用当前函数的函数的引用：
```javascript
function outer(){
    inner();
}
function inner(){
    alert(inner.caller);
    // alert(arguments.callee.caller);
}
outer();
```

#### 函数属性和方法
每个函数都包含两个属性：length和prototype。其中，length属性表示函数希望接收的命名参数的个数：
```javascript
function sayName(name){
    alert(name);
}
function sum(num1, num2){
    return num1 + num2;
}
function sayHi(){
    alert("hi");
}
alert(sayName.length); //1
alert(sum.length); //2
alert(sayHi.length); //0
```
apply()方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组。其中，第二个参数可以是Array的实例，也可以是arguments对象：
```javascript
function sum(num1, num2){
    return num1 + num2;
}
function callSum1(num1, num2){
    return sum.apply(this, arguments); // 传入 arguments 对象
}
function callSum2(num1, num2){
    return sum.apply(this, [num1, num2]); // 传入数组
}
alert(callSum1(10,10)); //20
alert(callSum2(10,10)); //20
```
在使用call()方法时，传递给函数的参数必须逐个列举出来：
```javascript
function sum(num1, num2){
    return num1 + num2;
}
function callSum(num1, num2){
    return sum.call(this, num1, num2);
}
alert(callSum(10,10)); //20
```
apply()和call()真正强大的地方是能够扩充函数赖以运行的作用域（设置函数体内this对象的值）：
```javascript
window.color = "red";
var o = { color: "blue" };
function sayColor(){
    alert(this.color);
}
sayColor(); //red
sayColor.call(this); //red
sayColor.call(window); //red
sayColor.call(o); //blue
```
bind()方法会创建一个函数的实例，其this值会被绑定到传给bind()函数的值：
```javascript
window.color = "red";
var o = { color: "blue" };
function sayColor(){
    alert(this.color);
}
var objectSayColor = sayColor.bind(o);
objectSayColor(); //blue
```
> 每个函数继承的toLocaleString()、toString()、valueOf()方法始终都返回函数的代码

### 基本包装类型
每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象：
```javascript
var s1 = "some text";
var s2 = s1.substring(2);

// 执行上述代码时，后台完成如下处理
var s1 = new String("some text");
var s2 = s1.substring(2);
s1 = null;
```
使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁：
```javascript
var s1 = "some text";
s1.color = "red";
alert(s1.color); //undefined
```
对基本包装类型的实例调用typeof会返回"object"，而且所有基本包装类型的对象都会被转换为布尔值true：
```javascript
var str = new String("aaa");
alert(typeof str); // object

Boolean(new Number(0)); // true
Boolean(new Boolean(false)); // true
Boolean(new String("aaa")) // true
```
Object构造函数根据传入值的类型返回相应基本包装类型的实例：
```javascript
var obj = new Object("some text");
alert(obj instanceof String); //true
```
使用new调用基本包装类型的构造函数，与直接调用同名的转型函数是不一样的：
```javascript
var value = "25";
var number = Number(value); //转型函数
alert(typeof number); //"number"
var obj = new Number(value); //构造函数
alert(typeof obj); //"object"
```

#### Boolean类型
Boolean类型的实例重写了valueOf()方法，返回基本类型值true或false；重写了toString()方法，返回字符串"true"和"false"：
```javascript
var booleanObject = new Boolean(true);
alert(booleanObject.valueOf()); // true
alert(booleanObject.toString()); // "true"
```
Boolean在ECMAScript中的用处不大，因为布尔表达式中的所有对象都会被转换为true：
```javascript
var falseObject = new Boolean(false);
var result = falseObject && true;
alert(result); //true

var falseValue = false;
result = falseValue && true;
alert(result); //false
```
另外两个区别：
```javascript
alert(typeof falseObject); //object
alert(typeof falseValue); //boolean
alert(falseObject instanceof Boolean); //true
alert(falseValue instanceof Boolean); //false
```

#### Number类型
Number类型也重写了valueOf()、toLocaleString()和toString()方法：
```javascript
var numberObject = new Number(10);
alert(numberObject.valueOf()); // 10
alert(numberObject.toString()); // "10"
alert(numberObject.toLocaleString()); // "10"
```
可以为toString()方法传递一个表示基数的参数，告诉它返回几进制数值的字符串形式：
```javascript
var num = 10;
alert(num.toString()); //"10"
alert(num.toString(2)); //"1010"
alert(num.toString(8)); //"12"
alert(num.toString(10)); //"10"
alert(num.toString(16)); //"a"
```
toFixed()方法会按照指定的小数位返回数值的字符串表示，如果数值本身包含的小数位比指定的还多，那么接近指定的最大小数位的值就会舍入：
```javascript
var num = 10;
alert(num.toFixed(2)); //"10.00"

var num = 10.005;
alert(num.toFixed(2)); //"10.01"
```
toExponential()，该方法返回以指数表示法（也称e表示法）表示的数值的字符串形式，toExponential()也接收一个参数，而且该参数同样也是指定输出结果中的小数位数：
```javascript
var num = 10;
alert(num.toExponential(1)); //"1.0e+1"
```
toPrecision()方法可能会返回固定大小（fixed）格式，也可能返回指数（exponential）格式：
```javascript
var num = 99;
alert(num.toPrecision(1)); //"1e+2"
alert(num.toPrecision(2)); //"99"
alert(num.toPrecision(3)); //"99.0"
```
不建议直接实例化Number类型，在使用typeof和instanceof操作符测试基本类型数值与引用类型数值时，得到的结果完全不同：
```javascript
var numberObject = new Number(10);
var numberValue = 10;
alert(typeof numberObject); //"object"
alert(typeof numberValue); //"number"
alert(numberObject instanceof Number); //true
alert(numberValue instanceof Number); //false
```

#### String类型
String类型是字符串的对象包装类型，继承的valueOf()、toLocale-String()和toString()方法，都返回对象所表示的基本字符串值：
```javascript
var stringObject = new String("hello world");
alert(stringObject.valueOf()); // "hello world"
alert(stringObject.toString()); // "hello world"
alert(stringObject.toLocaleString()); // "hello world"
```
String类型的每个实例都有一个length属性，表示字符串中包含多个字符：
```javascript
var stringValue = "hello world";
alert(stringValue.length); //"11"
```

##### 字符方法
```javascript
var stringValue = "hello world";
alert(stringValue.charAt(1)); // "e"

var stringValue = "hello world";
alert(stringValue.charCodeAt(1)); // 输出"101"

var stringValue = "hello world";
alert(stringValue[1]); //"e"
```

##### 字符串操作方法
concat()用于将一或多个字符串拼接起来，返回拼接得到的新字符串：
```javascript
var stringValue = "hello ";
var result = stringValue.concat("world");
alert(result); //"hello world"
alert(stringValue); //"hello"

var stringValue = "hello ";
var result = stringValue.concat("world", "!");
alert(result); //"hello world!"
alert(stringValue); //"hello"
```
slice()、substr()和substring()这三个方法都会返回被操作字符串的一个子字符串：
```javascript
var stringValue = "hello world";
alert(stringValue.slice(3)); //"lo world"
alert(stringValue.substring(3)); //"lo world"
alert(stringValue.substr(3)); //"lo world"
alert(stringValue.slice(3, 7)); //"lo w"
alert(stringValue.substring(3,7)); //"lo w"
alert(stringValue.substr(3, 7)); //"lo worl"
```
在传递给这些方法的参数是负值的情况下，slice()方法会将传入的负值与字符串的长度相加，substr()方法将负的第一个参数加上字符串的长度，而将负的第二个参数转换为0。最后，substring()方法会把所有负值参数都转换为0：
```javascript
var stringValue = "hello world";
alert(stringValue.slice(-3)); //"rld"
alert(stringValue.substring(-3)); //"hello world"
alert(stringValue.substr(-3)); //"rld"
alert(stringValue.slice(3, -4)); //"lo w"
alert(stringValue.substring(3, -4)); //"hel"
alert(stringValue.substr(3, -4)); //"" （空字符串）
```

##### 字符串位置方法
indexOf()方法从字符串的开头向后搜索子字符串，而lastIndexOf()方法是从字符串的末尾向前搜索子字符串：
```javascript
var stringValue = "hello world";
alert(stringValue.indexOf("o")); //4
alert(stringValue.lastIndexOf("o")); //7

var stringValue = "hello world";
alert(stringValue.indexOf("o", 6)); //7
alert(stringValue.lastIndexOf("o", 6)); //4
```
在使用第二个参数的情况下，可以通过循环调用indexOf()或lastIndexOf()来找到所有匹配的子字符串：
```javascript
var stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
var positions = new Array();
var pos = stringValue.indexOf("e");
while(pos > -1){
positions.push(pos);
pos = stringValue.indexOf("e", pos + 1);
}
alert(positions); //"3,24,32,35,52"
```

##### trim()方法
trim()方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果：
```javascript
var stringValue = " hello world ";
var trimmedStringValue = stringValue.trim();
alert(stringValue); //"hello world"
alert(trimmedStringValue); //"hello world"
```

##### 字符串大小写转换方法
```javascript
var stringValue = "hello world";
alert(stringValue.toLocaleUpperCase()); //"HELLO WORLD"
alert(stringValue.toUpperCase()); //"HELLO WORLD"
alert(stringValue.toLocaleLowerCase()); //"hello world"
alert(stringValue.toLowerCase()); //"hello world"
```

##### 字符串的模式匹配方法
match()方法只接受一个参数，要么是一个正则表达式，要么是一个RegExp对象：
```javascript
var text = "cat, bat, sat, fat";
var pattern = /.at/;
//与 pattern.exec(text)相同
var matches = text.match(pattern);
alert(matches.index); //0
alert(matches[0]); //"cat"
alert(pattern.lastIndex); //0
```
search()方法返回字符串中第一个匹配项的索引；如果没有找到匹配项，则返回-1：
```javascript
var text = "cat, bat, sat, fat";
var pos = text.search(/at/);
alert(pos); //1
```
replace()方法简化了替换子字符串的操作：
```javascript
var text = "cat, bat, sat, fat";
var result = text.replace("at", "ond");
alert(result); //"cond, bat, sat, fat"
result = text.replace(/at/g, "ond");
alert(result); //"cond, bond, sond, fond"

var text = "cat, bat, sat, fat";
result = text.replace(/(.at)/g, "word ($1)");
alert(result); //word (cat), word (bat), word (sat), word (fat)

// 第二个参数也可以是函数
function htmlEscape(text){
    return text.replace(/[<>"&]/g, function(match, pos, originalText){
        switch(match){
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
        }
    });
}
alert(htmlEscape("<p class=\"greeting\">Hello world!</p>"));
//&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;
```
split()方法可以基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中：
```javascript
var colorText = "red,blue,green,yellow";
var colors1 = colorText.split(","); //["red", "blue", "green", "yellow"]
var colors2 = colorText.split(",", 2); //["red", "blue"]
var colors3 = colorText.split(/[^\,]+/); //["", ",", ",", ",", ""]
```

##### localeCompare()方法
```javascript
var stringValue = "yellow";
alert(stringValue.localeCompare("brick")); //1
alert(stringValue.localeCompare("yellow")); //0
alert(stringValue.localeCompare("zoo")); //-1
```
因为localeCompare()返回的数值取决于实现，所以最好是像下面例子所示的这样使用这个方法：
```javascript
function determineOrder(value) {
    var result = stringValue.localeCompare(value);
    if (result < 0) {
        alert("The string 'yellow' comes before the string '" + value + "'.");
    } else if (result > 0) {
        alert("The string 'yellow' comes after the string '" + value + "'.");
    } else {
        alert("The string 'yellow' is equal to the string '" + value + "'.");
    }
}
determineOrder("brick");
determineOrder("yellow");
determineOrder("zoo");
```

##### fromCharCode()方法
```javascript
alert(String.fromCharCode(104, 101, 108, 108, 111)); //"hello"
```

### 单体内置对象
#### Global对象
##### URL编码方法
```javascript
var uri = "http://www.wrox.com/illegal value.htm#start";
//"http://www.wrox.com/illegal%20value.htm#start"
alert(encodeURI(uri));
//"http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start"
alert(encodeURIComponent(uri));

var uri = "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start";
//http%3A%2F%2Fwww.wrox.com%2Fillegal value.htm%23start
alert(decodeURI(uri));
//http://www.wrox.com/illegal value.htm#start
alert(decodeURIComponent(uri));
```

##### eval()方法
```javascript
eval("alert('hi')"); // alert("hi");

var msg = "hello world";
eval("alert(msg)"); //"hello world"

eval("function sayHi() { alert('hi'); }");
sayHi();

eval("var msg = 'hello world'; ");
alert(msg); //"hello world"

"use strict";
eval = "hi"; //causes error
```

##### window对象
```javascript
var color = "red";
function sayColor(){
    alert(window.color);
}
window.sayColor(); //"red"
```
通过创建一个立即调用的函数表达式来取得Global对象：
```javascript
var global = function(){
    return this;
}();
```

#### Math对象
min()和max()方法用于确定一组数值中的最小值和最大值：
```javascript
var max = Math.max(3, 54, 32, 16);
alert(max); //54
var min = Math.min(3, 54, 32, 16);
alert(min); //3

var values = [1, 2, 3, 4, 5, 6, 7, 8];
var max = Math.max.apply(Math, values);
```
Math.ceil()、Math.floor()和Math.round()都能将小数值舍入为整数：
```javascript
alert(Math.ceil(25.9)); //26
alert(Math.ceil(25.5)); //26
alert(Math.ceil(25.1)); //26
alert(Math.round(25.9)); //26
alert(Math.round(25.5)); //26
alert(Math.round(25.1)); //25
alert(Math.floor(25.9)); //25
alert(Math.floor(25.5)); //25
alert(Math.floor(25.1)); //25
```
Math.random()方法返回大于等于0小于1的一个随机数：
```javascript
var num = Math.floor(Math.random() * 10 + 1);

function selectFrom(lowerValue, upperValue) {
var choices = upperValue - lowerValue + 1;
return Math.floor(Math.random() * choices + lowerValue);
}
var num = selectFrom(2, 10);
alert(num); // 介于 2 和 10 之间（包括 2 和 10）的一个数值

var colors = ["red", "green", "blue", "yellow", "black", "purple", "brown"];
var color = colors[selectFrom(0, colors.length-1)];
alert(color); // 可能是数组中包含的任何一个字符串
```
