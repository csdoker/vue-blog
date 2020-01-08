## 第四章：变量、作用域和内存问题
### 基本类型和引用类型的值
当复制保存着对象的某个变量时，操作的是对象的引用。但在为对象添加属性时，操作的是实际的对象。

#### 动态的属性
只能给引用类型值动态地添加属性，不能给基本类型的值添加属性：
```javascript
var person = new Object();
person.name = "Nicholas";
alert(person.name); //"Nicholas"

var name = "Nicholas";
name.age = 27;
alert(name.age); //undefined
```

<!--more-->

#### 复制变量值
从一个变量向另一个变量复制基本类型的值，会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上：
```javascript
var num1 = 5;
var num2 = num1;
```
从一个变量向另一个变量复制引用类型的值时，两个变量实际上将引用同一个对象：
```javascript
var obj1 = new Object();
var obj2 = obj1;
obj1.name = "Nicholas";
alert(obj2.name); //"Nicholas"
```

#### 传递参数
在向参数传递基本类型的值时，被传递的值会被复制给一个局部变量：
```javascript
function addTen(num) {
    num += 10;
    return num;
}
var count = 20;
var result = addTen(count);
alert(count); //20，没有变化
alert(result); //30
```
在向参数传递引用类型的值时，会把这个值在内存中的地址复制给一个局部变量，因此这个局部变量的变化会反映在函数的外部：
```javascript
function setName(obj) {
    obj.name = "Nicholas";
}
var person = new Object();
setName(person);
alert(person.name); //"Nicholas"
```
在这个函数内部，obj和person引用的是同一个对象。当在函数内部重写 obj 时，这
个变量引用的就是一个局部对象了，即使在函数内部修改了参数的值，但原始的引用仍然保持未变：
```javascript
function setName(obj) {
    obj.name = "Nicholas";
    obj = new Object();
    obj.name = "Greg";
}
var person = new Object();
setName(person);
alert(person.name); //"Nicholas"
```
> 可以把 ECMAScript 函数的参数想象成局部变量

#### 检测类型
 typeof操作符是确定一个变量是基础类型的最佳工具：
```javascript
var s = "Nicholas";
var b = true;
var i = 22;
var u;
var n = null;
var o = new Object();
alert(typeof s); //string
alert(typeof i); //number
alert(typeof b); //boolean
alert(typeof u); //undefined
alert(typeof n); //object
alert(typeof o); //object
```
检测引用类型（一个实例具体是什么引用类型）：
```javascript
result = variable instanceof constructor

alert(person instanceof Object);  // 变量 person 是 Object 吗？
alert(colors instanceof Array); // 变量 colors 是 Array 吗？
alert(pattern instanceof RegExp); // 变量 pattern 是 RegExp 吗？
```

### 执行环境及作用域
`执行环境`定义了变量或函数有权访问的其他数据，决定了它们各自的行为。当代码在一个环境中执行时，会创建变量对象的一个`作用域链`，作用域链的用途：保证对执行环境有权访问的所有变量和函数的有序访问。
```javascript
var color = "blue";
function changeColor(){
    if (color === "blue"){
        color = "red";
    } else {
        color = "blue";
    }
}
changeColor();
alert("Color is now " + color);
```
函数 changeColor() 的作用域链包含两个对象：它自己的变量对象（其中定义着arguments对象）和全局环境的变量对象。可以在函数内部访问变量color，就是因为可以在这个作用域链中找到它。在局部作用域中定义的变量可以在局部环境中与全局变量互换使用：
```javascript
var color = "blue";
function changeColor(){
    var anotherColor = "red";
    function swapColors(){
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
        // 这里可以访问 color、anotherColor 和 tempColor
    }
    // 这里可以访问 color 和 anotherColor，但不能访问 tempColor
    swapColors();
}
// 这里只能访问 color
changeColor();
```
内部环境可以通过作用域链访问所有的外部环境，但外部环境不能访问内部环境中的任何变量和函数。每个环境都可以向上搜索作用域链，以查询变量和函数名；但任何环境都不能通过向下搜索作用域链而进入另一个执行环境。

#### 延长作用域链
当执行流进入下列任何一个语句时，作用域链就会得到加长：
- try-catch语句的catch块
- with语句

这两个语句都会在作用域链的前端添加一个变量对象，对with语句来说，会将指定的对象添加到作用域链中：
```javascript
function buildUrl() {
    var qs = "?debug=true";
    with(location){
        var url = href + qs;
    }
    return url;
}
```

#### 没有块级作用域
```javascript
if (true) {
    var color = "blue";
}
alert(color); //"blue"
```
在JavaScript 中，if语句中的变量声明会将变量添加到当前的执行环境。由for语句创建的变量i即使在for循环执行结束后，也依旧会存在于循环外部的执行环境中：
```javascript
for (var i=0; i < 10; i++){
    doSomething(i);
}
alert(i); //10
```

##### 声明变量
使用var声明的变量会自动被添加到最接近的环境中：
```javascript
function add(num1, num2) {
    var sum = num1 + num2;
    return sum;
}
var result = add(10, 20); //30
alert(sum); //由于 sum 不是有效的变量，因此会导致错误
```
如果省略这个例子中的var关键字，那么当add()执行完毕后，sum也将可以访问到：
```javascript
function add(num1, num2) {
    sum = num1 + num2;
    return sum;
}
var result = add(10, 20); //30
alert(sum); //30
```

##### 查询标识符
当在某个环境中为了读取或写入而引用一个标识符时，必须通过搜索来确定该标识符实际代表什么：
```javascript
var color = "blue";
function getColor(){
    return color;
}
alert(getColor()); //"blue"
```
在这个搜索过程中，如果存在一个局部的变量的定义，则搜索会自动停止，不再进入另一个变量对象：
```javascript
var color = "blue";
function getColor(){
    var color = "red";
    return color;
}
alert(getColor()); //"red"
```
任何位于局部变量color的声明之后的代码，如果不使用window.color都无法访问全局color变量。

### 垃圾收集
#### 标记清除
当变量进入环境（例如，在函数中声明一个变量）时，就将这个变量标记为“进入环境”。当变量离开环境时，则将其标记为“离开环境”。垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记，然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记。而在此之后再被加上标记的变量将被视为准备删除的变量。最后，垃圾收集器完成内存清除工作，销毁那些带标记的值并回收它们所占用的内存空间。

#### 引用计数
引用计数的含义是跟踪记录每个值被引用的次数，对象A中包含一个指向对象B的指针，而对象B中也包含一个指向对象A的引用就是循环引用：
```javascript
function problem(){
    var objectA = new Object();
    var objectB = new Object();
    objectA.someOtherObject = objectB;
    objectB.anotherObject = objectA;
}
```
IE的JavaScript引擎是使用标记清除策略来实现的，但JavaScript访问的COM对象依然是基于引用计数策略：
```javascript
var element = document.getElementById("some_element");
var myObject = new Object();
myObject.element = element;
element.someObject = myObject;
```
可以使用下面的代码消除前面例子创建的循环引用：
```javascript
myObject.element = null;
element.someObject = null;
```

#### 管理内存
优化内存占用的最佳方式，就是为执行中的代码只保存必要的数据。一旦数据不再有用，最好通过将其值设置为 null 来释放其引用——这个做法叫做解除引用（dereferencing）：
```javascript
function createPerson(name){
    var localPerson = new Object();
    localPerson.name = name;
    return localPerson;
}
var globalPerson = createPerson("Nicholas");
// 手工解除 globalPerson 的引用
globalPerson = null;
```
由于localPerson在createPerson()函数执行完毕后就离开了其执行环境，因此无需我们显式地去为它解除引用，对于全局变量globalPerson而言，则需要我们在不使用它的时候手工为它解除引用。
