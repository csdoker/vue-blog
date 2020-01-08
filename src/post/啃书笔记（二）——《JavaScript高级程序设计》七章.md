## 第七章：函数表达式
通过一个非标准的name属性可以访问到给函数指定的名字：
```javascript
// 只在 Firefox、Safari、Chrome 和 Opera 有效
alert(functionName.name); // "functionName"
```
函数声明提升：
```javascript
sayHi();
function sayHi(){
    alert("Hi!");
}

sayHi(); //错误：函数还不存在
var sayHi = function(){
alert("Hi!");
};
```

<!--more-->

### 递归
```javascript
function factorial(num){
    if (num <= 1){
        return 1;
    } else {
        return num * factorial(num-1);
    }
}
var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4)); //出错！

// arguments.callee是一个指向正在执行的函数的指针（非严格模式下有效）
function factorial(num){
    if (num <= 1){
        return 1;
    } else {
        return num * arguments.callee(num-1);
    }
}

// 严格模式下也有用
var factorial = (function f(num){
    if (num <= 1){
        return 1;
    } else {
        return num * f(num-1);
    }
});
```

### 闭包
闭包是指有权访问另一个函数作用域中的变量的函数：
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

//创建函数
var compareNames = createComparisonFunction("name");
//调用函数
var result = compareNames({ name: "Nicholas" }, { name: "Greg" });
//解除对匿名函数的引用（以便释放内存）
compareNames = null;
```
createComparisonFunction()函数在执行完毕后，其活动对象不会被销毁，直到匿名函数被销毁后，createComparisonFunction()的活动对象才会被销毁。

#### 闭包与变量
闭包所保存的是整个变量对象，所以闭包只能取得包含函数中任何变量的最后一个值：
```javascript
function createFunctions(){
    var result = new Array();
    for (var i=0; i < 10; i++){
        result[i] = function(){
            // 每个函数都引用着保存变量 i 的同一个变量对象
            // 所以在每个函数内部 i 的值都是 10
            return i;
        };
    }
    return result;
}
```
可以通过创建另一个匿名函数强制让闭包的行为符合预期：
```javascript
function createFunctions(){
    var result = new Array();
    for (var i=0; i < 10; i++){
        result[i] = function(num){
            return function(){
                return num;
            };
        }(i);
    }
    return result;
}
```

#### 关于this对象
```javascript
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            // 内部函数搜索this和arguments只搜索到活动对象为止
            return this.name;
        };
    }
};
alert(object.getNameFunc()()); //"The Window"（在非严格模式下）

var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        // 把外部作用域中的this对象保存在一个闭包能够访问到的变量里
        var that = this;
        return function(){
            return that.name;
        };
    }
};
alert(object.getNameFunc()()); //"My Object"

// 特殊情况下，this的值可能会意外地改变
var name = "The Window";
var object = {
    name : "My Object",
    getName: function(){
        return this.name;
    }
};
object.getName(); //"My Object"
(object.getName)(); //"My Object"
(object.getName = object.getName)(); //"The Window"，在非严格模式下
```

#### 内存泄漏
如果闭包的作用域链中保存着一个HTML元素，那么就意味着该元素将无法被销毁：
```javascript
function assignHandler(){
    var element = document.getElementById("someElement");
    element.onclick = function(){
        alert(element.id);
    };
}
```
即使闭包不直接引用element，包含函数的活动对象中也仍然会保存一个引用。因此，有必要把element变量设置为null：
```javascript
function assignHandler(){
    var element = document.getElementById("someElement");
    var id = element.id;
    element.onclick = function(){
        alert(id);
    };
    element = null;
}
```

### 模仿块级作用域
在块语句中定义的变量，实际上是在包含函数中而非语句中创建的：
```javascript
function outputNumbers(count){
    for (var i=0; i < count; i++){
        alert(i);
    }
    alert(i); //计数
}
```
在JavaScrip中，变量i是定义在ouputNumbers()的活动对象中的，因此从它有定义开始，就可以在函数内部随处访问它。匿名函数可以用来模仿块级作用域并避免这个问题：
```javascript
(function(){
//这里是块级作用域
})();

function outputNumbers(count){
    (function () {
        for (var i=0; i < count; i++){
            alert(i);
        }
    })();
    alert(i); //导致一个错误！
}
```

### 私有变量
私有变量包括函数的参数、局部变量和在函数内部定义的其他函数，有权访问私有变量和私有函数的公有方法称为特权方法：
```javascript
// 在构造函数中定义特权方法
function MyObject(){
    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //特权方法
    this.publicMethod = function (){
        privateVariable++;
        return privateFunction();
    };
}
```
利用私有和特权成员，可以隐藏那些不应该被直接修改的数据：
```javascript
function Person(name){
    this.getName = function(){
        return name;
    };
    this.setName = function (value) {
        name = value;
    };
}
var person = new Person("Nicholas");
alert(person.getName()); //"Nicholas"
person.setName("Greg");
alert(person.getName()); //"Greg"
```
构造函数模式的缺点是针对每个实例都会创建同样一组新方法

#### 静态私有变量
基本模式：
```javascript
(function(){
    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //构造函数
    MyObject = function(){
    };
    //公有/特权方法
    MyObject.prototype.publicMethod = function(){
        privateVariable++;
        return privateFunction();
    };
})();
```
这个特权方法，作为一个闭包，总是保存着对包含作用域的引用：
```javascript
(function(){
    var name = "";
    Person = function(value){
        name = value;
    };
    Person.prototype.getName = function(){
        return name;
    };
    Person.prototype.setName = function (value){
        name = value;
    };
})();
var person1 = new Person("Nicholas");
alert(person1.getName()); //"Nicholas"
person1.setName("Greg");
alert(person1.getName()); //"Greg"
var person2 = new Person("Michael");
alert(person1.getName()); //"Michael"
alert(person2.getName()); //"Michael"
```
以这种方式创建静态私有变量会因为使用原型而增进代码复用，但每个实例都没有自己的私有变量。

#### 模块模式
模块模式（module pattern）是为单例创建私有变量和特权方法，所谓单例（singleton），指的就是只有一个实例的对象：
```javascript
var singleton = {
    name : value,
    method : function () {
        //这里是方法的代码
    }
};

var singleton = function(){
    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //特权/公有方法和属性
    return {
        publicProperty: true,
        publicMethod : function(){
            privateVariable++;
            return privateFunction();
        }
    };
}();
```
如果必须创建一个对象并以某些数据对其进行初始化，同时还要公开一些能够访问这些私有数据的方法，那么就可以使用模块模式：
```javascript
var application = function(){
    //私有变量和函数
    var components = new Array();
    //初始化
    components.push(new BaseComponent());
    //公共
    return {
        getComponentCount : function(){
            return components.length;
        },
        registerComponent : function(component){
            if (typeof component == "object"){
                components.push(component);
            }
        }
    };
}();
```

#### 增强的模块模式
增强的模块模式适合那些单例必须是某种类型的实例，同时还必须添加某些属性和（或）方法对其加以增强的情况：
```javascript
var singleton = function(){
    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //创建对象
    var object = new CustomType();
    //添加特权/公有属性和方法
    object.publicProperty = true;
    object.publicMethod = function(){
        privateVariable++;
        return privateFunction();
    };
    //返回这个对象
    return object;
}();

var application = function(){
    //私有变量和函数
    var components = new Array();
    //初始化
    components.push(new BaseComponent());
    //创建 application 的一个局部副本
    var app = new BaseComponent();
    //公共接口
    app.getComponentCount = function(){
        return components.length;
    };
    app.registerComponent = function(component){
        if (typeof component == "object"){
            components.push(component);
        }
    };
    //返回这个副本
    return app;
}();
```
施工ing。。。
